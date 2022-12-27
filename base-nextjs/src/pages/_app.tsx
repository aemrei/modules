import "src/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "src/store";
import { BrowserRouter, useRoutes } from "react-router-dom";
import _routes from "src/pages/_routes";
import { Toaster } from "react-hot-toast";

const Routes = () => {
  const routes = useRoutes(_routes);
  return routes;
};

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <Toaster />
    </Provider>
  );
}
