import React from "react";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"], // Add the weights your design uses
});

export const metadata = {
  title: "Hamza Lazaar - Portfolio",
  description: "Software Engineering Student Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Change the className here from Geist's variable to poppins.className
        OLD was probably: <body className={GeistSans.className}>
      */}
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}

