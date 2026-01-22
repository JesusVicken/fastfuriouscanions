'use client'

import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import { Check, ShieldAlert } from "lucide-react"
// Usando uma das fotos que você já tem para o background mobile
import KaduMobileBg from "../../../public/kadu1.jpg"
import Image from "next/image"

export function Hero() {
  const whatsappMessage = encodeURIComponent(
    "Olá Kadu! Vi o site e estou interessado em agendar uma expedição de canionismo."
  )

  return (
    <section className="bg-zinc-950 text-white relative overflow-hidden border-b border-white/5">

      {/* Imagem de fundo mobile (Fallback visual) */}
      <div className="lg:hidden absolute inset-0 z-0">
        <Image
          src={KaduMobileBg}
          alt='Kadu Aragão - Canionismo'
          fill
          sizes='100vw'
          priority
          className='object-cover opacity-50'
          style={{ objectPosition: 'center top' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/40"></div>
      </div>

      <div className='container mx-auto pt-24 pb-20 px-4 relative z-10'>
        <article className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>

          {/* Coluna de Texto */}
          <div className='space-y-8' data-aos="fade-up">

            {/* Badge Tática */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-500 text-xs font-bold uppercase tracking-widest w-fit">
              <ShieldAlert className="w-4 h-4" />
              Expedições Confirmadas
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight uppercase tracking-tight">
              Desbrave o <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                Impossível
              </span>
            </h1>

            <p className="text-lg text-gray-300 max-w-xl leading-relaxed border-l-4 border-orange-600 pl-4">
              Instrutor Kadu Aragão: Especialista em verticalidade, resgate e
              acesso a locais inexplorados na Chapada dos Veadeiros.
            </p>

            {/* Benefícios e indicações */}
            <div className="grid md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">

              <div>
                <p className="text-sm md:text-base font-bold mb-3 text-orange-500 uppercase tracking-wide">
                  A Experiência:
                </p>
                <ul className="text-sm space-y-3">
                  {[
                    "Adrenalina com segurança total",
                    "Acesso a cachoeiras exclusivas",
                    "Equipamentos certificados UIAA",
                    "Fotos e vídeos inclusos",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 group">
                      <Check className="text-orange-500 w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-white transition-colors" />
                      <span className="text-gray-400 group-hover:text-gray-200 transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm md:text-base font-bold mb-3 text-orange-500 uppercase tracking-wide">
                  Nível Técnico:
                </p>
                <ul className="text-sm space-y-3">
                  {[
                    "Iniciantes a Avançados",
                    "Treinamento prévio em solo",
                    "Protocolos internacionais",
                    "Guias bilíngues disponíveis",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 group">
                      <Check className="text-orange-500 w-4 h-4 mt-0.5 flex-shrink-0 group-hover:text-white transition-colors" />
                      <span className="text-gray-400 group-hover:text-gray-200 transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={`https://wa.me/5561999999999?text=${whatsappMessage}`} // TODO: Colocar numero real
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-600 text-white flex items-center justify-center gap-3 px-8 py-4 rounded-lg font-bold uppercase tracking-wide shadow-lg shadow-orange-900/20 hover:bg-orange-700 hover:scale-105 transition-all duration-300 w-full sm:w-auto group"
              >
                <WhatsappLogo className='w-6 h-6' weight="fill" />
                <span>Agendar Aventura</span>
              </a>
              <p className="text-xs text-gray-500 max-w-xs">
                Vagas limitadas por saída para garantir a segurança do grupo.
              </p>
            </div>
          </div>

          {/* VIDEO DESKTOP COM AOS */}
          <div
            className="hidden lg:block relative w-full h-[600px] rounded-3xl overflow-hidden group shadow-2xl border border-white/10"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {/* Vídeo */}
            <video
              src="/kadu.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="
                w-full h-full object-cover 
                scale-105 group-hover:scale-110 
                transition-transform duration-[2000ms] ease-out
                filter brightness-90 group-hover:brightness-100
              "
            />

            {/* Overlay Gradiente sobre o vídeo */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

            {/* Badge flutuante sobre o vídeo */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                <p className="text-white font-bold text-lg leading-tight">
                  "A verdadeira natureza se revela quando você sai da trilha marcada."
                </p>
                <p className="text-orange-400 text-sm mt-1 font-mono uppercase">
                    // Kadu Aragão
                </p>
              </div>
            </div>
          </div>

        </article>
      </div>

    </section>
  )
}