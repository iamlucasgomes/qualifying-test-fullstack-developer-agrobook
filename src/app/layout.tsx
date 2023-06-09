import Provider from '@/contexts/Provider'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Bookstore Agrobook',
  description: 'O seu sistema de gerenciamento de Livraria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><Provider>{children}</Provider></body>
    </html>
  )
}
