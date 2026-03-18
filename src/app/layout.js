import { Inter } from 'next/font/google'
import './globals.css'
import TopHeader from '@/components/TopHeader'
import MainHeader from '@/components/MainHeader'
import NavHeader from '@/components/NavHeader'
import { AuthProvider } from './context/AuthContext'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    template: '%s | BHMaths',
    default: 'BHMaths - Ressources Mathématiques',
  },
  description: 'Plateforme éducative pour l\'apprentissage des mathématiques au Maroc',
  keywords: ['mathématiques', 'éducation', 'Maroc', 'cours', 'exercices', 'collège', 'lycée'],
  authors: [{ name: 'BHMaths' }],
  creator: 'BHMaths',
  publisher: 'BHMaths',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://bhmaths.com'),
  openGraph: {
    title: 'BHMaths - Ressources Mathématiques',
    description: 'Plateforme éducative pour l\'apprentissage des mathématiques au Maroc',
    url: 'https://bhmaths.com',
    siteName: 'BHMaths',
    locale: 'fr_FR',
    type: 'website',
  },
  other: {
    'google-adsense-account': 'ca-pub-3523606019399197',
  },
}

export const viewport = {
  themeColor: '#f97316',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={inter.className}>
      <body>
        <AuthProvider>
          <TopHeader />
          <MainHeader />
          <NavHeader />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
} 