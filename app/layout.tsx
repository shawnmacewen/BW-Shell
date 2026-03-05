import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Portal UI - BW-Shell",
  description: "BW-Shell Admin Portal",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
