"use client"

import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax"
import { Play, Pause } from "lucide-react"
import { useState, useEffect, useRef } from "react"

export default function ParallaxSection() {
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMobile, setIsMobile] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    // Detecta se é mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Controle do vídeo
    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    // Auto-play no mobile
    useEffect(() => {
        if (videoRef.current) {
            if (isMobile) {
                videoRef.current.play().catch(e => console.log("Auto-play prevented:", e))
            }
        }
    }, [isMobile])

    return (
        <section className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden group">
            <ParallaxBanner className="w-full h-full">
                {/* Camada do vídeo com parallax mais suave */}
                <ParallaxBannerLayer speed={-15}>
                    <div className="relative w-full h-full">
                        <video
                            ref={videoRef}
                            src="/nantet1.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay gradiente moderno */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

                        {/* Overlay de profundidade */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent md:block hidden" />
                    </div>
                </ParallaxBannerLayer>

                {/* Camada de conteúdo com parallax mais rápido */}
                <ParallaxBannerLayer speed={-5}>
                    <div className="absolute inset-0 flex items-end md:items-center justify-center md:justify-start p-4 md:p-8 lg:p-12">
                        <div className="max-w-3xl">
                            <div className="space-y-4 md:space-y-6">
                                {/* Título principal */}
                                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                                    <span className="block">Reabilitação Funcional</span>
                                    <span className="block text-green-400">com Propósito</span>
                                </h2>

                                {/* Subtítulo */}
                                <p className="text-lg md:text-xl lg:text-2xl text-gray-200 font-light max-w-2xl">
                                    Transformando vidas através do movimento consciente e
                                    da recuperação física personalizada
                                </p>

                                {/* Destaques */}
                                <div className="flex flex-wrap gap-3 pt-2">
                                    {[
                                        "Sem Dor",
                                        "Performance",
                                        "Qualidade de Vida",
                                        "Recuperação"
                                    ].map((item, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm text-white border border-white/20"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </ParallaxBannerLayer>

                {/* Controle de vídeo (desktop) */}
                <div className="absolute right-6 bottom-6 hidden md:block">
                    <button
                        onClick={togglePlay}
                        className="group/btn bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110"
                        aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
                    >
                        <div className="relative">
                            {isPlaying ? (
                                <Pause className="w-5 h-5 text-white" />
                            ) : (
                                <Play className="w-5 h-5 text-white ml-0.5" />
                            )}
                        </div>
                    </button>
                </div>

                {/* Indicador de scroll (mobile) */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden">
                    <div className="animate-bounce">
                        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
                        </div>
                    </div>
                </div>
            </ParallaxBanner>

            {/* Efeito de brilho ao hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 via-transparent to-transparent" />
            </div>
        </section>
    )
}