import { createBrowserRouter, Navigate } from "react-router-dom";
import { eventsRoutes } from "./features/events/router/eventsRoutes.jsx";
import RootLayout from "./shared/layouts/RootLayout.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/events" />
      },
      eventsRoutes
    ]
  }
]);
