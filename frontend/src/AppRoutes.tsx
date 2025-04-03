import { RouterProvider } from "react-router-dom";
import useRoutes from "./hooks/useRoutes";

const AppRoutes = (): JSX.Element => {
  const routes = useRoutes();
  return <RouterProvider router={routes} />;
};

export default AppRoutes;
