import { QuartzComponent, QuartzComponentConstructor } from "./types"

export default (() => {
  const ServiceWorkerRegistration: QuartzComponent = () => {
    return <></>
  }

  ServiceWorkerRegistration.afterDOMLoaded = `
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch((error) => {
          console.error('Service worker registration failed:', error)
        })
      })
    }
  `

  return ServiceWorkerRegistration
}) satisfies QuartzComponentConstructor
