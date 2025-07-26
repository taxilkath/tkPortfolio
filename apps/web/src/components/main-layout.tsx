import Image from 'next/image'

import Footer from './layout/footer'
import Header from './layout/header'

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props

  return (
    <div className='relative overflow-hidden'>
      <Header />
      <main id='skip-nav' className='mx-auto mb-16 w-full max-w-6xl flex-1 px-4 py-24 sm:px-8'>
        {children}
      </main>
      <Footer />
      <Image
        width={1512}
        height={550}
        className='absolute -left-[31rem] -top-80 -z-10 -rotate-90'
        src='/images/gradient-background-top.png'
        alt=''
        role='presentation'
        priority
      />
      <Image
        width={1512}
        height={447}
        className='absolute -bottom-6 -right-[40rem] -z-10 -rotate-x-1/2'
        src='/images/gradient-background-bottom.png'
        alt=''
        role='presentation'
        priority
      />
    </div>
  )
}

export default MainLayout
