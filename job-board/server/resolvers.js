import { getJobs, getJob, getJobsByCompany } from "./db/jobs.js";
import { getCompany } from "./db/companies.js";

export const resolvers = {
  Query: {
    job: (_root, { id }) => {
      return getJob(id);
    },
    jobs: async () => getJobs(),
    company: (_root, { id }) => {
      return getCompany(id);
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
    }
  }
};

function toIsoDate(value) {
  return new Date(value).toISOString().slice(0, 10);
}
