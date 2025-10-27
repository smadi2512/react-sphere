import { Link } from "react-router-dom";
import meetupImg from "../../../assets/meetup.jpg";

export default function EventsIntroSection() {
  return (
    <section
      className="full-width-section relative min-h-[70vh] bg-cover bg-center bg-fixed flex items-center justify-center text-center px-4 py-16"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.7), rgba(139, 92, 246, 0.5)), url(${meetupImg})`,
      }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
          Connect with amazing people <br />
          or <br />
          <span className="bg-linear-to-r from-sphere-neon-cyan to-sphere-electric-blue bg-clip-text text-transparent">
            find a new passion
          </span>
        </h2>
        <p className="text-xl md:text-2xl text-sphere-mist opacity-90 max-w-2xl mx-auto">
          Anyone can organize and join amazing events on ReactSphere!
        </p>
        <div className="pt-6">
          <Link
            to="/events/new"
            className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-linear-to-r from-sphere-electric-blue to-sphere-neon-cyan rounded-2xl shadow-2xl shadow-sphere-electric-blue/40 hover:shadow-sphere-electric-blue/60 transform hover:scale-105 transition-all duration-300 hover:animate-glow"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Your First Event
          </Link>
        </div>
      </div>
    </section>
  );
}
