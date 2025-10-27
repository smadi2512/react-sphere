import {
  Link,
  useNavigate,
  useParams,
  useNavigation,
} from "react-router-dom";
import Modal from "../../../shared/components/ui/Modal.jsx";
import EventForm from "../components/EventForm.jsx";
import { queryClient } from "../../../queryClient.js";
import { fetchEvent, updateEvent } from "../api/http.js";
import { useQuery, useMutation } from "@tanstack/react-query";
import ErrorBlock from "../../../shared/components/ui/ErrorBlock.jsx";
import LoadingIndicator from "../../../shared/components/ui/LoadingIndicator.jsx";

export default function EditEventPage() {
  const navigate = useNavigate();
  const params = useParams();
  const eventId = params.id;
  const { state } = useNavigation();

  const { data, isError, error, isPending } = useQuery({
    queryKey: ["events", eventId],
    queryFn: ({ signal }) => fetchEvent({ id: eventId, signal }),
    staleTime: 10000,
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      const newData = data.event;
      await queryClient.cancelQueries({ queryKey: ["events", eventId] });
      const previousEvent = queryClient.getQueryData(["events", eventId]);
      queryClient.setQueryData(["events", eventId], newData);

      return { previousEvent };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", eventId], context.previousEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["events", eventId]);
    },
  });

  function handleSubmit(formData) {
    mutate({ id: eventId, event: formData });
    navigate("../");
  }

  function handleClose() {
    navigate("../"); //go up one level
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
      <div className="p-6">
        <ErrorBlock
          title="Failed to load event"
          message={
            error.info?.message ||
            "Failed to load event. Please check your inputs and try later."
          }
        />
        <div className="flex justify-center mt-6">
          <Link
            to="../"
            className="bg-linear-to-r from-sphere-electric-blue to-sphere-neon-cyan text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-sphere-electric-blue/40 transform hover:scale-105 transition-all duration-300"
          >
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  if (data) {
    content = (
      <div className="p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold bg-linear-to-r from-sphere-electric-blue to-sphere-neon-cyan bg-clip-text text-transparent">
            Edit Event
          </h2>
          <p className="text-sphere-graphite mt-2">Update your event details</p>
        </div>

        <EventForm inputData={data} onSubmit={handleSubmit}>
          <div className="flex justify-end space-x-4 pt-6 border-t border-sphere-silver/20">
            {state === "submitting" ? (
              <div className="flex justify-center py-12">
                <LoadingIndicator size="small" text="Updating event..."/>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleClose}
                  className="cursor-pointer px-6 py-3 border-2 border-sphere-silver text-sphere-graphite rounded-xl font-semibold hover:bg-sphere-silver/10 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="cursor-pointer bg-linear-to-r from-sphere-electric-blue to-sphere-neon-cyan text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-sphere-electric-blue/40 transform hover:scale-105 transition-all duration-300"
                >
                  Update Event
                </button>
              </>
            )}
          </div>
        </EventForm>
      </div>
    );
  }

  return (
    <Modal open={true} onClose={handleClose} size="lg">
      {content}
    </Modal>
  );
}
