import SignupForm from "./SignupForm";
import { Suspense } from "react";

export const metadata = { title: "Create account — Art For Soul" };

export default function SignupPage() {
  return (
    <section className="container-page pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <p className="font-script text-3xl text-plum-700">Begin your journey 🌿</p>
          <h1 className="heading-display mt-1 text-3xl sm:text-4xl">Create your account</h1>
        </div>
        <div className="card-journal">
          <Suspense fallback={null}>
            <SignupForm />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
