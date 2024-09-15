
import Link from "next/link";
import Navbar from '../components/navbar';
import Footer from '../components/footer';

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
