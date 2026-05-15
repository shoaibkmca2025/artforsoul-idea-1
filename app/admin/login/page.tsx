import LoginForm from "./LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-screen place-items-center px-5">
      <div className="card-journal w-full max-w-md">
        <h1 className="font-script text-4xl text-earth-900">Studio sign in</h1>
        <p className="mt-1 text-sm body-soft">Welcome back. Tend your studio softly.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
