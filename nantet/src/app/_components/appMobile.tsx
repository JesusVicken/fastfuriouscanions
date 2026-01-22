'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AppMobile() {
    const imageRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        const animatables = [imageRef.current, contentRef.current].filter(Boolean)

        animatables.forEach((el) => {
            gsap.fromTo(
                el,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            )
        })
    }, [])

    return (
        <section className="w-full bg-white px-4 sm:px-6 lg:px-8 py-6 md:py-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">

                    {/* Conteúdo */}
                    <div
                        ref={contentRef}
                        className="w-full max-w-2xl flex flex-col gap-6"
                    >
                        <div>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                Seu treino será entregue <span className="text-yellow-500">em alto nível</span>
                            </h2>
                            <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-xl">
                                Toda tecnologia a favor dos seus resultados.
                            </p>
                        </div>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {[
                                'Fotos e/ou vídeos demonstrativos',
                                'Cronometragem dos descansos',
                                'Registros de frequência',
                                'Material de apoio exclusivo',
                                'Acesse pelo navegador',
                                'Compatível com todos os smartphones',
                            ].map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-start gap-3 bg-gray-50 rounded-md p-3 hover:bg-gray-100 transition-colors"
                                >
                                    <Check className="text-yellow-500 w-5 h-5 mt-0.5" />
                                    <span className="text-gray-800 text-sm sm:text-base">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div>
                            <a
                                href="https://wa.me/5561995982423?text=Olá Cristiano! Quero saber mais sobre seus treinos personalizados."
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                    className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold text-base sm:text-lg px-6 py-4 transition-transform hover:scale-105 hover:shadow-md"
                                    size="lg"
                                >
                                    Contratar agora
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Imagem */}
                    <div
                        ref={imageRef}
                        className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl flex justify-center"
                    >
                        <div className="relative w-full h-[380px] sm:h-[440px] md:h-[480px] lg:h-[500px] xl:h-[520px]">
                            <Image
                                src="/celulart.png"
                                alt="App no celular"
                                fill
                                className="object-contain drop-shadow-2xl"
                                quality={100}
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
