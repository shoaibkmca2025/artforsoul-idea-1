import LoginForm from "./LoginForm";
import { Suspense } from "react";

export const metadata = { title: "Log in — Art For Soul" };

export default function LoginPage() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center py-28">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="font-script text-3xl text-plum-700">Welcome back 🌸</p>
          <h1 className="heading-display mt-1 text-3xl sm:text-4xl">Log in</h1>
        </div>
        <div className="card-journal">
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
