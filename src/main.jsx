import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import AddorEditTodo from "./pages/AddorEditTodo.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/add",
    element: <AddorEditTodo />,
  },
  {
    path: "/edit/:id",
    element: <AddorEditTodo />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
