import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col space-y-4 items-center justify-center">
      <h1 className="text-4xl">404</h1>
      <p>We couldn&apos;t find the page you were looking for.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFoundPage;
