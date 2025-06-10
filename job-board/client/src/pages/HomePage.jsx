import { useState } from "react";
import JobList from "../components/JobList";
import PaginationBar from "../components/PaginationBar";
import { useFetchJobs } from "../hooks/useJob";

const JOBS_PER_PAGE = 5;

function HomePage() {
  const [currPage, setCurrPage] = useState(1);
  const { jobs, error, loading } = useFetchJobs(
    JOBS_PER_PAGE,
    (currPage - 1) * JOBS_PER_PAGE
  );

  const totalPages = Math.ceil((jobs?.totalCount || 0) / JOBS_PER_PAGE);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <PaginationBar
        currentPage={currPage}
        totalPages={totalPages}
        onPageChange={setCurrPage}
      />
      <JobList jobs={jobs?.items} />
    </div>
  );
}

export default HomePage;
