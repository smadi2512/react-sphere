import { Link } from "react-router-dom";

export default function EventItem({ event }) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-sphere-silver/20 group">
      <div className="relative overflow-hidden">
        <img
          src={`http://localhost:3000/${event.image}`}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-sphere-electric-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
          {formattedDate}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-sphere-deep-space line-clamp-2 group-hover:text-sphere-electric-blue transition-colors duration-300">
            {event.title}
          </h2>
          <p className="text-sphere-graphite mt-2 flex items-center">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {event.location}
          </p>
        </div>

        <div className="flex justify-end items-center">
          <Link
            to={`/events/${event.id}`}
            className="bg-linear-to-r from-sphere-electric-blue to-sphere-neon-cyan text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-sphere-electric-blue/40 transform hover:scale-105 transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}