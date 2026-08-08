import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { PaletteProvider } from "@/components/palette-provider";
import PaletteSidebar from "@/components/palette-sidebar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import SmoothScroll from "@/components/smooth-scroll";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-geist-mono",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["400", "500", "600", "700"],
});

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: DATA.name,
    url: DATA.url,
    jobTitle: DATA.description,
    description: DATA.description,
    image: `${DATA.url}${DATA.avatarUrl}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: DATA.location,
    },
    sameAs: Object.values(DATA.contact.social).map((social) => social.url),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: DATA.name,
    url: DATA.url,
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var ts=["light","dark","latte","frappe","macchiato","mocha"];var p=localStorage.getItem("palette");if(ts.indexOf(p)===-1)p=null;if(!p)p=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var d=document.documentElement;d.classList.add(p);if(p!=="light"&&p!=="latte")d.classList.add("dark");var a=localStorage.getItem("accent");if(a)d.style.setProperty("--link",a);}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable,
          bricolage.variable
        )}
      >
        <PaletteProvider>
          <TooltipProvider delay={0}>
            <ScrollProgress />
            <div className="absolute inset-0 top-0 left-0 right-0 h-[180px] overflow-hidden z-0">
              <FlickeringGrid
                className="h-full w-full"
                squareSize={2}
                gridGap={2}
                style={{
                  maskImage: "linear-gradient(to bottom, black, transparent)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black, transparent)",
                }}
              />
            </div>
            <div className="relative z-10 max-w-2xl mx-auto py-12 pb-24 sm:py-24 px-6">
              <SmoothScroll>{children}</SmoothScroll>
              <Footer />
            </div>
            <Navbar />
            <PaletteSidebar />
          </TooltipProvider>
        </PaletteProvider>
      </body>
    </html>
  );
}
