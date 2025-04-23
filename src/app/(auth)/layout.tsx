// src/app/auth/layout.tsx
export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="pt">
        <body>{children}</body>
      </html>
    )
  }
  