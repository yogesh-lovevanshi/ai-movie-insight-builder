import './globals.css'

export const metadata = {
  title: 'AI Movie Insight Builder',
  description: 'Get AI-powered insights for any movie',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
