import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  phone?: string;
  date?: string;
  guests?: number | string;
  city?: string;
  promo?: string | null;

  // из калькулятора
  format?: "classic" | "chamber" | "luxury" | string;
  venue?: "restaurant" | "country" | "loft" | "openair" | string;
  decor?: "minimal" | "medium" | "wow" | string;
  photoVideo?: "photo" | "photo_video" | "cinema" | string;

  estimate_min?: number;
  estimate_max?: number;
};

function esc(s: string) {
  return s.replace(
    /[<>&]/g,
    (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c]!,
  );
}

function formatRub(n: number) {
  return new Intl.NumberFormat("ru-RU").format(n) + " ₽";
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

  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const lines = [
    "💍 <b>Новая заявка: Расчёт бюджета</b>",
    "",
    `👤 <b>Имя:</b> ${esc(data.name?.trim() || "—")}`,
    `📞 <b>Телефон:</b> ${esc(data.phone?.trim() || "—")}`,
    `📅 <b>Дата:</b> ${esc(data.date?.trim() || "—")}`,
    `👥 <b>Гостей:</b> ${esc(String(data.guests ?? "—"))}`,
    `📍 <b>Город:</b> ${esc(data.city?.trim() || "—")}`,
    data.promo?.trim() ? `🏷 <b>Промокод:</b> ${esc(data.promo.trim())}` : null,

    "",
    "<b>Параметры:</b>",
    data.format ? `• Формат: ${esc(String(data.format))}` : null,
    data.venue ? `• Площадка: ${esc(String(data.venue))}` : null,
    data.decor ? `• Декор: ${esc(String(data.decor))}` : null,
    data.photoVideo ? `• Фото / Видео: ${esc(String(data.photoVideo))}` : null,

    "",
    typeof data.estimate_min === "number" &&
    typeof data.estimate_max === "number"
      ? `💰 <b>Оценка бюджета:</b> ${formatRub(
          data.estimate_min,
        )} – ${formatRub(data.estimate_max)}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

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
  console.log("BUDGET TELEGRAM STATUS:", resp.status);
  console.log("BUDGET TELEGRAM RESPONSE:", json);

  if (!resp.ok || !json?.ok) {
    return NextResponse.json(
      { ok: false, error: "Telegram sendMessage failed", details: json },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
