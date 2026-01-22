'use client'

import { useEffect, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import AOS from "aos"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const certificates = [
    {
        title: "Certificado FlowFit - Level 1 Instructor",
        image: "/cer1.jpg",
    },
    {
        title: "Certificado TACFIT - Level 1 Instructor",
        image: "/cer2.jpg",
    },
    {
        title: "Certificado FlowFit - Level 2 Instructor",
        image: "/cer3.jpg",
    },
    {
        title: "Certificado Surf e SUP",
        image: "/cer4.jpg",
    },
]

export function Services() {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        dragFree: true,
        containScroll: "trimSnaps",
    })

    const containerRef = useRef<HTMLDivElement>(null)

    const scrollPrev = () => emblaApi?.scrollPrev()
    const scrollNext = () => emblaApi?.scrollNext()

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        })
    }, [])

    useEffect(() => {
        if (!containerRef.current) return

        const cards = containerRef.current.querySelectorAll(".cert-card")

        gsap.fromTo(
            cards,
            { autoAlpha: 0, y: 50 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    // markers: true, // descomente para debug
                },
            }
        )

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                        Certificados Profissionais e Especializações
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Veja abaixo alguns dos certificados que comprovam minha experiência e
                        qualificação como profissional.
                    </p>
                </div>

                <div className="relative max-w-6xl mx-auto" ref={containerRef}>
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-4">
                            {certificates.map((cert, index) => (
                                <div
                                    key={index}
                                    className="cert-card flex-[0_0_calc(100%-1rem)] sm:flex-[0_0_calc(50%-1rem)] lg:flex-[0_0_calc(33%-1rem)] min-w-0 px-1"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                                        <div className="relative w-full h-64 md:h-72 lg:h-80">
                                            <Image
                                                src={cert.image}
                                                alt={cert.title}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div className="p-4 text-center">
                                            <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                                                {cert.title}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navegação Desktop */}
                    <button
                        onClick={scrollPrev}
                        className="hidden sm:flex items-center justify-center absolute left-0 md:-left-5 -translate-y-1/2 top-1/2 z-10 bg-white hover:bg-gray-100 w-10 h-10 rounded-full shadow-md border border-gray-200 transition"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>

                    <button
                        onClick={scrollNext}
                        className="hidden sm:flex items-center justify-center absolute right-0 md:-right-5 -translate-y-1/2 top-1/2 z-10 bg-white hover:bg-gray-100 w-10 h-10 rounded-full shadow-md border border-gray-200 transition"
                        aria-label="Próximo"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                {/* Navegação Mobile */}
                <div className="flex justify-center mt-8 gap-3 sm:hidden">
                    <button
                        onClick={scrollPrev}
                        className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-100 rounded-full shadow-md border border-gray-200"
                        aria-label="Anterior"
                    >
                        <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="flex items-center justify-center w-10 h-10 bg-white hover:bg-gray-100 rounded-full shadow-md border border-gray-200"
                        aria-label="Próximo"
                    >
                        <ChevronRight className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
            </div>
        </section>
    )
}
