import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routes } from "./routes";
import { Toaster } from "react-hot-toast";
function App() {
  const router = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </>
  );
}

export default App;
