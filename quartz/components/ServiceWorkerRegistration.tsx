import { QuartzComponent, QuartzComponentConstructor } from "./types"

export default (() => {
  const ServiceWorkerRegistration: QuartzComponent = () => {
    return <></>
  }

  ServiceWorkerRegistration.afterDOMLoaded = `
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' })
          console.log('Service worker registered successfully:', registration)
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            newWorker?.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New service worker installed and ready')
              }
            })
          })
        } catch (error) {
          console.error('Service worker registration failed:', error)
        }
      })
    } else {
      console.warn('Service workers not supported in this browser')
    }
  `

  return ServiceWorkerRegistration
}) satisfies QuartzComponentConstructor
