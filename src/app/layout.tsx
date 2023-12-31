import { RepositoryHeader } from '@/components/RepositoryHeader'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import "./globals.css"
import { RepoServerAPIProvider } from '@/contexts/RepoServerAPIContext'

const openSans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Glimpse',
  description: 'Application to glimpse your favorite Github repositories',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <main className="flex min-h-screen flex-col items-center px-16">
          <RepositoryHeader />
          <RepoServerAPIProvider>
            {children}
          </RepoServerAPIProvider>
        </main>
      </body>
    </html>
  )
}
