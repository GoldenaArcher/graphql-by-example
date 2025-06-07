import { GraphQLError } from "graphql";
import {
  getJobs,
  getJob,
  getJobsByCompany,
  createJob,
  deleteJob,
  updateJob,
} from "./db/jobs.js";
import { getCompany } from "./db/companies.js";

export const resolvers = {
  Query: {
    job: async (_root, { id }) => {
      const job = await getJob(id);
      if (!job) {
        throw new GraphQLNotFound("Job not found: " + id);
      }
      return job;
    },
    jobs: async () => getJobs(),
    company: async (_root, { id }) => {
      const company = await getCompany(id);
      if (!company) {
        throw new GraphQLNotFound("Company not found: " + id);
      }
      return company;
    },
  },

  Mutation: {
    createJob: (_root, { input: { title, description } }) => {
      const companyId = "FjcJCHJALA4i"; // TODO - change it later
      return createJob({ companyId, title, description });
    },
    deleteJob: (_root, { id }) => {
      deleteJob(id);
    },
    updateJob: async (_root, { input: { id, title, description } }) => {
      await updateJob({ id, title, description });
    },
  },

  Job: {
    date: (parent) => {
      return toIsoDate(parent.createdAt);
    },
    company: (job) => {
      return getCompany(job.companyId);
    },
  },

  Company: {
    jobs: (parent) => {
      return getJobsByCompany(parent.id);
    },
  },
};

class GraphQLNotFound extends GraphQLError {
  constructor(message) {
    super(message, {
      extensions: {
        code: "NOT_FOUND",
        http: {
          status: 404,
        },
      },
    });
  }
}

function toIsoDate(value) {
  return new Date(value).toISOString().slice(0, 10);
}
