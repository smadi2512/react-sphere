import { queryClient } from "../../../queryClient.js";
import { updateEvent } from "../api/http.js";
import { redirect } from "react-router-dom";

export async function editEventAction({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries(["events"]);
  return redirect("../");
}
