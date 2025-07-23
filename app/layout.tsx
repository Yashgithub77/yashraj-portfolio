import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Yashraj Thakur - Portfolio",
  description:
    "AI/ML Enthusiast & Aspiring DevOps Engineer - B.Tech CSE student specializing in AI/ML, transitioning to DevOps with focus on AI and cloud technologies.",
  keywords:
    "Yashraj Thakur, AI, ML, Machine Learning, DevOps Engineer, Portfolio, React, Next.js, Python, Java, Cloud Technologies",
  authors: [{ name: "Yashraj Thakur" }],
  openGraph: {
    title: "Yashraj Thakur - Portfolio",
    description: "AI/ML Enthusiast & Aspiring DevOps Engineer",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jetbrainsMono.variable} font-mono antialiased bg-gray-900 text-white`}>{children}</body>
    </html>
  )
}
