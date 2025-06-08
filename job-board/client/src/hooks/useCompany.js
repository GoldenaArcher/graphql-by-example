import { useQuery } from "@apollo/client";
import { companyByIdQuery } from "../lib/graphql/queries";

export const useFetchCompany = (companyId) => {
    const { data, loading, error } = useQuery(companyByIdQuery, {
      variables: { id: companyId },
    });
  
    return { company: data?.company, loading, error };
  };