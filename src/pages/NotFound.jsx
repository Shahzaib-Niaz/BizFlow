import { Link } from "react-router-dom";
import { ArrowLeft, FileQuestion } from "lucide-react";

function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
          <FileQuestion size={30} />
        </div>

        <p className="mt-6 text-6xl font-bold text-white">404</p>

        <h1 className="mt-4 text-2xl font-semibold text-white">
          Page Not Found
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          <ArrowLeft size={17} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;