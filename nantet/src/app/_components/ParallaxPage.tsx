"use client";

import React, { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image"; // Importe StaticImageData para tipagem
import {
    CheckCircle2,
    ArrowRight,
    ShieldCheck,
    MapPin,
    Mountain,
} from "lucide-react";

// --- IMPORTE SUAS IMAGENS AQUI ---
import kadu5Img from "../../../public/kadu5.jpg";
// Caso queira usar kadu4 em outra seção, mantenha importado, ou use onde preferir.
// import kadu4Img from "../../../public/kadu4.jpg"; 

// --- HOOK DE PARALLAX ---
const useParallax = (speed = 0.5) => {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const scrollY = window.scrollY;
                const elementTop = rect.top + scrollY;
                setOffset((scrollY - elementTop) * speed);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [speed]);

    return { ref, offset };
};

// --- BOTÃO WHATSAPP ---
const WhatsAppCTA = () => (
    <div className="flex flex-col items-center justify-center w-full py-12">
        <a
            href="https://wa.me/5561991557030?text=Olá%20Kadu,%20quero%20agendar%20uma%20expedição!"
            target="_blank"
            rel="noopener noreferrer"
            className="
        group relative flex h-16 w-auto min-w-[240px] items-center justify-center 
        overflow-hidden rounded-full bg-[#25D366] text-white shadow-2xl 
        transition-[width,min-width] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] 
        hover:w-16 hover:min-w-[4rem] hover:bg-[#20bd5a]
      "
        >
            <div className="absolute flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-10">
                <span className="text-xl font-black uppercase tracking-wider">Bora Descer?</span>
            </div>

            <div className="absolute flex items-center justify-center opacity-0 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:scale-100 scale-50">
                <ArrowRight size={28} strokeWidth={4} />
            </div>
        </a>
    </div>
);

// --- DADOS DAS SEÇÕES ---
interface ParallaxSectionData {
    id: number;
    videoSrc?: string; // Agora é opcional
    imageSrc?: StaticImageData; // Nova propriedade para imagem de fundo
    title: string;
    subtitle?: string;
    overlayGradient: string;
    badge?: string;
    contentTitle: string;
    contentBody: React.ReactNode;
}

const sectionsData: ParallaxSectionData[] = [
    {
        id: 1,
        videoSrc: "/kadu.mp4",
        title: "Kadu Aragão",
        subtitle: "Instrutor Especialista em Verticalidade",
        overlayGradient: "linear-gradient(to bottom, rgba(234, 88, 12, 0.3) 0%, rgba(24, 24, 27, 0.9) 100%)",
        contentTitle: "Muito Mais Que Uma Trilha",
        contentBody: (
            <div className="space-y-6 text-center max-w-3xl mx-auto">
                <p className="text-lg text-slate-300 leading-relaxed">
                    O canionismo te leva aonde a maioria não consegue chegar. Comigo, você acessa o coração da
                    Chapada dos Veadeiros através de rapéis em cachoeiras, saltos em poços cristalinos e
                    caminhadas técnicas. Tudo isso com a segurança de quem vive e respira a montanha.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    {['Certificação Internacional', 'Equipamentos Homologados UIAA', 'Guiagem Personalizada', 'Fotos e Vídeos Inclusos'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-orange-500/50 transition-colors">
                            <CheckCircle2 className="text-orange-500 w-5 h-5 flex-shrink-0" />
                            <span className="font-medium text-slate-200">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 2,
        videoSrc: "/kadu2.mp4",
        title: "Cânion do Macaquinho",
        subtitle: "O Clássico da Adrenalina",
        overlayGradient: "linear-gradient(to bottom, rgba(220, 38, 38, 0.3) 0%, rgba(24, 24, 27, 0.95) 100%)",
        contentTitle: "Desafio Técnico e Visual Único",
        contentBody: (
            <div className="space-y-6 text-center max-w-3xl mx-auto">
                <p className="text-lg text-slate-300 leading-relaxed">
                    Uma fenda geológica impressionante que esconde uma sequência de quedas d'água perfeitas para o rapel.
                    É uma expedição intensa, que exige disposição, mas recompensa com visuais que parecem de outro planeta.
                    Prepare-se para se molhar e sentir a força da água.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    {[
                        'Rapel de 45 metros',
                        'Natação em Cânion Estreito',
                        'Nível: Avançado',
                        'Duração: Dia Inteiro'
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-red-500/50 transition-colors">
                            <Mountain className="text-red-500 w-5 h-5 flex-shrink-0" />
                            <span className="font-medium text-slate-200">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 3,
        videoSrc: "/kadu3.mp4",
        title: "Santa Bárbara",
        subtitle: "Águas Cristalinas e Diversão",
        overlayGradient: "linear-gradient(to bottom, rgba(14, 165, 233, 0.3) 0%, rgba(24, 24, 27, 0.9) 100%)",
        contentTitle: "Para Quem Busca Beleza Cênica",
        contentBody: (
            <div className="space-y-6 text-center max-w-3xl mx-auto">
                <p className="text-lg text-slate-300 leading-relaxed">
                    Ideal para quem quer iniciar no canionismo ou busca um dia mais "relax" sem abrir mão da aventura.
                    Aqui a água é transparente, os rapéis são divertidos e o cenário é paradisíaco. Perfeito para fotos
                    e para curtir a energia da Chapada.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    {[
                        'Rapéis Positivos (Secos)',
                        'Poços de Água Turquesa',
                        'Nível: Iniciante/Intermediário',
                        'Acesso Facilitado'
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-cyan-500/50 transition-colors">
                            <MapPin className="text-cyan-500 w-5 h-5 flex-shrink-0" />
                            <span className="font-medium text-slate-200">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 4,
        videoSrc: "/kadu4.mp4",
        title: "Segurança Total",
        overlayGradient: "linear-gradient(to bottom, rgba(16, 185, 129, 0.3) 0%, rgba(24, 24, 27, 0.95) 100%)",
        badge: "Protocolos ISO",
        contentTitle: "Sua Vida é a Prioridade",
        contentBody: (
            <div className="space-y-6 text-center max-w-3xl mx-auto">
                <p className="text-lg text-slate-300 leading-relaxed">
                    Aventura não significa perigo desnecessário. Trabalho seguindo rigorosos protocolos internacionais de gestão de risco (ISO 21101).
                    Todos os equipamentos são inspecionados, temos kit de primeiros socorros completo (WFR) e comunicação via satélite para emergências.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    {[
                        'Primeiros Socorros WFR',
                        'Gestão de Risco ABNT',
                        'Rastreamento via Satélite',
                        'Seguro Aventura Incluso'
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-green-500/50 transition-colors">
                            <ShieldCheck className="text-green-500 w-5 h-5 flex-shrink-0" />
                            <span className="font-medium text-slate-200">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 5,
        // --- AQUI ESTÁ A CORREÇÃO ---
        // Removi o videoSrc e adicionei imageSrc para usar a foto como BACKGROUND da seção
        imageSrc: kadu5Img,
        title: "Sua Aventura Começa Agora",
        overlayGradient: "linear-gradient(to bottom, rgba(234, 88, 12, 0.5) 0%, rgba(0, 0, 0, 1) 100%)",
        contentTitle: "Vamos Agendar?",
        contentBody: (
            <div className="space-y-12">
                <p className="text-center text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
                    As vagas por expedição são limitadas para garantir a segurança máxima e uma experiência exclusiva.
                    Não deixe sua aventura apenas na imaginação.
                </p>

                {/* O Botão de WhatsApp */}
                <div className="pt-2">
                    <WhatsAppCTA />
                </div>
            </div>
        ),
    },
];

// --- COMPONENTE SLIDE PARALLAX (Agora aceita Imagem ou Vídeo) ---
const ParallaxSlide = ({
    videoSrc,
    imageSrc,
    title,
    subtitle,
    overlayGradient,
    badge
}: {
    videoSrc?: string;
    imageSrc?: StaticImageData;
    title: string;
    subtitle?: string;
    overlayGradient: string;
    badge?: string;
}) => {
    const { ref, offset } = useParallax(0.5);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black border-b border-white/5">
            {/* Camada do Fundo (Vídeo ou Imagem) */}
            <div
                className="absolute inset-0 w-full h-[120%]"
                style={{
                    transform: `translateY(${offset}px)`,
                    willChange: 'transform'
                }}
            >
                {imageSrc ? (
                    // Renderiza Imagem se existir
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                ) : (
                    // Renderiza Vídeo se não houver imagem
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-80"
                    >
                        {videoSrc && <source src={videoSrc} type="video/mp4" />}
                    </video>
                )}
            </div>

            {/* Overlays de Contraste */}
            <div className="absolute inset-0 z-[2] mix-blend-overlay pointer-events-none" style={{ background: overlayGradient }} />
            <div className="absolute inset-0 z-[2] bg-black/40 pointer-events-none" /> {/* Escurece geral */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-[2] pointer-events-none" />

            {/* Conteúdo Central (Título) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-[3] px-6">
                <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center">
                    {badge && (
                        <span className="mb-6 bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-[0_0_20px_rgba(234,88,12,0.5)] backdrop-blur-md animate-pulse">
                            {badge}
                        </span>
                    )}
                    <h1 className="text-white text-5xl sm:text-6xl md:text-8xl font-black mb-6 tracking-tighter drop-shadow-2xl uppercase">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-orange-100/90 text-xl sm:text-2xl md:text-3xl font-bold tracking-wide max-w-3xl drop-shadow-md border-b-2 border-orange-500 pb-2">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

const ContentSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
    if (!children) return null;

    return (
        <section className="py-24 md:py-32 bg-zinc-950 relative z-10 overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">
                {title && (
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
                            {title}
                        </h2>
                        <div className="w-24 h-2 bg-gradient-to-r from-orange-600 to-red-600 mx-auto rounded-full"></div>
                    </div>
                )}
                {/* Conteúdo do corpo */}
                <div>
                    {children}
                </div>
            </div>
        </section>
    );
};

export default function ParallaxCanyoning() {
    return (
        <div className="w-full font-sans antialiased bg-black selection:bg-orange-500 selection:text-white">
            <main>
                {sectionsData.map((section) => (
                    <div key={section.id} className="relative z-0">
                        <ParallaxSlide {...section} />
                        <ContentSection title={section.contentTitle}>
                            {section.contentBody}
                        </ContentSection>
                    </div>
                ))}
            </main>
        </div>
    );
}