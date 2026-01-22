
'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function GsapInit() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Configurações globais opcionais do ScrollTrigger
    ScrollTrigger.defaults({
      toggleActions: 'play none none none', // anima quando entra na viewport
      markers: false, // true para debug visual
    })
  }, [])

  return null
}
