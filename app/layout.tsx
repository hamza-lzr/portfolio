import React from "react";
import "@fontsource/raleway/400.css";
import "./globals.css";

export const metadata = {
  title: "Hamza Lazaar - Software Engineer",
  description: "Software Engineer and Fullstack Web Developer at VOID Agency.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
