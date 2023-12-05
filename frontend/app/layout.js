import { Inter } from 'next/font/google'
import './globals.css'
import { AuthContextProvider } from './context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
