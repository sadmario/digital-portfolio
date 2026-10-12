import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "G. Aravinth | Embedded Systems & Networking Portfolio",
  description: "Explore the premium engineering portfolio of G. Aravinth, an Embedded Systems & Networking enthusiast. Discover advanced IoT projects, research on sleepwalking detection (Sleep Sentrix), microcontrollers development, and hackathon prototypes.",
  keywords: [
    "G. Aravinth",
    "Embedded Systems",
    "Networking",
    "IoT Developer",
    "Sleep Sentrix",
    "Microcontrollers",
    "C++ Developer",
    "Hardware-Software Integration",
    "Computer Science Portfolio"
  ],
  authors: [{ name: "G. Aravinth" }],
  creator: "G. Aravinth",
  openGraph: {
    title: "G. Aravinth | Embedded Systems & Networking Portfolio",
    description: "Explore the premium engineering portfolio of G. Aravinth, featuring IoT systems, microcontroller integrations, and research publications.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakartaSans.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-main text-text-main relative selection:bg-brand-highlight selection:text-white">
        {/* Cinematic noise texture overlay */}
        <div className="noise-overlay" />
        
        {/* Core page contents */}
        {children}
      </body>
    </html>
  );
}
