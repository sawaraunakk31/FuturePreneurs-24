import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/libs/Provider";
import Head from "next/head";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "FUTUREPRENEURS 10.0",
  description: "FUTUREPRENEURS 10.0",
  icons:{
    icon:["../public/assests/assests/fp_logo_new.svg?v=4"],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <link rel="icon" type="image/svg+xml" href="/assets/fp_logo_new.svg" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <AuthProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
