import EventsPage from "../pages/EventsPage.jsx";
import NewEventPage from "../pages/NewEventPage.jsx";
import EventDetailsPage from "../pages/EventDetailsPage.jsx";
import EditEventPage from "../pages/EditEventPage.jsx";
import { editEventAction } from "./eventsActions.js";
import { editEventLoader } from "./eventsLoaders.js";

export const eventsRoutes = {
  path: "/events",
  children: [
    {
      index: true,
      element: <EventsPage />,
    },
    {
      path: "new",
      element: <NewEventPage />,
    },
    {
      path: ":id",
      element: <EventDetailsPage />,
      children: [
        {
          path: "edit",
          element: <EditEventPage />,
          loader: editEventLoader,
          action: editEventAction,
        },
      ],
    },
  ],
};