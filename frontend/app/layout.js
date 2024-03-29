import { Inter } from 'next/font/google'
import './globals.css'

import StoreProvider from './StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Andria',
  description: 'Andria is a book sharing platform. Share your books with others and borrow books from others.',
}

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <StoreProvider>
          {children}
          </StoreProvider>
        </body>
      </html>
  )
}
