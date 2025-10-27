import { queryClient } from "../../../queryClient.js";
import { fetchEvent } from "../api/http.js";

export async function editEventLoader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ["events", params.id],
    queryFn: ({ signal }) => fetchEvent({ id: params.id, signal }),
  });
}