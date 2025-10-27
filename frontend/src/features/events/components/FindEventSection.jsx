import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { fetchEvents } from "../api/http";
import LoadingIndicator from "../../../shared/components/ui/LoadingIndicator";
import ErrorBlock from "../../../shared/components/ui/ErrorBlock";
import EventItem from "./EventItem";

export default function FindEventSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const searchElement = useRef();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", { search: searchTerm }],
    queryFn: ({ signal }) => fetchEvents({ signal, searchTerm }),
    enabled: searchTerm !== ""
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(searchElement.current.value);
  }

  let content = (
    <div className="text-center py-12">
      <div className="w-24 h-24 mx-auto mb-4 bg-linear-to-r from-sphere-silver to-sphere-graphite rounded-full flex items-center justify-center">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <p className="text-sphere-graphite text-lg">Please enter a search term to find events.</p>
    </div>
  );

  if (isLoading) {
    content = (
      <div className="flex justify-center py-12">
        <LoadingIndicator size="large" text="Searching events...."/>
      </div>
    );
  }

  if (isError) {
    content = (
      <div className="py-8">
        <ErrorBlock
          title="An error occurred!"
          message={error.info?.message || "Failed to fetch events."}
        />
      </div>
    );
  }

  if (data) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-6">
        {data.map(event => (
          <div key={event.id} className="transform hover:scale-105 transition-transform duration-300">
            <EventItem event={event} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="full-width-section py-16 bg-linear-to-r from-sphere-deep-space to-sphere-graphite">
      <div className="section-inner">
        <header className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Find Your Next Event!
          </h2>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-4">
            <div className="flex-1 relative">
              <input
                type="search"
                placeholder="Search events by title, location, or description..."
                ref={searchElement}
                className="w-full px-6 py-4 rounded-2xl border-2 border-sphere-silver/20 bg-white/10 backdrop-blur-sm text-white placeholder-sphere-silver focus:border-sphere-electric-blue focus:outline-none focus:ring-4 focus:ring-sphere-electric-blue/20 transition-all duration-300"
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sphere-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-linear-to-r from-sphere-electric-blue to-sphere-neon-cyan text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-sphere-electric-blue/40 transform hover:scale-105 transition-all duration-300"
            >
              Search
            </button>
          </form>
        </header>
        {content}
      </div>
    </section>
  );
}
