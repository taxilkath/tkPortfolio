import { AspectRatio } from '@taxilkath/ui'
import { cn } from '@taxilkath/utils'

type VideoProps = {
  src: string
  width: number
  height: number
} & React.ComponentProps<'video'>

const Video = (props: VideoProps) => {
  const { src, width, height, controls = true, className, ...rest } = props

  return (
    <AspectRatio ratio={16 / 9}>
      <video
        className={cn('my-4 rounded-lg shadow-lg', className)}
        loop
        muted
        src={src}
        controls={controls}
        width={width}
        height={height}
        {...rest}
      />
    </AspectRatio>
  )
}

export default Video
