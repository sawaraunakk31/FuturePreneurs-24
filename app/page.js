import Link from "next/link";

export default function page() {
  return (
    <main>
      <div>Futurepreneurs 10.0</div>
      <Link href={'/register'}>Sign In</Link>
    </main>
  );
}
