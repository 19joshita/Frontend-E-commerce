// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import ReduxProvider from "./providers/ReduxProvider";
import Container from "../app/components/ui/Container";
import Header from "../app/components/ui/Header";
import Footer from "../app/components/ui/Footer";

export const metadata: Metadata = {
  title: "E-Commerce Demo",
  description:
    "E-Commerce frontend demo built with Next.js App Router and TypeScript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <ReduxProvider>
            {/* Header - client component */}
            <header className="border-b">
              <Container>
                <Header />
              </Container>
            </header>

            {/* Main content */}
            <main className="py-6">{children}</main>

            {/* Footer - client component */}
            <footer className="border-t mt-12 py-6">
              <Container>
                <Footer />
              </Container>
            </footer>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
