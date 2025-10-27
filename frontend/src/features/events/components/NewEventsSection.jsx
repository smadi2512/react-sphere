import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../api/http.js";
import LoadingIndicator from "../../../shared/components/ui/LoadingIndicator.jsx";
import ErrorBlock from "../../../shared/components/ui/ErrorBlock.jsx";
import EventItem from "./EventItem";

export default function NewEventsSection() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", { max: 5 }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
  });

  let content;

  if (isPending) {
    content = (
      <div className="flex justify-center py-12">
        <LoadingIndicator size="large" text="Loading recently added events..."/>
      </div>
    );
  }

  if (isError) {
    content = (
      <div className="py-8">
        <ErrorBlock
          title="An error occurred"
          message={error.info?.message || "Failed to fetch events."}
        />
      </div>
    );
  }

  if (data) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
        {data.map((event) => (
          <div key={event.id} className="transform hover:scale-105 transition-transform duration-300">
            <EventItem event={event} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="container-section py-16 bg-sphere-mist">
      <div className="section-inner">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-sphere-deep-space to-sphere-cosmic-purple bg-clip-text text-transparent">
            Recently Added Events
          </h2>
          <p className="text-sphere-graphite mt-4 text-lg max-w-2xl mx-auto">
            Discover the latest events happening in your community
          </p>
        </header>
        {content}
      </div>
    </section>
  );
}