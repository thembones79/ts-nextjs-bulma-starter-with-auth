import type { AppContext } from "next/app";
import { ssrRequest } from "../../api/ssr-request";
import { IUser } from "./";

interface ShowUserProps {
  user: IUser;
}

const ShowUser = ({ user }: ShowUserProps) => {
  if (!user) {
    console.log("Router or server");
    return <h1>User not found</h1>;
  } else {
    const { username, email } = user;
    return (
      <div>
        <div>{username}</div>
        <div>{email}</div>
      </div>
    );
  }
};

ShowUser.getInitialProps = async (ctx: AppContext["ctx"]) => {
  const { userId } = ctx.query;
  const route = `/users/${userId}`;
  const { data } = await ssrRequest(ctx, route);
  return { user: data };
};

export default ShowUser;
