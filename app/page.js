// app/page.js
import Link from "next/link";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Page() {
  return (
    <main>
      <Navbar />
      <div>Futurepreneurs 10.0</div>
      <Link href="/userDetails">Sign In</Link>
      <Footer />
    </main>
  );
}
