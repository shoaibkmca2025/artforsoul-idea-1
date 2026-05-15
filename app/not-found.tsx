import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page grid min-h-[70vh] place-items-center text-center">
      <div>
        <div className="font-script text-7xl text-rose-dusty">soft 404</div>
        <h1 className="heading-display mt-2 text-3xl">This page is still being painted.</h1>
        <p className="mt-3 body-soft">Take a breath and head back home.</p>
        <Link href="/" className="btn-primary mt-6">Return home</Link>
      </div>
    </div>
  );
}
