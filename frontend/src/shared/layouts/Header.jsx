import { useIsFetching } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function Header() {
  const fetching = useIsFetching();

  return (
    <>
      {fetching > 0 && (
        <div className="fixed top-0 left-0 w-full h-1 z-50 bg-sphere-deep-space">
          <div className="h-full bg-linear-to-r from-sphere-neon-cyan to-sphere-electric-blue animate-pulse"></div>
        </div>
      )}
      {/* Main Header */}
      <header className="bg-linear-to-r from-sphere-deep-space to-sphere-cosmic-purple border-b-4 border-sphere-electric-blue shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* ReactSphere logo */}
            <div className="flex items-center space-x-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-sphere-electric-blue rounded-full blur-md group-hover:blur-lg transition-all duration-300 opacity-70 group-hover:opacity-100 animate-pulse"></div>
                <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-linear-to-br from-sphere-neon-cyan via-sphere-electric-blue to-sphere-cosmic-purple shadow-2xl shadow-sphere-electric-blue/50 border-2 border-white/20 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                  <img
                    src="/logo.png"
                    alt="ReactSphere"
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover z-10"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl sm:text-2xl font-bold bg-linear-to-r from-sphere-neon-cyan to-sphere-electric-blue bg-clip-text text-transparent leading-tight">
                  ReactSphere
                </h1>
                <p className="text-xs text-sphere-silver hidden sm:block">
                  Connect • Share • Experience
                </p>
              </div>
            </div>
            {/* Navigation */}
            <nav className="flex items-center space-x-2 sm:space-x-4">
              <Link
                to="/events"
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 text-sphere-mist hover:bg-sphere-electric-blue/20 rounded-xl transition-all duration-300 group"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <span className="text-sm sm:text-base font-medium">All Events</span>
              </Link>
              <Link
                to="/events/new"
                className="flex items-center space-x-1 sm:space-x-2 bg-linear-to-r from-sphere-electric-blue to-sphere-neon-cyan text-white px-3 sm:px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-sphere-electric-blue/40 transform hover:scale-105 transition-all duration-300 group"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
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
                <span className="text-sm sm:text-base">
                  <span className="hidden sm:inline">New Event</span>
                  <span className="sm:hidden">New</span>
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}