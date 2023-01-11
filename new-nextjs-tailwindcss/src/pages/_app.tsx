import "src/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "src/store";
import { Toaster } from "react-hot-toast";
import { RootLayout } from "src/features/core/layouts/RootLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
        <Toaster />
      </Provider>
  );
}
