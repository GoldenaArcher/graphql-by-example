import { useMutation, useQuery } from "@apollo/client";
import {
  createJobMutation,
  jobByIdQuery,
  jobsQuery,
} from "../lib/graphql/queries";

export const useFetchJob = (jobId) => {
  const { data, loading, error } = useQuery(jobByIdQuery, {
    variables: { id: jobId },
  });

  return {
    job: data?.job,
    loading,
    error,
  };
};

export const useFetchJobs = () => {
  const { data, loading, error } = useQuery(jobsQuery);
  return {
    jobs: data?.jobs,
    loading,
    error,
  };
};

export const useCreateJob = () => {
  const [mutate, options] = useMutation(createJobMutation);

  const createJob = async ({ title, description }) => {
    const {
      data: { createJob: job },
    } = await mutate({
      variables: {
        input: {
          title,
          description,
        },
      },
      update: (cache, { data: { createJob: job } }) => {
        cache.writeQuery({
          query: jobByIdQuery,
          data: {
            job,
          },
        });
      },
    });

    return job;
  };

  return [createJob, options]
};
