import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import { ENQUIRY_EMAIL_SUBJECT } from "@/lib/contact-email";

const PRIMARY_TO = process.env.CONTACT_TO_EMAIL || "hello@omgeaks.com";
const BACKUP_TO = "rajandhand17@gmail.com";

function recipients() {
  return [...new Set([PRIMARY_TO, BACKUP_TO].filter(Boolean))];
}

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
};

type Payload = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

function buildHtml(data: Payload) {
  return `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#051937;max-width:640px">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#00AEEF">OmGeaks</p>
      <h2 style="margin:0 0 16px;font-size:22px">${ENQUIRY_EMAIL_SUBJECT}</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:8px 0;border-bottom:1px solid #E8EEF6;width:120px;color:#64748b">Name</td><td style="padding:8px 0;border-bottom:1px solid #E8EEF6;font-weight:600">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #E8EEF6;color:#64748b">Email</td><td style="padding:8px 0;border-bottom:1px solid #E8EEF6"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #E8EEF6;color:#64748b">Phone</td><td style="padding:8px 0;border-bottom:1px solid #E8EEF6">${escapeHtml(data.phone || "—")}</td></tr>
        <tr><td style="padding:8px 0;border-bottom:1px solid #E8EEF6;color:#64748b">Company</td><td style="padding:8px 0;border-bottom:1px solid #E8EEF6">${escapeHtml(data.company || "—")}</td></tr>
      </table>
      <p style="margin:20px 0 8px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#64748b">Message</p>
      <div style="white-space:pre-wrap;background:#F5F8FC;padding:14px 16px;border-radius:10px;font-size:14px">${escapeHtml(data.message)}</div>
      <p style="margin:20px 0 0;font-size:12px;color:#94a3b8">Sent from omgeaks.com/contact</p>
    </div>
  `;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function plainText(data: Payload) {
  return [
    ENQUIRY_EMAIL_SUBJECT,
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Company: ${data.company}`,
    "",
    "Message:",
    data.message,
    "",
    "— omgeaks.com/contact",
  ].join("\n");
}

async function sendWithResend(data: Payload) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;

  const resend = new Resend(key);
  const from = process.env.RESEND_FROM_EMAIL || "OmGeaks Website <onboarding@resend.dev>";

  const result = await resend.emails.send({
    from,
    to: recipients(),
    replyTo: data.email,
    subject: ENQUIRY_EMAIL_SUBJECT,
    html: buildHtml(data),
    text: plainText(data),
  });

  if (result.error) {
    throw new Error(result.error.message);
  }

  return result.data?.id || "sent";
}

async function sendWithGmail(data: Payload) {
  const user = process.env.GMAIL_USER || BACKUP_TO;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!pass) return null;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  const info = await transporter.sendMail({
    from: `"OmGeaks" <${user}>`,
    to: recipients().join(", "),
    replyTo: data.email,
    subject: ENQUIRY_EMAIL_SUBJECT,
    html: buildHtml(data),
    text: plainText(data),
  });

  return info.messageId;
}

async function sendWithFormSubmit(data: Payload, to: string) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Origin: "https://omgeaks.com",
      Referer: "https://omgeaks.com/contact",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
      _subject: ENQUIRY_EMAIL_SUBJECT,
      _template: "table",
      _captcha: "false",
      _replyto: data.email,
      Source: "https://omgeaks.com/contact",
    }),
  });

  const json = (await res.json().catch(() => ({}))) as {
    success?: string | boolean;
    message?: string;
  };
  const ok = json.success === true || String(json.success).toLowerCase() === "true";
  const activation = /activat/i.test(json.message || "");
  if (activation) {
    return { status: "activation" as const, to, message: json.message || "" };
  }
  if (!res.ok || !ok) {
    throw new Error(json.message || `FormSubmit failed for ${to}`);
  }
  return { status: "sent" as const, to, message: json.message || "sent" };
}

async function sendWithWeb3Forms(data: Payload) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return null;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: ENQUIRY_EMAIL_SUBJECT,
      from_name: "OmGeaks",
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      message: data.message,
    }),
  });

  const json = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    message?: string;
  };

  if (!res.ok || json.success === false) {
    throw new Error(json.message || "Web3Forms rejected the submission.");
  }

  return "web3forms";
}

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

  const payload: Payload = {
    name,
    email,
    phone: phone || "—",
    company: company || "—",
    message,
  };

  try {
    const viaResend = await sendWithResend(payload);
    if (viaResend) {
      return NextResponse.json({ ok: true, message: "Message sent.", provider: "resend" });
    }

    const viaGmail = await sendWithGmail(payload);
    if (viaGmail) {
      return NextResponse.json({ ok: true, message: "Message sent.", provider: "gmail" });
    }

    const viaWeb3 = await sendWithWeb3Forms(payload);
    if (viaWeb3) {
      return NextResponse.json({ ok: true, message: "Message sent.", provider: "web3forms" });
    }

    const delivered: string[] = [];
    const activation: string[] = [];
    const failures: string[] = [];
    for (const to of recipients()) {
      try {
        const result = await sendWithFormSubmit(payload, to);
        if (result.status === "sent") delivered.push(to);
        else activation.push(to);
      } catch (err) {
        failures.push(err instanceof Error ? err.message : String(err));
      }
    }

    if (delivered.length > 0) {
      return NextResponse.json({
        ok: true,
        message: "Message sent.",
        provider: "formsubmit",
        delivered,
      });
    }

    if (activation.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          needsActivation: true,
          error:
            "First-time email setup: check rajandhand17@gmail.com (Inbox and Spam) for a FormSubmit “Activate Form” email, click the link once, then submit the contact form again. After that, every enquiry will arrive.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: failures[0] || "No email provider could send this message.",
        fallback: true,
      },
      { status: 502 }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Could not send your message.";
    return NextResponse.json({ ok: false, error: msg, fallback: true }, { status: 502 });
  }
}
