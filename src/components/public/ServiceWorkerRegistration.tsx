'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator
    ) {
      const registerServiceWorker = async () => {
        try {
          // Сначала отменяем регистрацию всех существующих Service Workers
          const registrations = await navigator.serviceWorker.getRegistrations()
          for (const registration of registrations) {
            // Отменяем регистрацию только если это не наш Service Worker
            if (registration.active?.scriptURL && !registration.active.scriptURL.includes('/sw.js')) {
              await registration.unregister()
              console.log('Unregistered old Service Worker:', registration.active.scriptURL)
            }
          }

          // Регистрируем новый Service Worker
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          })

          console.log('Service Worker registered:', registration.scope)

          // Принудительно активируем новый Service Worker
          if (registration.waiting) {
            registration.waiting.postMessage({ type: 'SKIP_WAITING' })
          }

          // Обновляем при изменении
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // Новый Service Worker готов, перезагружаем страницу
                  window.location.reload()
                }
              })
            }
          })
        } catch (error) {
          console.error('Service Worker registration failed:', error)
        }
      }

      if (document.readyState === 'complete') {
        registerServiceWorker()
      } else {
        window.addEventListener('load', registerServiceWorker)
      }
    }
  }, [])

  return null
}
