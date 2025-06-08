import JobList from "../components/JobList";
import { useFetchJobs } from "../hooks/useJob";

function HomePage() {
  const { jobs, error, loading } = useFetchJobs();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
