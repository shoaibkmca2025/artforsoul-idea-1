import nodemailer from "nodemailer";

/**
 * Email notifications via SMTP (Gmail by default).
 *
 * Configure in .env / Vercel:
 *   SMTP_USER   = the Gmail address that sends (e.g. artforsoul.in@gmail.com)
 *   SMTP_PASS   = a Gmail App Password (16 chars, needs 2-Step Verification on)
 *   NOTIFY_EMAILS = comma-separated recipients (defaults to the two studio inboxes)
 *
 * If SMTP isn't configured, these helpers no-op (so the site keeps working).
 */

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);

const NOTIFY_EMAILS = (
  process.env.NOTIFY_EMAILS || "artforsoul.in@gmail.com,nmartstudioz@gmail.com"
)
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

export const isEmailConfigured = () => Boolean(SMTP_USER && SMTP_PASS);

function getTransport() {
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

export type PaidBooking = {
  sessionTitle: string;
  amount: number;
  name?: string | null;
  email: string;
  phone?: string | null;
};

/** Notify the studio that a booking has been paid. Never throws. */
export async function sendBookingPaidEmail(b: PaidBooking): Promise<void> {
  if (!isEmailConfigured()) {
    console.log("[email] SMTP not configured — skipping booking-paid email", b.sessionTitle);
    return;
  }
  try {
    const transport = getTransport();
    const amount = `₹${b.amount.toLocaleString("en-IN")}`;
    const when = new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

    await transport.sendMail({
      from: `"Art For Soul" <${SMTP_USER}>`,
      to: NOTIFY_EMAILS,
      replyTo: b.email,
      subject: `💖 New paid booking — ${b.sessionTitle} (${amount})`,
      text:
        `New paid booking on Art For Soul\n\n` +
        `Service: ${b.sessionTitle}\n` +
        `Amount paid: ${amount}\n` +
        `Client: ${b.name || "—"}\n` +
        `Email: ${b.email}\n` +
        `Phone: ${b.phone || "—"}\n` +
        `Paid at: ${when}\n`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;border:1px solid #eadfce;border-radius:16px;overflow:hidden">
          <div style="background:#6B2D52;color:#FBF7F0;padding:20px 24px">
            <h2 style="margin:0;font-size:18px">💖 New Paid Booking</h2>
            <p style="margin:4px 0 0;opacity:.85;font-size:13px">Art For Soul</p>
          </div>
          <div style="padding:24px;color:#3A2A20">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:8px 0;color:#8C6A4F">Service</td><td style="padding:8px 0;font-weight:600;text-align:right">${b.sessionTitle}</td></tr>
              <tr><td style="padding:8px 0;color:#8C6A4F">Amount paid</td><td style="padding:8px 0;font-weight:600;text-align:right">${amount}</td></tr>
              <tr><td style="padding:8px 0;color:#8C6A4F">Client</td><td style="padding:8px 0;text-align:right">${b.name || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#8C6A4F">Email</td><td style="padding:8px 0;text-align:right">${b.email}</td></tr>
              <tr><td style="padding:8px 0;color:#8C6A4F">Phone</td><td style="padding:8px 0;text-align:right">${b.phone || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#8C6A4F">Paid at</td><td style="padding:8px 0;text-align:right">${when}</td></tr>
            </table>
          </div>
        </div>`,
    });
    console.log("[email] booking-paid sent for", b.sessionTitle);
  } catch (err: any) {
    console.error("[email] failed to send booking-paid:", err?.message);
  }
}
