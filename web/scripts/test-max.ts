export {};

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} не найден в .env.local`);
  }

  return value;
}

const maxBotToken = getRequiredEnv("MAX_BOT_TOKEN");

async function runMaxUpdatesTest(): Promise<void> {
  const response = await fetch("https://platform-api2.max.ru/updates", {
    method: "GET",
    headers: {
      Authorization: maxBotToken,
    },
  });

  const text = await response.text();

  console.log("HTTP STATUS:", response.status);

  if (!response.ok) {
    console.error("MAX API ERROR:");
    console.error(text);
    return;
  }

  try {
    const data: unknown = JSON.parse(text);

    console.log("MAX RESPONSE:");
    console.log(JSON.stringify(data, null, 2));
  } catch {
    console.log("MAX вернул ответ не в формате JSON:");
    console.log(text);
  }
}

runMaxUpdatesTest().catch((error: unknown) => {
  console.error("ERROR:", error);
});
