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
    icon:["/favicon.ico"],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
      <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content="FuturePreneurs,Futurepreneus 10.0,FuturePreneurs 10.0, Entrepreneurs, Innovation, VIT, Ecell" />
      </Head>
      <AuthProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
