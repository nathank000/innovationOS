import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Lightbulb, PlusCircle, Home } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Innovation OS',
  description: 'Create, rank, and track your innovative ideas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-md">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="text-gray-800 hover:text-blue-500 transition-colors flex items-center" aria-label="Home">
                <Lightbulb size={28} className="mr-2" />
                <span className="font-semibold text-xl">Innovation OS</span>
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-gray-600 hover:text-blue-500 transition-colors flex items-center">
                  <Home size={20} className="mr-1" />
                  <span>Home</span>
                </Link>
                <Link href="/ideas" className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors">
                  <PlusCircle size={20} className="mr-2" />
                  <span>New Idea</span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="pt-6">
          {children}
        </div>
      </body>
    </html>
  )
}