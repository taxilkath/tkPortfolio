// file: apps/web/src/app/[locale]/(main)/projects/[slug]/project-media.tsx

'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import { BlurImage } from '@/components/ui/blur-image'
import { XIcon } from 'lucide-react'

// ✨ An animated and accessible Lightbox component using Headless UI
const Lightbox = ({
    isOpen,
    onClose,
    children
}: {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}) => {
    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-50' onClose={onClose}>
                {/*
          The backdrop animation.
          enter/leave classes control the animation phases.
        */}
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black/80 backdrop-blur-md' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4'>
                        {/*
              The modal content animation.
              It fades and scales into view.
            */}
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel as='div' className='relative'>
                                {/* The actual content is passed here */}
                                {children}

                                {/* The close button is now part of the panel */}
                                <button
                                    aria-label='Close'
                                    className='absolute -top-10 right-0 text-white opacity-80 transition hover:opacity-100 md:-right-12 md:-top-4'
                                    onClick={onClose}
                                >
                                    <XIcon size={32} />
                                </button>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

// This part remains the same, but now uses the new animated Lightbox
export const ProjectMedia = ({ slug, name }: { slug: string; name: string }) => {
    const [isLightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxContent, setLightboxContent] = useState<React.ReactNode | null>(
        null
    )

    const openLightbox = (content: React.ReactNode) => {
        setLightboxContent(content)
        setLightboxOpen(true)
    }

    const closeLightbox = () => {
        setLightboxOpen(false)
        setLightboxContent(null)
    }

    const videoProjects = ['saasify', 'somta', 'jobcore','clinic']
    const diagramProjects = ['teenpatti', 'andarbahar']

    const renderMedia = () => {
        if (videoProjects.includes(slug)) {
            const videoSrc = `/images/projects/${slug}/cover.mp4`
            return (
                <div
                    className='cursor-pointer'
                    onClick={() =>
                        openLightbox(
                            <video
                                src={videoSrc}
                                className='max-h-[90vh] max-w-[90vw] rounded-lg'
                                controls
                                autoPlay
                                loop
                            />
                        )
                    }
                >
                    <video
                        src={videoSrc}
                        width={1280}
                        height={832}
                        className='my-12 rounded-lg shadow-lg dark:shadow-black/20'
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={`/images/projects/${slug}/cover.png`}
                    />
                </div>
            )
        }

        if (diagramProjects.includes(slug)) {
            const imgSrc = `/images/projects/${slug}/cover.svg`
            const altText = `${name} gameplay flow diagram`
            return (
                <div
                    className='cursor-pointer'
                    onClick={() =>
                        openLightbox(
                            <BlurImage
                                src={imgSrc}
                                width={1280}
                                height={832}
                                alt={altText}
                                className='max-h-[90vh] max-w-[90vw] rounded-lg bg-white dark:bg-zinc-900'
                            />
                        )
                    }
                >
                    <BlurImage
                        src={imgSrc}
                        width={1280}
                        height={832}
                        alt={altText}
                        className='my-12 rounded-lg bg-white p-2 shadow-lg dark:bg-zinc-900 dark:shadow-black/20'
                        lazy={false}
                    />
                </div>
            )
        }

        // Default case for other images (e.g., .png)
        const imgSrc = `/images/projects/${slug}/cover.png`
        return (
            <div
                className='cursor-pointer'
                onClick={() =>
                    openLightbox(
                        <BlurImage
                            src={imgSrc}
                            width={1280}
                            height={832}
                            alt={name}
                            className='max-h-[90vh] max-w-[90vw] rounded-lg'
                        />
                    )
                }
            >
                <BlurImage
                    src={imgSrc}
                    width={1280}
                    height={832}
                    alt={name}
                    className='my-12 rounded-lg shadow-lg dark:shadow-black/20'
                    lazy={false}
                />
            </div>
        )
    }

    return (
        <>
            {renderMedia()}
            <Lightbox isOpen={isLightboxOpen} onClose={closeLightbox}>
                {lightboxContent}
            </Lightbox>
        </>
    )
}