import Link from "next/link";

export default function page() {
  return (
    <main className="h-[100vh] w-[100vw] flex items-center justify-center bg">
      <div>Futurepreneurs 10.0      |</div>
      <Link href={'/register'}>Sign In</Link>
    </main>
  );
}
