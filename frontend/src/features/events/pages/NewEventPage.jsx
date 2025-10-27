import { useNavigate } from "react-router-dom";
import EventForm from "../components/EventForm.jsx";
import { useMutation } from "@tanstack/react-query";
import { createNewEvent } from "../api/http.js";
import ErrorBlock from "../../../shared/components/ui/ErrorBlock.jsx";
import { queryClient } from "../../../queryClient.js";
import LoadingIndicator from "../../../shared/components/ui/LoadingIndicator.jsx";

export default function NewEventPage() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: createNewEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate("/events");
    },
  });

  function handleSubmit(formData) {
    mutate({ event: formData });
  }

  function handleCancel() {
    navigate("/events");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-sphere-deep-space/5 via-sphere-mist to-sphere-neon-cyan/5">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-linear-to-r from-sphere-electric-blue to-sphere-neon-cyan bg-clip-text text-transparent mb-4">
              Create New Event
            </h1>
            <p className="text-xl text-sphere-graphite max-w-2xl mx-auto">
              Share your amazing event with the ReactSphere community. Fill in
              the details below to get started.
            </p>
          </div>

          {/* Event Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            <EventForm onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-8 border-t border-sphere-silver/20">
                {isPending ? (
                  <div className="flex justify-center py-12">
                    <LoadingIndicator size="medium" text="Creating your event..."/>
                  </div>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-8 py-4 border-2 border-sphere-silver text-sphere-graphite rounded-xl font-semibold hover:bg-sphere-silver/10 transition-all duration-300 text-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-linear-to-r from-sphere-electric-blue to-sphere-neon-cyan text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-sphere-electric-blue/40 transform hover:scale-105 transition-all duration-300 text-lg"
                    >
                      Create Event
                    </button>
                  </>
                )}
              </div>
            </EventForm>
            {isError && (
              <div className="mt-8">
                <ErrorBlock
                  title="Failed to create event"
                  message={
                    error.info?.message ||
                    "Failed to create event. Please check your data and try again."
                  }
                />
              </div>
            )}
          </div>
          {/* Help Section */}
          <div className="mt-12 bg-sphere-mist rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-sphere-deep-space mb-4">
              💡 Tips for a great event
            </h3>
            <ul className="text-sphere-graphite space-y-2">
              <li>
                * Choose a clear, high-quality image that represents your event
              </li>
              <li>
                * Write a detailed description to attract the right audience
              </li>
              <li>* Set a realistic date and time for maximum attendance</li>
              <li>* Provide specific location details for easy navigation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}