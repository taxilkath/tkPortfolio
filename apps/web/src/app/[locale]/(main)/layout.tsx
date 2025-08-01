import MainLayout from '@/components/main-layout'
import { Analytics } from "@vercel/analytics/next"
type LayoutProps = {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  const { children } = props

  return (
    <MainLayout>
      {children}
      <Analytics />
    </MainLayout>
  )
}

export default Layout
