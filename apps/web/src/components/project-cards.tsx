'use client'

import type { Project } from 'content-collections'

import { BlurImage } from '@/components/ui/blur-image'
import Link from './link'

type ProjectCardProps = Project
type ProjectCardsProps = {
  projects: Project[]
}

const ProjectCards = (props: ProjectCardsProps) => {
  const { projects } = props

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {projects.map((project) => (
        <ProjectCard key={project.slug} {...project} />
      ))}
    </div>
  )
}

const ProjectCard = (props: ProjectCardProps) => {
  const { name, description, techstack, slug } = props

  // List of slugs for projects that should show a video or diagram
  const videoProjects = ['saasify', 'somta', 'jobcore','clinic','portfolio']
  const diagramProjects = ['teenpatti', 'andarbahar']

  return (
    <Link href={`/projects/${slug}`} className='shadow-feature-card group rounded-xl px-2 py-4'>
      {videoProjects.includes(slug) ? (
        <video
          src={`/images/projects/${slug}/cover.mp4`}
          width={1280}
          height={832}
          className='rounded-lg group-hover:scale-105'
          autoPlay
          loop
          muted
          playsInline
          poster={`/images/projects/${slug}/cover.png`}
        />
      ) : diagramProjects.includes(slug) ? (
        // Use an image of the diagram instead of rendering it
        <BlurImage
          src={`/images/projects/${slug}/cover.svg`} // <-- Path to your new SVG diagram
          width={1280}
          height={832}
          imageClassName='group-hover:scale-105 bg-white dark:bg-zinc-900 p-2' // <-- Added styles for the container
          alt={`${name} gameplay flow diagram`}
          className='rounded-lg'
        />
      ) : (
        <BlurImage
          src={`/images/projects/${slug}/cover.png`}
          width={1280}
          height={832}
          imageClassName='group-hover:scale-105'
          alt={name}
          className='rounded-lg'
        />
      )}
      <div className='flex-1 px-2 py-4'>
        <div className='space-y-2'>
          <h2 className='font-heading text-xl font-bold'>{name}</h2>
          <div className='text-muted-foreground font-body'>{description}</div>
        </div>
        <div className='mt-4 flex items-center'>
          <div className='relative overflow-hidden w-full h-8 group/marquee'>
            <div
              className='flex gap-2 animate-marquee group-hover/marquee:[animation-play-state:paused]'
              style={{ willChange: 'transform' }}
            >
              {techstack.map((label) => (
                <div
                  key={label}
                  className='rounded-full border bg-zinc-50 px-3 py-2 text-xs leading-4 dark:bg-zinc-900 whitespace-nowrap'
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCards
