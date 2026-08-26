type MaxSendResult = {
  ok: boolean;
  status: number;
  data: unknown;
};

export async function sendMaxMessage(text: string): Promise<MaxSendResult> {
  const token = process.env.MAX_BOT_TOKEN;
  const userId = process.env.MAX_USER_ID;

  if (!token) {
    throw new Error("MAX_BOT_TOKEN is not configured");
  }

  if (!userId) {
    throw new Error("MAX_USER_ID is not configured");
  }

  const url = new URL("https://platform-api2.max.ru/messages");

  url.searchParams.set("user_id", userId);
  url.searchParams.set("disable_link_preview", "true");

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      format: "html",
      notify: true,
    }),
  });

  const data = await response.json().catch(() => null);

  return {
    ok: response.ok,
    status: response.status,
    data,
  };
}
