'use client'

import { usePathname } from '@taxilkath/i18n/routing'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useEffect } from 'react'

// Configure nprogress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.08,
  easing: 'ease',
  speed: 300,
})

const NavigationProgress = () => {
  const pathname = usePathname()

  useEffect(() => {
    console.log('NavigationProgress component mounted')

    // Inject custom CSS styles
    const styleElement = document.createElement('style')
    styleElement.textContent = `
      #nprogress {
        pointer-events: none;
      }
      
      #nprogress .bar {
        background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899) !important;
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 0.5px !important;
      }
      
      #nprogress .peg {
        display: block;
        position: absolute;
        right: 0px;
        width: 100px;
        height: 100%;
        box-shadow: 0 0 15px #3b82f6, 0 0 8px #3b82f6;
        opacity: 1.0;
        transform: rotate(3deg) translate(0px, -4px);
      }
      
      #nprogress .spinner {
        display: none !important;
      }
    `
    document.head.appendChild(styleElement)

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')

      console.log('Click detected:', { target, link })

      if (link && link.href && !link.href.startsWith('mailto:') && !link.href.startsWith('tel:')) {
        try {
          const url = new URL(link.href)
          const currentUrl = new URL(window.location.href)

          console.log('URL check:', {
            linkUrl: url.pathname,
            currentUrl: currentUrl.pathname,
            sameOrigin: url.origin === currentUrl.origin,
            differentPath: url.pathname !== currentUrl.pathname
          })

          // Only show progress for internal navigation to different pages
          if (url.origin === currentUrl.origin && url.pathname !== currentUrl.pathname) {
            console.log('Starting nprogress')
            NProgress.start()
          }
        } catch {
          // Invalid URL, ignore
        }
      }
    }

    // Add click listener to document
    document.addEventListener('click', handleClick, { capture: true })

    return () => {
      document.removeEventListener('click', handleClick, { capture: true })
      // Clean up style element
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement)
      }
    }
  }, [])

  // Complete progress when pathname changes (navigation complete)
  useEffect(() => {
    console.log('Pathname changed to:', pathname)
    NProgress.done()
  }, [pathname])



  return (
    <div>
      {/* Test button for debugging */}

    </div>
  )
}

export default NavigationProgress
