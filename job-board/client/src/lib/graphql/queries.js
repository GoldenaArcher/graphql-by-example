import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { getAccessToken } from "../auth";

const httpLink = createHttpLink({
  uri: "http://localhost:9000/graphql",
});

const authLink = new ApolloLink((operation, forward) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  }
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

const jobDetailFragment = gql`
  fragment JobDetail on Job {
    id
    date
    title
    description
    company {
      id
      name
    }
  }
`;

export const jobByIdQuery = gql`
  query ($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export const jobsQuery = gql`
  query Jobs($limit: Int, $offset: Int){
    jobs(limit: $limit, offset: $offset) {
      items {
        ...JobDetail
      }
      totalCount
    }
  }
  ${jobDetailFragment}
`;

export const createJobMutation = gql`
  mutation CreateJob($input: CreateJobInput!) {
    createJob(input: $input) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export const companyByIdQuery = gql`
  query CompanyById($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        date
        title
      }
    }
  }
`;

export async function createJob({ title, description }) {
  const mutation = createJobMutation;

  const { data } = await apolloClient.mutate({
    mutation,
    variables: {
      input: {
        title,
        description,
      },
    },
    update: (cache, { data }) => {
      cache.writeQuery({
        query: jobByIdQuery,
        variables: { id: data.createJob.id },
        data,
      });
    },
  });

  return data.createJob;
}

export async function getJobs() {
  const query = jobsQuery;

  const { data } = await apolloClient.query({ query });
  return data.jobs;
}

export async function getJob(id) {
  const query = jobByIdQuery;
  const { data } = await apolloClient.query({
    query,
    variables: { id },
  });
  return data.job;
}

export async function getCompany(id) {
  const query = companyByIdQuery;

  const { data } = await apolloClient.query({ query, variables: { id } });
  return data.company;
}
