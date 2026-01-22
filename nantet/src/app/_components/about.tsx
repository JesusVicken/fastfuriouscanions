"use client"

import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  AnimatePresence,
} from "framer-motion"
import {
  ShieldCheck,
  Activity,
  WhatsappLogo,
  InstagramLogo,
  CaretRight,
  MapPin,
} from "@phosphor-icons/react/dist/ssr"

// --- IMPORTAR SUAS IMAGENS AQUI ---
import kadu1 from "../../../public/kadu1.jpg"
import kadu2 from "../../../public/kadu2.jpg"
import kadu3 from "../../../public/kadu3.jpg"

const heroImages = [kadu1, kadu2, kadu3]

// --- SUB-COMPONENTES DE UI ---

function SpotlightCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={`group relative border border-white/10 bg-zinc-900/80 overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(249, 115, 22, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

function StatCounter({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <span className="text-3xl md:text-5xl font-black text-white tracking-tighter">
        {value}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold mt-1">
        {label}
      </span>
    </div>
  )
}

// --- COMPONENTE PRINCIPAL ---

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentImage, setCurrentImage] = useState(0)

  // Ciclo das imagens (Troca a cada 4 segundos)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  // Lógica de Parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Texto de fundo (Menor e mais sutil agora)
  const textX = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.6, 0.6, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-zinc-950 overflow-hidden py-20 md:py-24"
    >
      {/* TEXTURAS DE FUNDO */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay z-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.5" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0"></div>

      {/* BLOBS DE LUZ */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-orange-600/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute bottom-0 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* TEXTO GIGANTE DE FUNDO (AJUSTADO: MENOR) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none z-0 flex justify-center items-center">
        <motion.h2
          style={{ x: textX, opacity: textOpacity }}
          className="text-[12vw] md:text-[10vw] font-black text-transparent bg-clip-text bg-gradient-to-b from-zinc-800 to-zinc-950/0 uppercase whitespace-nowrap leading-none select-none"
        >
          INSTRUCTOR
        </motion.h2>
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* CABEÇALHO DO NOME */}
        <div className="relative mb-12 md:mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <ShieldCheck weight="fill" className="w-4 h-4" />
            Líder de Expedição
          </motion.div>

          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase drop-shadow-2xl">
            KADU <span className="text-orange-600">Aragão</span>
          </h3>
          <p className="mt-4 text-zinc-400 max-w-xl mx-auto text-sm md:text-base">
            Especialista em verticalidade e resgate, transformando desafios naturais em experiências seguras e inesquecíveis.
          </p>
        </div>

        {/* BENTO GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 max-w-6xl mx-auto">

          {/* 1. MAIN PHOTO SLIDER (Esquerda - Maior) */}
          <SpotlightCard className="md:col-span-7 row-span-2 rounded-3xl min-h-[450px] md:min-h-[550px] relative group border-zinc-800">
            {/* SLIDESHOW DAS FOTOS */}
            <div className="absolute inset-0 w-full h-full">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }} // Transição suave
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={heroImages[currentImage]}
                    alt={`Kadu Aragão foto ${currentImage + 1}`}
                    fill
                    className="object-cover object-center" // Removido grayscale
                    sizes="(max-width: 768px) 100vw, 60vw"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Overlay Gradiente (para o texto aparecer) */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90" />
            </div>

            {/* Conteúdo sobre a foto */}
            <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
                <p className="text-orange-500 font-mono text-xs tracking-widest uppercase">
                  Ao Vivo / Chapada
                </p>
              </div>

              <h4 className="text-xl md:text-3xl font-bold text-white mb-4 leading-tight max-w-md">
                "Não guiamos apenas turistas. Formamos <span className="text-orange-500 underline decoration-orange-500/30 underline-offset-4">exploradores</span>."
              </h4>

              {/* Indicadores do Slide */}
              <div className="flex gap-2">
                {heroImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1 rounded-full transition-all duration-500 ${idx === currentImage ? 'w-8 bg-orange-500' : 'w-2 bg-zinc-600'}`}
                  />
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* 2. STATS CARD (Direita Superior) */}
          <SpotlightCard className="md:col-span-5 rounded-3xl bg-zinc-900 border-zinc-800 p-6 flex flex-col justify-center shadow-xl relative overflow-hidden">
            {/* Decoração de fundo */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity size={80} className="text-white" />
            </div>

            <div className="grid grid-cols-2 divide-x divide-zinc-800/50 relative z-10">
              <StatCounter value="12+" label="Anos XP" />
              <StatCounter value="1.5k" label="Descidas" />
            </div>
            <div className="mt-6 pt-6 border-t border-zinc-800/50 grid grid-cols-2 divide-x divide-zinc-800/50 relative z-10">
              <StatCounter value="100%" label="Segurança" />
              <StatCounter value="5.0" label="Avaliações" />
            </div>
          </SpotlightCard>

          {/* 3. SKILLS LIST (Direita Meio) */}
          <SpotlightCard className="md:col-span-5 rounded-3xl bg-zinc-900 border-zinc-800 p-6 md:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <h5 className="text-zinc-500 uppercase text-xs font-black tracking-widest mb-6 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                Certificações & Áreas
              </h5>
              <ul className="space-y-3">
                {[
                  "Resgate Vertical Avançado",
                  "WFR (Socorrista Outdoor)",
                  "Protocolos ISO 21101",
                  "Especialista: Chapada dos Veadeiros",
                ].map((skill, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-zinc-300 group/item text-sm font-medium"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover/item:bg-orange-500 group-hover/item:shadow-[0_0_8px_rgba(249,115,22,0.8)] transition-all" />
                    <span className="group-hover/item:translate-x-2 transition-transform duration-300">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </SpotlightCard>

          {/* 4. CTA CARDs (Rodapé - Full Width Mobile) */}
          <div className="md:col-span-12 grid md:grid-cols-2 gap-4 mt-2">

            {/* Card Instagram */}
            <a
              href="https://www.instagram.com/kadu.aragao/"
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 p-5 flex items-center justify-between hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-pink-500/10 text-pink-500 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300">
                  <InstagramLogo className="w-6 h-6" weight="fill" />
                </div>
                <div>
                  <p className="text-white font-bold text-base">@kadu.aragao</p>
                  <p className="text-zinc-500 text-xs group-hover:text-zinc-300 transition-colors">
                    Bastidores das missões
                  </p>
                </div>
              </div>
              <CaretRight className="w-5 h-5 text-zinc-600 group-hover:translate-x-2 transition-transform" />
            </a>

            {/* Card WhatsApp (Botão Principal) */}
            <a
              href="https://wa.me/5561991557030" // TODO: Inserir número real
              target="_blank"
              rel="noreferrer"
              className="relative group overflow-hidden rounded-2xl bg-orange-600 p-5 flex items-center justify-between shadow-lg hover:shadow-orange-600/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 z-10">
                <div className="p-3 rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/10">
                  <WhatsappLogo className="w-6 h-6" weight="fill" />
                </div>
                <div>
                  <p className="text-white font-black text-lg uppercase italic tracking-wide">
                    Chamar Kadu
                  </p>
                  <p className="text-orange-100 text-xs font-medium">
                    Planeje sua descida
                  </p>
                </div>
              </div>
              <CaretRight className="w-6 h-6 text-white z-10 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}