import { NextResponse } from "next/server";
import { sendMaxMessage } from "@/lib/max";
import { createLead } from "@/lib/leads";

type ConsultationPayload = {
  name?: string;
  phone?: string;
  preferredDate?: string;
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

export async function POST(request: Request) {
  let data: ConsultationPayload;

  try {
    data = (await request.json()) as ConsultationPayload;
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

  const name = data.name?.trim() ?? "";
  const phone = data.phone?.trim() ?? "";
  const preferredDate = data.preferredDate?.trim() ?? "";

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

  if (
    name.length < 2 ||
    phone.replace(/\D/g, "").length < 10 ||
    preferredDate.length === 0
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
    "📞 <b>Новая заявка: Бесплатная консультация</b>",
    "",
    `👤 <b>Имя:</b> ${escapeHtml(name)}`,
    `📞 <b>Телефон:</b> ${escapeHtml(phone)}`,
    `📅 <b>Желаемая дата:</b> ${escapeHtml(preferredDate)}`,
    "",
    "✅ <b>Согласие на обработку персональных данных:</b> получено",
  ].join("\n");

  try {    await createLead({
      leadType: "consultation",
      name,
      phone,
      eventDate: preferredDate,
      personalDataConsent: true,
    });

    const result = await sendMaxMessage(message);

    console.log("CONSULTATION MAX STATUS:", result.status);

    if (!result.ok) {
      console.error("CONSULTATION MAX ERROR:", result.data);

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
    console.error("CONSULTATION REQUEST ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Unable to send consultation request",
      },
      {
        status: 500,
      },
    );
  }
}
