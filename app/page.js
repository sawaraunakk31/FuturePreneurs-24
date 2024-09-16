import Link from "next/link";
import Navbar from '../components/Navbar';

export default function page() {
  return (
    <main>
      <Navbar />
      <div>Futurepreneurs 10.0</div>
      <Link href={'/userDetails'}>Sign In</Link>
    </main>
  );
}
