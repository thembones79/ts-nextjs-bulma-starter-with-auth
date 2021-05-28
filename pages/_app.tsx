import type { AppProps, AppContext } from "next/app";
import axios from "axios";
import { Header } from "../components/header";
import { IUser } from "./users";
import "../styles/bulma.scss";
import "../styles/globals.scss";

interface AppWithUser extends AppProps {
  currentUser: IUser;
}

function AppComponent({ Component, pageProps, currentUser }: AppWithUser) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
}

AppComponent.getInitialProps = async (appContext: AppContext) => {
  const { Component, ctx } = appContext;

  const options =
    typeof window === "undefined"
      ? { headers: ctx.req?.headers, withCredentials: true }
      : { withCredentials: true };

  const { data } = await axios.get(
    "http://localhost:3090/api/v1/users/currentuser",
    options
  );

  let pageProps = {};

  const ctxWithUser = { ...ctx, ...data };

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctxWithUser);
  }
  return { pageProps, ...data };
};

export default AppComponent;
