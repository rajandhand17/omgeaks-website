import { NextResponse } from "next/server";

const TO_EMAIL = "rajandhand17@gmail.com";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: ContactBody;

  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const company = body.company?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email, and project details are required." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
  }

  const payload = {
    name,
    email,
    phone: phone || "—",
    company: company || "—",
    message,
    _subject: `OmGeaks enquiry from ${name}`,
    _template: "table",
    _captcha: "false",
  };

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${TO_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => ({}))) as { success?: string; message?: string };

    if (!res.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: data.message || "Could not send your message. Please try WhatsApp instead.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: data.success || "Message sent.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Network error while sending. Please try again or use WhatsApp." },
      { status: 502 }
    );
  }
}
