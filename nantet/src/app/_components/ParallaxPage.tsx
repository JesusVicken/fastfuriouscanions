"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    CheckCircle2,
    ArrowRight,
    Activity,
    ShieldCheck,
    Sparkles
} from "lucide-react";

// --- HOOK DE PARALLAX PERSONALIZADO ---
// Garante o efeito visual sem depender de bibliotecas externas que podem falhar
const useParallax = (speed = 0.5) => {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            // Otimização: só calcula se estiver visível na tela
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

// --- COMPONENTE DO BOTÃO (EFEITO SMARTPOP) ---
// Botão que expande/recolhe ao passar o mouse
const WhatsAppCTA = () => (
    <div className="flex flex-col items-center justify-center w-full py-12">
        <a
            href="https://wa.me/5561996780739?text=Olá,%20gostaria%20de%20agendar%20uma%20avaliação!"
            target="_blank"
            rel="noopener noreferrer"
            className="
                group relative flex h-14 w-auto min-w-[220px] items-center justify-center 
                overflow-hidden rounded-full bg-[#25D366] text-white shadow-xl 
                transition-[width,min-width] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] 
                hover:w-14 hover:min-w-[3.5rem]
            "
        >
            {/* Texto que desaparece ao passar o mouse */}
            <div className="absolute flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 group-hover:opacity-0 group-hover:translate-x-10">
                <span className="text-lg font-bold tracking-wide">Entrar em contato</span>
            </div>

            {/* Ícone de seta que aparece ao passar o mouse */}
            <div className="absolute flex items-center justify-center opacity-0 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:scale-100 scale-50">
                <ArrowRight size={24} strokeWidth={3} />
            </div>
        </a>
    </div>
);

// --- DADOS DAS SEÇÕES (COM OS TEXTOS RESTAURADOS) ---
interface ParallaxSectionData {
    id: number;
    videoSrc: string;
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
        videoSrc: "https://res.cloudinary.com/dutbdeta6/video/upload/C0004_-_Cor_fjxwyi.mp4",
        title: "Carol Nantet",
        subtitle: "Fisioterapia & Pilates",
        overlayGradient: "linear-gradient(to bottom, rgba(39, 174, 96, 0.4) 0%, rgba(44, 62, 80, 0.9) 100%)",
        contentTitle: "Excelência em Movimento",
        // Texto restaurado
        contentBody: (
            <div className="space-y-6 text-center max-w-3xl mx-auto">
                <p className="text-lg text-slate-600 leading-relaxed">
                    Nossa metodologia une o melhor da fisioterapia clássica com a fluidez do Pilates moderno,
                    proporcionando reabilitação eficaz e fortalecimento consciente. Tratamos cada paciente como único,
                    respeitando seus limites e potencializando seus resultados.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    {['Avaliação Individualizada', 'Equipamentos de Ponta', 'Ambiente Acolhedor', 'Foco em Resultados'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <CheckCircle2 className="text-green-600 w-5 h-5 flex-shrink-0" />
                            <span className="font-medium text-slate-700">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 2,
        videoSrc: "https://res.cloudinary.com/dutbdeta6/video/upload/C0005_-_Cor_kaatmg.mp4",
        title: "Pilates Terapêutico",
        overlayGradient: "linear-gradient(to bottom, rgba(52, 152, 219, 0.4) 0%, rgba(44, 62, 80, 0.9) 100%)",
        contentTitle: "Corpo Forte, Mente Equilibrada",
        // Texto restaurado
        contentBody: (
            <div className="space-y-6 text-center max-w-3xl mx-auto">
                <p className="text-lg text-slate-600 leading-relaxed">
                    O Pilates Clínico não é apenas exercício, é uma ferramenta poderosa de reabilitação.
                    Focamos no controle do "Power House", melhorando a postura, flexibilidade e tônus muscular
                    sem impacto excessivo nas articulações.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    {[
                        'Correção Postural',
                        'Definição Muscular',
                        'Controle da Respiração',
                        'Alívio de Tensões'
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <Activity className="text-blue-500 w-5 h-5 flex-shrink-0" />
                            <span className="font-medium text-slate-700">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 3,
        videoSrc: "https://res.cloudinary.com/dutbdeta6/video/upload/C0008_-_Cor_enbpmm.mp4",
        title: "Fisioterapia Preventiva",
        overlayGradient: "linear-gradient(to bottom, rgba(155, 89, 182, 0.4) 0%, rgba(44, 62, 80, 0.9) 100%)",
        contentTitle: "Longevidade Ativa",
        // Texto restaurado
        contentBody: (
            <div className="space-y-6 text-center max-w-3xl mx-auto">
                <p className="text-lg text-slate-600 leading-relaxed">
                    Não espere a dor limitar sua vida. Atuamos na prevenção de lesões identificando desequilíbrios
                    musculares e padrões de movimento incorretos, garantindo que você continue praticando seus esportes
                    e atividades diárias com segurança.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    {[
                        'Análise Biomecânica',
                        'Prevenção de Lesões',
                        'Melhora de Performance',
                        'Autonomia Funcional'
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <ShieldCheck className="text-purple-600 w-5 h-5 flex-shrink-0" />
                            <span className="font-medium text-slate-700">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 4,
        videoSrc: "https://res.cloudinary.com/dutbdeta6/video/upload/C0011_-_Cor_iwegdu.mp4",
        title: "Viver Sem Dor",
        overlayGradient: "linear-gradient(to bottom, rgba(192, 57, 43, 0.5) 0%, rgba(44, 62, 80, 0.95) 100%)",
        badge: "Especialista em Dor",
        contentTitle: "Tratamento de Dor Crônica",
        // Texto restaurado
        contentBody: (
            <div className="space-y-6 text-center max-w-3xl mx-auto">
                <p className="text-lg text-slate-600 leading-relaxed">
                    A dor crônica não deve ser normalizada. Utilizamos uma abordagem integrativa que combina
                    terapia manual, liberação miofascial e exercícios específicos para tratar a causa raiz do problema,
                    não apenas os sintomas.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 text-left">
                    {[
                        'Hérnia de Disco',
                        'Ciatalgia',
                        'Dores Cervicais',
                        'Reabilitação Pós-Cirúrgica'
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                            <Sparkles className="text-red-500 w-5 h-5 flex-shrink-0" />
                            <span className="font-medium text-slate-700">{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 5,
        videoSrc: "https://res.cloudinary.com/dutbdeta6/video/upload/C0014_-_Cor_gdzvo9.mp4",
        title: "Inicie Sua Transformação",
        overlayGradient: "linear-gradient(to bottom, rgba(230, 126, 34, 0.4) 0%, rgba(44, 62, 80, 0.9) 100%)",
        contentTitle: "Vamos Começar?",
        contentBody: <WhatsAppCTA />, // Botão SmartPop
    },
];

// --- COMPONENTES VISUAIS ---

const ParallaxSlide = ({
    videoSrc,
    title,
    subtitle,
    overlayGradient,
    badge
}: {
    videoSrc: string;
    title: string;
    subtitle?: string;
    overlayGradient: string;
    badge?: string;
}) => {
    const { ref, offset } = useParallax(0.5);

    return (
        <section ref={ref} className="relative h-screen w-full overflow-hidden bg-black">
            {/* Camada do Vídeo */}
            <div
                className="absolute inset-0 w-full h-[120%]"
                style={{
                    transform: `translateY(${offset}px)`,
                    willChange: 'transform'
                }}
            >
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
            </div>

            {/* Overlays */}
            <div className="absolute inset-0 z-[2] mix-blend-multiply pointer-events-none" style={{ background: overlayGradient }} />
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/60 to-transparent z-[2] pointer-events-none" />

            {/* Conteúdo Central */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-[3] px-6">
                <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
                    {badge && (
                        <span className="mb-6 bg-red-600 text-white px-6 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm animate-fade-in">
                            {badge}
                        </span>
                    )}
                    <h1 className="text-white text-4xl sm:text-5xl md:text-7xl font-extrabold mb-4 tracking-tight drop-shadow-2xl">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-white/90 text-xl sm:text-2xl md:text-3xl font-light tracking-wide max-w-2xl drop-shadow-md">
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

const ContentSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
    // Se não houver conteúdo, não renderiza a seção (evita faixas brancas vazias)
    if (!children) return null;

    return (
        <section className="py-20 md:py-28 bg-white relative z-10 overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">
                {title && (
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 tracking-tight">
                            {title}
                        </h2>
                        <div className="w-20 h-1.5 bg-gradient-to-r from-green-500 to-teal-500 mx-auto rounded-full"></div>
                    </div>
                )}
                <div className="text-slate-600">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default function ParallaxPage() {
    return (
        <div className="w-full font-sans antialiased bg-black">
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