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

const apolloClient = new ApolloClient({
  link: concat(authLink, httpLink),
  cache: new InMemoryCache(),
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

const jobByIdQuery = gql`
  query($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

export async function createJob({ title, description }) {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      createJob(input: $input) {
        ...JobDetail
      }
    }
    ${jobDetailFragment}
  `;

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
  const query =  gql`
  query {
    jobs {
      ...JobDetail
    }
  }
  ${jobDetailFragment}
`;

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
  const query = gql`
    query Jobs($id: ID!) {
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
  const { data } = await apolloClient.query({ query, variables: { id } });
  return data.company;
}
