'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { Button } from '@taxilkath/ui'
import { cn } from '@taxilkath/utils'
import { renderAsync } from 'docx-preview'
import { X, Download, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

type WordViewerProps = {
  isOpen: boolean
  onClose: () => void
  wordUrl: string
  title?: string
}

const WordViewer = (props: WordViewerProps) => {
  const { isOpen, onClose, wordUrl, title = 'Document' } = props
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const viewerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen || !viewerRef.current) return

    // Clear previous content and state
    viewerRef.current.innerHTML = ''
    setError(null)
    setLoading(true)

    const renderDocument = async () => {
      try {
        const absoluteUrl = new URL(wordUrl, window.location.href).href
        const response = await fetch(absoluteUrl)

        if (!response.ok) {
          throw new Error(
            `Document not found: ${response.status} ${response.statusText}`
          )
        }

        const docBlob = await response.blob()

        // Render the DOCX file into the ref container
        await renderAsync(docBlob, viewerRef.current!)
      } catch (err) {
        console.error('Failed to access or render document:', err)
        const message =
          err instanceof Error ? err.message : 'An unknown error occurred'
        setError(
          `Could not display the document: ${message}. Please try downloading it instead.`
        )
      } finally {
        setLoading(false)
      }
    }

    renderDocument()
  }, [isOpen, wordUrl])

  const handleDownload = useCallback(() => {
    const link = document.createElement('a')
    link.href = wordUrl
    link.download = `${title}.docx`
    link.click()
  }, [wordUrl, title])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm'
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className={cn(
            'relative mx-auto mt-4 mb-4 flex h-[90vh] max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className='flex shrink-0 items-center justify-between border-b border-border bg-background/95 p-4 backdrop-blur-sm'>
            <h2 className='text-lg font-semibold text-foreground'>{title}</h2>
            <div className='flex items-center gap-2'>
              <Button
                variant='ghost'
                size='sm'
                onClick={handleDownload}
                className='h-8 w-8 p-0'
              >
                <Download className='h-4 w-4' />
              </Button>
              <Button
                variant='ghost'
                size='sm'
                onClick={onClose}
                className='h-8 w-8 p-0'
              >
                <X className='h-4 w-4' />
              </Button>
            </div>
          </div>

          {/* Document Preview Content */}
          <div className='flex-1 overflow-auto bg-slate-50 p-2 dark:bg-slate-900 md:p-4'>
            {loading && (
              <div className='flex h-full flex-col items-center justify-center gap-4'>
                <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-primary'></div>
                <p className='text-sm text-muted-foreground'>
                  Loading preview...
                </p>
              </div>
            )}

            {/* This div will contain the rendered docx content */}
            <div ref={viewerRef} className={cn('bg-white', { hidden: loading || error })} />

            {error && (
              <div className='flex h-full flex-col items-center justify-center gap-4 p-4 text-center'>
                <AlertCircle className='h-12 w-12 text-yellow-500' />
                <div className='space-y-2'>
                  <p className='font-medium text-foreground'>
                    Preview Failed
                  </p>
                  <p className='max-w-md text-sm text-muted-foreground'>
                    {error}
                  </p>
                </div>
                <Button
                  onClick={handleDownload}
                  variant='default'
                  size='sm'
                  className='mt-4'
                >
                  <Download className='mr-2 h-4 w-4' />
                  Try Download
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default WordViewer
