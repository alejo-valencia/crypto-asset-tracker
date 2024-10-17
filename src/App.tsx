import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Coin, Compare, Home } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/coin/:id",
    element: <Coin />,
  },
  {
    path: "/compare",
    element: <Compare />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
