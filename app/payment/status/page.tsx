import { Suspense } from "react";
import StatusView from "./StatusView";

export const metadata = { title: "Payment status — Art For Soul" };
export const dynamic = "force-dynamic";

export default function PaymentStatusPage() {
  return (
    <section className="container-page flex min-h-[70vh] items-center justify-center py-28">
      <Suspense fallback={null}>
        <StatusView />
      </Suspense>
    </section>
  );
}
