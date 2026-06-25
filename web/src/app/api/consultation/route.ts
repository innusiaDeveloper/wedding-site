import { NextResponse } from "next/server";

type ConsultationPayload = {
  firstName?: string;
  lastName?: string;
  phone?: string;
  preferredDate?: string;
};

function esc(s: string) {
  return s.replace(
    /[<>&]/g,
    (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]!,
  );
}

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json(
      { ok: false, error: "Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID" },
      { status: 500 },
    );
  }

  let data: ConsultationPayload;
  try {
    data = (await req.json()) as ConsultationPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const firstName = data.firstName?.trim() || "";
  const lastName = data.lastName?.trim() || "";
  const phone = data.phone?.trim() || "";
  const preferredDate = data.preferredDate?.trim() || "";

  if (
    firstName.length < 2 ||
    lastName.length < 2 ||
    phone.replace(/\D/g, "").length < 10 ||
    preferredDate.length === 0
  ) {
    return NextResponse.json(
      { ok: false, error: "Invalid fields" },
      { status: 400 },
    );
  }

  const lines = [
    "📞 <b>Новая заявка: Бесплатная консультация</b>",
    "",
    `👤 <b>Имя:</b> ${esc(firstName)}`,
    `👤 <b>Фамилия:</b> ${esc(lastName)}`,
    `📞 <b>Телефон:</b> ${esc(phone)}`,
    `📅 <b>Желаемая дата:</b> ${esc(preferredDate)}`,
  ].join("\n");

  const resp = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: lines,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });

  const json = await resp.json().catch(() => null);

  console.log("CONSULTATION TELEGRAM STATUS:", resp.status);
  console.log("CONSULTATION TELEGRAM RESPONSE:", json);

  if (!resp.ok || !json?.ok) {
    return NextResponse.json(
      { ok: false, error: "Telegram sendMessage failed", details: json },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
