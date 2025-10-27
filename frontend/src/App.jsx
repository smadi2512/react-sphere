import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient.js";

import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
