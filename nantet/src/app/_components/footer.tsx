'use client'

import Image from 'next/image'
import {
  FacebookLogo,
  InstagramLogo,
  YoutubeLogo,
  WhatsappLogo,
  LinkedinLogo,
  Phone,
  MapPin,
  Clock,
} from '@phosphor-icons/react/dist/ssr'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import sunTech from '../../../public/sun.jpg'
import parceiro1 from '../../../public/parceiro1.jpeg'
import parceiro2 from '../../../public/parceiro2.jpeg'
import parceiro3 from '../../../public/parceiro3.jpeg'

gsap.registerPlugin(ScrollTrigger)

const partners = [
  { name: 'Sun Tech', logo: sunTech },
  { name: 'Parceiro 1', logo: parceiro1 },
  { name: 'Parceiro 2', logo: parceiro2 },
  { name: 'Parceiro 3', logo: parceiro3 }
]

export function Footer() {
  const whatsappNumber = '556182795960'
  const whatsappMessage = 'Olá Carolina! Gostaria de agendar uma aula de Pilates!'
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`

  const partnersRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (partnersRef.current) {
      const partnerCards = gsap.utils.toArray('.partner-card', partnersRef.current)
      gsap.fromTo(
        partnerCards,
        { autoAlpha: 0, scale: 0.8 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: partnersRef.current,
            start: 'top 90%',
          },
        }
      )
    }

    if (sectionsRef.current) {
      const sections = sectionsRef.current.querySelectorAll('.footer-section')
      gsap.fromTo(
        sections,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionsRef.current,
            start: 'top 85%',
          },
        }
      )
    }

    if (mapRef.current) {
      gsap.fromTo(
        mapRef.current,
        { autoAlpha: 0, scale: 0.95 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: mapRef.current,
            start: 'top 90%',
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section className="bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* PARCEIROS */}
        <div
          className="border-b border-white/20 pb-10 mb-10"
          data-aos="fade-up"
          data-aos-duration="1000"
          ref={partnersRef}
        >
          <h4 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
            Meus Parceiros
          </h4>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="partner-card bg-white p-3 rounded-xl flex items-center justify-center shadow-md w-[140px] h-[80px] sm:w-[160px] sm:h-[90px] opacity-0 scale-90"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill={false}
                  className="object-contain max-w-full max-h-full"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* INFORMAÇÕES */}
        <footer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-sm"
          ref={sectionsRef}
        >
          {/* SOBRE */}
          <div className="footer-section opacity-0" data-animate-section>
            <h3 className="text-2xl font-semibold mb-3">
              Carolina Nantet - Fisioterapeuta
            </h3>
            <p className="mb-4 text-gray-300 leading-relaxed">
              Transformando vidas por meio de aulas de Pilates, treinos
              personalizados e práticas de bem-estar que promovem mobilidade,
              força e consciência corporal.
            </p>
            <a
              href={whatsappLink}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 px-5 py-2 rounded-md font-semibold text-sm transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappLogo size={20} weight="fill" />
              Agende sua aula
            </a>
          </div>

          {/* CONTATOS */}
          <div className="footer-section opacity-0" data-animate-section>
            <h3 className="text-2xl font-semibold mb-3">Contato</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-2">
                <Phone size={20} weight="fill" className="text-green-400" />
                <span>+55 61 98279-5960</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={20} weight="fill" className="text-red-400 mt-1" />
                <span>
                  CLN 304 Bloco C Loja 32 - Subsolo <br /> Asa Norte, Brasília -
                  DF
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={20} weight="fill" className="text-yellow-400" />
                <span>
                  Horários sob agendamento <br /> Entre em contato para verificar
                  disponibilidade
                </span>
              </li>
            </ul>
          </div>

          {/* REDES SOCIAIS */}
          <div className="footer-section opacity-0" data-animate-section>
            <h3 className="text-2xl font-semibold mb-3">Redes Sociais</h3>
            <div className="flex gap-5 mt-2">
              <a
                href="https://www.facebook.com/carol.nantet?locale=pt_BR"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:scale-110"
              >
                <FacebookLogo size={32} weight="fill" className="text-[#1877F2]" />
              </a>
              <a
                href="https://www.instagram.com/carolinanantet/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:scale-110"
              >
                <InstagramLogo size={32} weight="fill" className="text-[#E1306C]" />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:scale-110"
              >
                <YoutubeLogo size={32} weight="fill" className="text-[#FF0000]" />
              </a>
              <a
                href="https://www.linkedin.com/in/carolina-nantet-0012a4231/?originalSubdomain=br"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:scale-110"
              >
                <LinkedinLogo size={32} weight="fill" className="text-[#0077B5]" />
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* MAPA */}
      <div
        className="w-full h-[300px] md:h-[400px] lg:h-[450px] border-t border-white/10 opacity-0"
        ref={mapRef}
      >
        <iframe
          title="Localização Carolina Nantet - Pilates"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.0366266613613!2d-47.88794132495667!3d-15.75001698490859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3bdfc0b1c7a5%3A0x53c3778981b2c893!2sCLN%20304%20Bloco%20C%20-%20Loja%2032%20-%20Asa%20Norte%2C%20Bras%C3%ADlia%20-%20DF%2C%2070746-530!5e0!3m2!1spt-BR!2sbr!4v1727187845672!5m2!1spt-BR!2sbr"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  )
}