import { RootLayout } from "src/features/core/layouts/RootLayout";
import Home from "src/pages/index";
import { NotFoundPage } from "src/pages/404";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import LoginPage from "src/pages/login";
import detailRoutes from "src/pages/details/_routes";

const _routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <RootLayout>
        <Outlet />
      </RootLayout>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "details", children: detailRoutes },
      { path: "login", element: <LoginPage /> },
      { path: "404", element: <NotFoundPage /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default _routes;
