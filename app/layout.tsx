import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "@fontsource-variable/schibsted-grotesk";
import { Header } from "./components/Header";
import { SiteFooter } from "./components/SiteFooter";
import { brands } from "./data/site";
import "./globals.css";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Orion",
  description: "Indústria de desenvolvimento e fabricação de soluções para o mercado pet.",
  email: "administrativo@orionpet.com.br",
  knowsAbout: [
    "Desenvolvimento de produtos para o mercado pet",
    "Formulação",
    "Fabricação",
    "Higiene pet",
    "Tratamento de pelagem",
    "Perfumaria pet",
  ],
  brand: brands.map((brand) => ({ "@type": "Brand", name: brand.name })),
};

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "Orion | Soluções industriais para o mercado pet",
    description:
      "A Orion desenvolve, formula, fabrica e envasa soluções de higiene, tratamento, cuidado e perfumaria para marcas do mercado pet.",
    applicationName: "Orion",
    category: "Indústria de soluções para o mercado pet",
    alternates: { canonical: `${origin}/` },
    icons: { icon: "/favicon.png", shortcut: "/favicon.png", apple: "/favicon.png" },
    openGraph: {
      title: "Orion — Tecnologia e excelência para o mercado pet",
      description:
        "Desenvolvimento e fabricação de soluções de higiene, tratamento, cuidado e perfumaria para marcas do mercado pet.",
      type: "website",
      locale: "pt_BR",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Orion — soluções industriais para o mercado pet" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Orion — Tecnologia e excelência para o mercado pet",
      description:
        "Desenvolvimento e fabricação de soluções para marcas do mercado pet.",
      images: [`${origin}/og.png`],
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b6186",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        <Header />
        {children}
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </body>
    </html>
  );
}
