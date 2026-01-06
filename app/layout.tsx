import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";


export const metadata: Metadata = {
  title: "Movie Explorer",
  description: "An app where users can see movies and shows based on genre, search movies and shows and the details of it",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
