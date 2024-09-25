import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/libs/Provider";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
  description: "FUTUREPRENEURS 10.0 - Empowering Innovation and Entrepreneurship",
  keywords: "FuturePreneurs, FuturePreneurs 10.0, Entrepreneurs, Innovation, VIT, Ecell",
  icons: {
    icon: ["/favicon.ico"],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <AuthProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
          <SpeedInsights/>
        </body>
      </AuthProvider>
    </html>
  );
}
