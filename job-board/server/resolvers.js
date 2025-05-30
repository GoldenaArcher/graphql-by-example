import { getJobs, getJob } from "./db/jobs.js";
import { getCompany } from "./db/companies.js";

export const resolvers = {
  Query: {
    job: (_root, { id }) => {
      return getJob(id);
    },
    jobs: async () => getJobs(id),
  },

  Job: {
    date: (parent) => {
      return toIsoDate(parent.createdAt);
    },
    company: (job) => {
      return getCompany(job.companyId);
    },
  },
};

function toIsoDate(value) {
  return new Date(value).toISOString().slice(0, 10);
}
