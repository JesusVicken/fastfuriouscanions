"use client"

import { ParallaxBanner, ParallaxBannerLayer } from "react-scroll-parallax"
import { Play, Pause, ShieldCheck, Award, MapPin, ArrowRight } from "lucide-react"
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
        // AJUSTE 1: Altura aumentada para h-[95vh] no mobile e h-screen (tela cheia) no desktop
        <section className="w-full h-[95vh] md:h-screen relative overflow-hidden group border-b border-white/5 bg-zinc-950">
            <ParallaxBanner className="w-full h-full">

                {/* 1. Camada do vídeo com parallax */}
                <ParallaxBannerLayer speed={-15}>
                    <div className="relative w-full h-full">
                        <video
                            ref={videoRef}
                            src="/kadu6.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            // AJUSTE 2: Removido opacity-90 e filtros de blur. O vídeo fica "raw" e nítido.
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay Gradiente Inferior (Apenas na base para transição suave) */}
                        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

                        {/* Overlay Lateral (Apenas atrás do texto para leitura, sem cobrir o vídeo todo) */}
                        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/30 to-transparent w-full md:w-2/3 lg:w-1/2" />
                    </div>
                </ParallaxBannerLayer>

                {/* 2. Camada de Conteúdo */}
                <ParallaxBannerLayer speed={-5}>
                    <div className="absolute inset-0 flex items-end md:items-center justify-center md:justify-start p-6 md:p-12 lg:p-20">
                        <div className="max-w-4xl w-full relative z-10">
                            <div className="space-y-8 animate-fade-in-up">

                                {/* Badge de Autoridade */}
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-600/90 border border-orange-500/50 shadow-lg backdrop-blur-sm">
                                    <Award className="w-4 h-4 text-white" />
                                    <span className="text-white text-xs md:text-sm font-bold uppercase tracking-widest">
                                        Infraestrutura de Elite
                                    </span>
                                </div>

                                {/* Título Principal */}
                                <h2 className="text-4xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] uppercase tracking-tighter drop-shadow-2xl">
                                    <span className="block">Aventura</span>
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                                        Profissional
                                    </span>
                                </h2>

                                {/* Texto de Venda (Copywriting) */}
                                <p className="text-lg md:text-xl text-gray-200 font-medium max-w-xl leading-relaxed drop-shadow-md">
                                    
                                    <br className="hidden md:block" />
                                    Certificação internacional e equipamentos homologados UIAA.
                                </p>

                                {/* Grid de Diferenciais (Tags Visualmente Limpas) */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
                                    {[
                                        { icon: ShieldCheck, text: "ISO 21101" },
                                        { icon: MapPin, text: "Acesso Exclusivo" },
                                        { icon: Award, text: "Instrutor Certificado" },
                                        { icon: ShieldCheck, text: "Seguro Incluso" },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col md:flex-row items-center md:gap-2 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-orange-500/50 transition-all duration-300 group/tag cursor-default"
                                        >
                                            <item.icon className="w-5 h-5 text-orange-500 mb-1 md:mb-0 group-hover/tag:scale-110 transition-transform" />
                                            <span className="text-xs md:text-sm text-white font-semibold text-center md:text-left">
                                                {item.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Botão de Ação (CTA) */}
                                <div className="pt-6">
                                    <a
                                        href="https://wa.me/5561999999999?text=Quero%20agendar%20com%20segurança"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-3 bg-orange-600 hover:bg-orange-500 text-white px-10 py-5 rounded-full font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105 shadow-[0_0_40px_rgba(234,88,12,0.4)] border border-white/10"
                                    >
                                        Garantir Minha Vaga
                                        <ArrowRight className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </ParallaxBannerLayer>

                {/* Controle de vídeo (Desktop) */}
                <div className="absolute right-10 bottom-10 hidden md:block z-20">
                    <button
                        onClick={togglePlay}
                        className="group/btn bg-black/40 backdrop-blur-md hover:bg-orange-600 border border-white/20 hover:border-orange-500 rounded-full p-4 transition-all duration-300 hover:scale-110 shadow-2xl"
                        aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
                    >
                        <div className="relative">
                            {isPlaying ? (
                                <Pause className="w-6 h-6 text-white" fill="currentColor" />
                            ) : (
                                <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                            )}
                        </div>
                    </button>
                </div>

                {/* Indicador de scroll (Mobile) */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 md:hidden z-10 pointer-events-none opacity-80">
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-white shadow-black drop-shadow-md">Role</span>
                        <div className="w-5 h-9 border-2 border-white/50 rounded-full flex justify-center bg-black/20 backdrop-blur-sm">
                            <div className="w-1 h-2 bg-orange-500 rounded-full mt-2 animate-bounce" />
                        </div>
                    </div>
                </div>
            </ParallaxBanner>
        </section>
    )
}