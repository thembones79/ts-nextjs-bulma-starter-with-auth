import axios from "axios";
import type { AppContext } from "next/app";

export const ssrRequest = async (ctx: AppContext["ctx"], route: string) => {
  const options =
    typeof window === "undefined"
      ? { headers: ctx.req?.headers, withCredentials: true }
      : { withCredentials: true };

  try {
    const { data } = await axios.get(
      `http://localhost:3090/api/v1${route}`,
      options
    );

    return { data };
  } catch (error) {
    console.warn(error);
    return { data: null };
  }
};
