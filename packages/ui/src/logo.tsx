import Image from 'next/image'

type LogoProps = {
  width?: number
  height?: number
  className?: string
}

const Logo = (props: LogoProps) => {
  const { width = 32, height = 32, className } = props

  return (
    <Image
      src="/images/avatar.png"
      alt="Logo"
      width={width}
      height={height}
      className={className}
    />
  )
}

export { Logo }
