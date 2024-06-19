import Link from "next/link";

export default function Home() {
  return (
    <main className="home-container flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-8">
        <h1 className="text-4xl font-bold">Web Page Builder</h1>
        <Link href="/builder">
          <div className="text-gradient text-lg font-bold text-center">Get Started</div>
        </Link>
      </div>
    </main>
  );
}
