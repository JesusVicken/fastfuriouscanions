'use client'

import { Parallax } from 'react-scroll-parallax'
import { WhatsappLogo, CaretDown } from '@phosphor-icons/react' // Adicionei CaretDown para indicar scroll
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// Frases focadas em aventura e venda
const phrases = [
    "Descubra o Inexplorado",
    "Adrenalina Pura",
    "Pacotes de Canionismo",
    "Supere seus Limites",
]

export default function HeroCanyoning() {
    const [index, setIndex] = useState(0)
    const phraseRef = useRef<HTMLDivElement>(null)

    // Ciclo de frases
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % phrases.length)
        }, 3500) // Levemente mais rápido para gerar dinamismo
        return () => clearInterval(interval)
    }, [])

    // Efeito de Scroll (GSAP)
    useEffect(() => {
        if (!phraseRef.current) return

        gsap.set(phraseRef.current, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            filter: 'brightness(1)',
        })

        const ctx = gsap.context(() => {
            gsap.to(phraseRef.current, {
                y: -100, // Movimento maior para dar sensação de profundidade
                autoAlpha: 0,
                scale: 0.95,
                filter: 'brightness(0.6)',
                ease: 'power1.out',
                scrollTrigger: {
                    trigger: phraseRef.current,
                    start: 'top 40%', // Começa a sair um pouco antes
                    end: 'bottom top',
                    scrub: true,
                },
            })
        }, phraseRef)

        return () => ctx.revert()
    }, [])

    return (
        <div
            className="relative h-screen w-full overflow-hidden bg-stone-900"
            data-aos="fade-up"
        >
            {/* 1. Vídeo de Background
                Sugestão: Use um vídeo com bastante água, pedras e movimento de descida.
            */}
            <Parallax speed={-15} className="absolute inset-0 z-0">
                <video
                    src="/kadu2.mp4" // Alterar para o seu vídeo de canionismo
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-90"
                />
            </Parallax>

            {/* Overlay Gradiente para leitura do texto */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60 z-10" />

            {/* Conteúdo Central */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 space-y-10">

                {/* Logo da Agência */}
                <div className="absolute top-8 md:top-12 z-30 opacity-90 hover:opacity-100 transition-opacity">
                    <img
                        src="/logokadu.png" // Seu logo aqui
                        alt="Logo Agência Canionismo"
                        className="w-28 sm:w-36 md:w-44 drop-shadow-xl"
                    />
                </div>

                {/* Texto Animado */}
                <div ref={phraseRef} className="w-full max-w-5xl flex flex-col items-center gap-6">
                    <div className="h-32 sm:h-40 md:h-56 flex items-center justify-center overflow-hidden w-full">
                        <AnimatePresence mode="wait">
                            <motion.h1
                                key={index}
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -40, scale: 1.1 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-center uppercase tracking-tighter drop-shadow-2xl leading-none"
                            >
                                {phrases[index]}
                            </motion.h1>
                        </AnimatePresence>
                    </div>

                    {/* Subtítulo fixo (Opcional, ajuda no SEO e contexto) */}
                    <p className="text-gray-200 text-sm sm:text-lg md:text-xl font-light tracking-widest uppercase text-center max-w-2xl drop-shadow-md">
                        Experiências inesquecíveis em meio à natureza selvagem
                    </p>
                </div>

                {/* Botão de Venda / WhatsApp - CRUCIAL PARA VENDER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mt-8 z-30"
                >
                    <a
                        href="https://wa.me/5561991557030?text=Olá!%20Vi%20o%20site%20e%20quero%20saber%20sobre%20os%20pacotes%20de%20canionismo."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-orange-600 text-white rounded-full overflow-hidden transition-all duration-300 hover:bg-orange-500 hover:scale-105 shadow-[0_0_20px_rgba(234,88,12,0.5)]"
                    >
                        {/* Efeito de brilho no botão */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        <WhatsappLogo weight="fill" className="w-6 h-6 sm:w-8 sm:h-8" />
                        <span className="text-lg sm:text-xl font-bold tracking-wide">
                            QUERO AVENTURA
                        </span>
                    </a>
                </motion.div>
            </div>

            {/* Indicador de Scroll na base */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-[0.2em] text-white/70">Role para baixo</span>
                <CaretDown className="w-6 h-6 animate-bounce text-orange-500" />
            </motion.div>
        </div>
    )
}