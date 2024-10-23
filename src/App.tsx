import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useWallet } from "./hooks";
import { Coin, Compare, Home, MyAssets } from "./pages";

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
  { path: "/my-assets", element: <MyAssets /> },
]);

function App() {
  const { checkWalletConnection } = useWallet();

  useEffect(() => {
    checkWalletConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
