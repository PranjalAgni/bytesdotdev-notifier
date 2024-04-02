import { fetch } from "https://esm.town/v/std/fetch";

// Send a pushover message.
// token, user, and other opts are as specified at https://pushover.net/api
export default async function pushover({
  token,
  user,
  message,
  title,
  url,
}: {
  token: string;
  user: string;
  message: string;
  title: string;
  url: string;
}) {
  return await fetch("https://api.pushover.net/1/messages.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      user,
      message,
      title,
      url,
    }),
  });
}
