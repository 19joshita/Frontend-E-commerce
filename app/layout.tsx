import "./globals.css";
import type { Metadata } from "next";
import ReduxProvider from "./providers/ReduxProvider";
import Container from "../app/components/ui/Container";
import CartIcon from "../app/components/cart/CartIcon";

export const metadata: Metadata = {
  title: "E-Commerce Demo",
  description:
    "E-Commerce frontend demo built with Next.js App Router and TypeScript",
};

// ⭐ Stable value (Fixes hydration error)
const currentYear = new Date().getFullYear();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Client-side Redux Provider */}
        <ReduxProvider>
          {/* Header */}
          <header className="border-b">
            <Container>
              <div className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <img src="/logo.png" alt="logo" className="h-8 w-8" />
                  <h1 className="text-lg font-semibold">Shop Demo</h1>
                </div>

                {/* Uses Redux → client component */}
                <CartIcon />
              </div>
            </Container>
          </header>

          {/* Main Content */}
          <main className="py-6">{children}</main>

          {/* Footer */}
          <footer className="border-t mt-12 py-6">
            <Container>
              <p className="text-sm text-center">© {currentYear} ShopDemo</p>
            </Container>
          </footer>
        </ReduxProvider>
      </body>
    </html>
  );
}
