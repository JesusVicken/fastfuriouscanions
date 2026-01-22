'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// --- IMPORTE SUA IMAGEM AQUI ---
import footerBg from '../../../public/kadu8.jpg'

gsap.registerPlugin(ScrollTrigger)

const partnersData = [
  {
    name: 'CPP Extreme',
    logo: '/cpp.jpg',
  },
  {
    name: 'UIAA',
    logo: '/uiaa.jpg',
  },
  {
    name: 'ABETA',
    logo: '/abeta.png',
  },
]

export function Footer() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const cards = gsap.utils.toArray('.partner-card', sectionRef.current)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          autoAlpha: 0,
          y: 60,
          scale: 0.95,
        },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'back.out(1.7)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative py-24 overflow-hidden border-t border-white/5 bg-zinc-950" ref={sectionRef}>

      {/* --- BACKGROUND COM IMAGEM KADU7 (NÍTIDA) --- */}
      <div className="absolute inset-0 z-0">
        <Image
          src={footerBg}
          alt="Kadu Aragão Canyoning Background"
          fill
          className="object-cover" // Removi opacidade e filtros de grayscale
          quality={100} // Qualidade máxima
          priority={false}
        />

        {/* Overlay Leve (Apenas para garantir contraste do texto, sem esconder a foto) */}
        {/* Um gradiente que é mais escuro embaixo e em cima, mas transparente no meio/fundo */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/40 to-zinc-950/90" />

        {/* Camada extra suave de preto apenas para uniformizar (opacidade baixa) */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-8">

        {/* Título da Seção */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-2xl">
            Parceiros Oficiais
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-orange-600 to-orange-400 mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(234,88,12,0.8)]"></div>
        </div>

        {/* Grid Moderno e Responsivo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 justify-items-center">
          {partnersData.map((partner, index) => (
            <div
              key={index}
              // Aumentei o blur do fundo do card para destacar o logo sobre a foto nítida
              className="partner-card group relative w-full h-full min-h-[200px] sm:min-h-[240px] rounded-3xl border border-white/20 bg-black/30 p-8 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-2 hover:border-orange-500/60 hover:bg-black/50 hover:shadow-2xl hover:shadow-orange-600/20"
            >
              {/* Efeito de brilho sutil no fundo do card */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Container da Imagem */}
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-2xl z-10">
                <div className="relative w-full h-[120px] md:h-[140px]">
                  <Image
                    src={partner.logo}
                    alt={`Logo ${partner.name}`}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                    className="object-contain transition-transform duration-500 ease-out group-hover:scale-110 drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé Legal (Copyright) */}
        <div className="mt-20 border-t border-white/10 pt-8 text-center">
          <p className="text-zinc-300 text-sm font-medium drop-shadow-md">
            © {new Date().getFullYear()} Kadu Aragão Canyoning. Todos os direitos reservados.
            <span className="block mt-2 text-xs text-zinc-400">
              Aventura com segurança e respeito à natureza.
            </span>
          </p>
        </div>

      </div>
    </section>
  )
}