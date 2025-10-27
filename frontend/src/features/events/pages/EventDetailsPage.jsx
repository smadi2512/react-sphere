import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchEvent, deleteEvent } from "../api/http.js";
import ErrorBlock from "../../../shared/components/ui/ErrorBlock.jsx";
import LoadingIndicator from "../../../shared/components/ui/LoadingIndicator.jsx";
import { queryClient } from "../../../queryClient.js";
import { useEffect, useState } from "react";
import Modal from "../../../shared/components/ui/Modal.jsx";

export default function EventDetailsPage() {
  const [isDeleting, setIsDeleting] = useState(false);
  const params = useParams();
  const eventId = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  // Fetch the event details by useQuery
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["events", eventId],
    queryFn: ({ signal }) => fetchEvent({ id: eventId, signal }),
  });

  // Delete the event by useMutation
  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
  });

  function handleDelete() {
    mutate({ id: eventId });
  }

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  let content;

  if (isPending) {
    content = (
      <div className="flex justify-center py-12">
        <LoadingIndicator size="medium" text="Loading event details..." />
      </div>
    );
  }

  if (isError) {
    content = (
      <div className="py-12">
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to fetch event data, please try again later."
          }
        />
        <div className="text-center mt-8">
          <Link
            to="/events"
            className="bg-linear-to-r from-sphere-electric-blue to-sphere-neon-cyan text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-sphere-electric-blue/40 transform hover:scale-105 transition-all duration-300"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    content = (
      <>
        <div className="text-center mb-8">
          <Link
            to="/events"
            className="bg-linear-to-r from-sphere-electric-blue to-sphere-neon-cyan text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-sphere-electric-blue/40 transform hover:scale-105 transition-all duration-300"
          >
            ← Back to Events
          </Link>
        </div>
        <div className="max-w-6xl mx-auto">
          {/* Event Header */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
            <div className="relative h-80 sm:h-96">
              <img
                src={`http://localhost:3000/${data.image}`}
                alt={data.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-sphere-deep-space/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                  <div className="text-white">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                      {data.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-lg">
                      <span className="flex items-center bg-sphere-electric-blue/90 px-4 py-2 rounded-full">
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
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {formattedDate}
                      </span>
                      <span className="flex items-center bg-sphere-neon-cyan/90 px-4 py-2 rounded-full">
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
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {data.time}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-4 sm:mt-0">
                    <button
                      onClick={handleStartDelete}
                      className="cursor-pointer bg-linear-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/40 transform hover:scale-105 transition-all duration-300 flex items-center"
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </button>
                    <Link
                      to="edit"
                      className="bg-linear-to-r from-sphere-electric-blue to-sphere-neon-cyan text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-sphere-electric-blue/40 transform hover:scale-105 transition-all duration-300 flex items-center"
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
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Event Details */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-sphere-deep-space mb-4 flex items-center">
                      <svg
                        className="w-6 h-6 mr-3 text-sphere-electric-blue"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      About This Event
                    </h2>
                    <p className="text-sphere-graphite text-lg leading-relaxed">
                      {data.description}
                    </p>
                  </div>
                </div>

                {/* Sidebar Info */}
                <div className="bg-sphere-mist rounded-2xl p-6 h-fit">
                  <h3 className="text-xl font-bold text-sphere-deep-space mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-sphere-electric-blue"
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
                    Event Location
                  </h3>
                  <p className="text-sphere-graphite text-lg mb-6 p-4 bg-white rounded-xl shadow-sm">
                    {data.location}
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center text-sphere-graphite">
                      <svg
                        className="w-5 h-5 mr-3 text-sphere-electric-blue"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="font-semibold">Date:</span>
                      <span className="ml-2">{formattedDate}</span>
                    </div>

                    <div className="flex items-center text-sphere-graphite">
                      <svg
                        className="w-5 h-5 mr-3 text-sphere-electric-blue"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="font-semibold">Time:</span>
                      <span className="ml-2">{data.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isDeleting && (
        <Modal open={isDeleting} onClose={handleStopDelete}>
          <div className="text-center p-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-sphere-deep-space mb-2">
              Are you sure?
            </h2>
            <p className="text-sphere-graphite mb-6">
              Do you really want to delete <strong>{data?.title}</strong>?<br />
              This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              {isPendingDeletion ? (
                <div className="flex justify-center py-12">
                  <LoadingIndicator size="medium" text="Deleting event..." />
                </div>
              ) : (
                <>
                  <button
                    onClick={handleStopDelete}
                    className="cursor-pointer px-6 py-3 border-2 border-sphere-silver text-sphere-graphite rounded-xl font-semibold hover:bg-sphere-silver/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="cursor-pointer px-6 py-3 bg-linear-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/40 transform hover:scale-105 transition-all duration-300"
                  >
                    Delete Event
                  </button>
                </>
              )}
            </div>
            {isErrorDeleting && (
              <div className="mt-6">
                <ErrorBlock
                  title="Failed to delete event"
                  message={
                    deleteError.info?.message ||
                    "Failed to delete event, please try again later."
                  }
                />
              </div>
            )}
          </div>
        </Modal>
      )}
      <Outlet />
      <div className="min-h-screen bg-linear-to-br from-sphere-deep-space/5 via-sphere-mist to-sphere-neon-cyan/5 py-8">
        <article className="event-details">{content}</article>
      </div>
    </>
  );
}
