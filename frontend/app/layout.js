import { Inter } from 'next/font/google'
import './globals.css'
import { AuthContextProvider } from './_context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Andria',
  description: 'Andria is a book sharing platform. Share your books with others and borrow books from others.',
}

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </AuthContextProvider>
  )
}
