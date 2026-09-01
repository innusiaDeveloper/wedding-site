import { NextResponse } from "next/server";
import { sendMaxMessage } from "@/lib/max";
import { createLead } from "@/lib/leads";

type BudgetPayload = {
  name?: string;
  phone?: string;
  date?: string;
  guests?: string | number;
  city?: string;
  registryOffice?: string | null;

  format?: "classic" | "chamber" | "luxury";
  venue?: "restaurant" | "country" | "loft" | "openair";

  personalDataConsent?: boolean;
};

function escapeHtml(value: string) {
  return value.replace(
    /[<>&]/g,
    (character) =>
      (
        ({
          "<": "&lt;",
          ">": "&gt;",
          "&": "&amp;",
        }) as Record<string, string>
      )[character],
  );
}

function formatWeddingType(type?: string) {
  switch (type) {
    case "classic":
      return "Классическая";
    case "chamber":
      return "Камерная";
    case "luxury":
      return "Премиальная";
    default:
      return "—";
  }
}

function formatVenue(type?: string) {
  switch (type) {
    case "restaurant":
      return "Ресторан";
    case "country":
      return "Загородная площадка";
    case "loft":
      return "Лофт";
    case "openair":
      return "Открытая площадка";
    default:
      return "—";
  }
}

export async function POST(request: Request) {
  let data: BudgetPayload;

  try {
    data = (await request.json()) as BudgetPayload;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid JSON",
      },
      {
        status: 400,
      },
    );
  }

  if (data.personalDataConsent !== true) {
    return NextResponse.json(
      {
        ok: false,
        error: "Personal data consent is required",
      },
      {
        status: 400,
      },
    );
  }

  const name = data.name?.trim() ?? "";
  const phone = data.phone?.trim() ?? "";
  const date = data.date?.trim() ?? "";
  const city = data.city?.trim() ?? "";
  const registryOffice = data.registryOffice?.trim() ?? "";
  const guests = String(data.guests ?? "").trim();

  if (
    name.length < 2 ||
    phone.replace(/\D/g, "").length < 10 ||
    city.length < 2 ||
    date.length === 0 ||
    guests.length === 0
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid fields",
      },
      {
        status: 400,
      },
    );
  }

  const message = [
    "💍 <b>Новая заявка: Расчёт свадьбы</b>",
    "",
    `👤 <b>Имя:</b> ${escapeHtml(name)}`,
    `📞 <b>Телефон:</b> ${escapeHtml(phone)}`,
    `📅 <b>Дата свадьбы:</b> ${escapeHtml(date)}`,
    `👥 <b>Количество гостей:</b> ${escapeHtml(guests)}`,
    `📍 <b>Город:</b> ${escapeHtml(city)}`,

    registryOffice ? `🏛 <b>ЗАГС:</b> ${escapeHtml(registryOffice)}` : null,

    "",
    "<b>Параметры мероприятия</b>",
    `• Формат: ${formatWeddingType(data.format)}`,
    `• Площадка: ${formatVenue(data.venue)}`,
    "",
    "✅ <b>Согласие на обработку персональных данных:</b> получено",
  ]
    .filter((line): line is string => Boolean(line))
    .join("\n");

  try {
    await createLead({
      leadType: "budget",
      name,
      phone,
      eventDate: date,
      guests: Number(guests),
      city,
      registryOffice: registryOffice || null,
      weddingFormat: data.format ?? null,
      venueType: data.venue ?? null,
      personalDataConsent: true,
    });

    const result = await sendMaxMessage(message);

    console.log("BUDGET MAX STATUS:", result.status);

    if (!result.ok) {
      console.error("BUDGET MAX ERROR:", result.data);

      return NextResponse.json(
        {
          ok: false,
          error: "MAX sendMessage failed",
        },
        {
          status: 502,
        },
      );
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error("BUDGET REQUEST ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to send budget request",
      },
      {
        status: 500,
      },
    );
  }
}
