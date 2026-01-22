'use client'

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import {
    CaretLeft,
    CaretRight,
    MapPin,
    Timer,
    Mountains,
    Drop,
    WhatsappLogo,
    ArrowRight
} from '@phosphor-icons/react/dist/ssr'

// --- IMPORTAR FOTOS DOS CANIONS AQUI ---
// Estou usando as fotos do Kadu como exemplo, mas o ideal é ter uma foto para cada Cânion
import canyon1 from '../../../public/kadu1.jpg'
import canyon2 from '../../../public/kadu2.jpg'
import canyon3 from '../../../public/kadu3.jpg'
// import canyon4 from '../../../public/macaco.jpg' 

// --- DADOS DAS EXPEDIÇÕES ---
const expeditions = [
    {
        id: 1,
        title: 'Cânion do Macaquinho',
        level: 'Nível III (Avançado)',
        duration: '6-7 Horas',
        height: 'Rapel máx 45m',
        water: 'Aquática',
        description: 'Um clássico da Chapada. Sequência técnica de quedas d’água dentro de uma fenda impressionante.',
        image: canyon1,
        slug: 'macaquinho'
    },
    {
        id: 2,
        title: 'Santa Bárbara',
        level: 'Nível II (Intermediário)',
        duration: '4-5 Horas',
        height: 'Rapel máx 30m',
        water: 'Mista',
        description: 'Águas cristalinas e rapéis divertidos. Perfeito para quem busca beleza cênica e adrenalina moderada.',
        image: canyon2,
        slug: 'santa-barbara'
    },
    {
        id: 3,
        title: 'Cânion Raizama',
        level: 'Nível IV (Hardcore)',
        duration: 'Integral',
        height: 'Rapel máx 55m',
        water: 'Muita Água',
        description: 'Para quem busca desafio. Cânion profundo, barulhento e com muita pressão de água. Exige preparo.',
        image: canyon3,
        slug: 'raizama'
    },
    {
        id: 4,
        title: 'Capivara',
        level: 'Nível I (Iniciante)',
        duration: '3-4 Horas',
        height: 'Rapel máx 25m',
        water: 'Seca/Mista',
        description: 'A porta de entrada ideal. Visual incrível da abertura do cânion com rapéis secos e poços para banho.',
        image: canyon1, // Repetindo img por falta de arquivo
        slug: 'capivara'
    },
]

export function Tours() {
    // Configuração do Embla Carousel
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true, // Loop infinito
        align: 'center', // Centraliza o card ativo
        skipSnaps: false,
    })

    const [selectedIndex, setSelectedIndex] = useState(0)

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        onSelect()
        emblaApi.on('select', onSelect)
        return () => {
            emblaApi.off('select', onSelect)
        }
    }, [emblaApi, onSelect])

    return (
        <section className="relative bg-zinc-950 py-24 overflow-hidden">

            {/* BACKGROUND DECORATIONS */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />

            {/* Glow Laranja no fundo */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest"
                        >
                            <MapPin weight="fill" className="w-4 h-4" />
                            Destinos & Rotas
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase leading-[0.9]">
                            Escolha sua <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Aventura</span>
                        </h2>
                    </div>

                    {/* Controles de Navegação (Desktop) */}
                    <div className="hidden md:flex gap-4">
                        <button
                            onClick={scrollPrev}
                            className="w-14 h-14 rounded-full border border-zinc-700 bg-zinc-900/50 hover:bg-orange-600 hover:border-orange-500 text-white flex items-center justify-center transition-all duration-300 group"
                        >
                            <CaretLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-14 h-14 rounded-full border border-zinc-700 bg-zinc-900/50 hover:bg-orange-600 hover:border-orange-500 text-white flex items-center justify-center transition-all duration-300 group"
                        >
                            <CaretRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* CAROUSEL */}
                <div className="relative cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex -ml-4 md:-ml-8">
                        {expeditions.map((item, index) => (
                            <div
                                key={item.id}
                                className="pl-4 md:pl-8 flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 py-8"
                            >
                                <div className="group relative h-[500px] md:h-[600px] w-full rounded-[2rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl transition-all duration-500 hover:shadow-orange-900/20 hover:-translate-y-2">

                                    {/* IMAGEM DE FUNDO */}
                                    <div className="absolute inset-0 w-full h-full">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        {/* Overlay Escuro Gradiente */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent opacity-90" />
                                    </div>

                                    {/* CONTEÚDO DO CARD */}
                                    <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">

                                        {/* TAGS TOPO (Escondidas inicialmente, aparecem no hover ou fixas se preferir) */}
                                        <div className="absolute top-6 right-6 flex flex-col gap-2 items-end">
                                            <span className="px-3 py-1 bg-zinc-950/60 backdrop-blur-md border border-white/10 rounded-lg text-xs font-bold uppercase tracking-wider text-white">
                                                {item.level}
                                            </span>
                                        </div>

                                        {/* INFO PRINCIPAL */}
                                        <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                                            <h3 className="text-3xl md:text-4xl font-black text-white uppercase mb-2 leading-none">
                                                {item.title}
                                            </h3>

                                            {/* Grid de Specs */}
                                            <div className="flex flex-wrap gap-4 my-4 border-t border-white/10 pt-4">
                                                <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
                                                    <Timer className="w-4 h-4 text-orange-500" />
                                                    {item.duration}
                                                </div>
                                                <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
                                                    <Mountains className="w-4 h-4 text-orange-500" />
                                                    {item.height}
                                                </div>
                                                <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium">
                                                    <Drop className="w-4 h-4 text-blue-400" />
                                                    {item.water}
                                                </div>
                                            </div>

                                            <p className="text-zinc-400 text-sm line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                                {item.description}
                                            </p>

                                            {/* BOTÃO CTA */}
                                            <a
                                                href={`https://wa.me/5561999999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20a%20expedição%20${item.title}`} // TODO: Número real
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex items-center justify-between w-full bg-orange-600 hover:bg-orange-500 text-white p-4 rounded-xl font-bold uppercase tracking-wide transition-all duration-300 group/btn"
                                            >
                                                <span className="flex items-center gap-2">
                                                    <WhatsappLogo className="w-5 h-5" weight="fill" />
                                                    Agendar Saída
                                                </span>
                                                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* INDICADORES MOBILE */}
                <div className="flex md:hidden justify-center mt-8 gap-2">
                    {expeditions.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => emblaApi && emblaApi.scrollTo(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === selectedIndex ? 'w-8 bg-orange-500' : 'w-2 bg-zinc-700'
                                }`}
                        />
                    ))}
                </div>

            </div>
        </section>
    )
}