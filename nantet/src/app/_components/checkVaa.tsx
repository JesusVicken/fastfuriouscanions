'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function CheckVaa() {
    const produtosRef = useRef(null)

    useEffect(() => {
        if (produtosRef.current) {
            gsap.fromTo(
                produtosRef.current,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    scrollTrigger: {
                        trigger: produtosRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    },
                }
            )
        }

        const cards = gsap.utils.toArray('.produto-card') as HTMLElement[]

        cards.forEach((card) => {
            const content = card.querySelector('.produto-info') as HTMLElement
            gsap.set(content, { opacity: 0, y: 20 })

            card.addEventListener('mouseenter', () => {
                gsap.to(content, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                })
            })

            card.addEventListener('mouseleave', () => {
                gsap.to(content, {
                    opacity: 0,
                    y: 20,
                    duration: 0.4,
                    ease: 'power2.out',
                })
            })
        })
    }, [])

    return (
        <section className="bg-white text-black py-20 px-6 md:px-20">
            <div ref={produtosRef} className="max-w-6xl mx-auto text-center">
                <Image
                    src="/sun.jpg"
                    alt="Logo Suntech"
                    width={160}
                    height={100}
                    className="mx-auto mb-6"
                    data-aos="fade-down"
                />

                <h2
                    className="text-4xl font-bold text-yellow-500 mb-4"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    Produtos à Venda
                </h2>

                <p
                    className="text-lg md:text-xl text-neutral-700 mb-12 max-w-3xl mx-auto"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Alta proteção, toque seco e resistência à água. Escolha a sua versão ideal e leve proteção de verdade para seus treinos!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Produto 75g */}
                    <div
                        className="produto-card relative bg-yellow-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
                        data-aos="zoom-in-up"
                        data-aos-delay="100"
                    >
                        <h3 className="text-xl font-bold text-yellow-600 text-center mb-4">
                            Protetor Solar FPS 50 – 75g
                        </h3>
                        <div className="flex gap-4 mb-4 justify-center">
                            <Image
                                src="/suntech1.webp"
                                alt="Protetor 75g Frente"
                                width={160}
                                height={220}
                                className="rounded-md border"
                            />
                            <Image
                                src="/suntech2.webp"
                                alt="Protetor 75g Verso"
                                width={160}
                                height={220}
                                className="rounded-md border"
                            />
                        </div>

                        {/* Informações escondidas com hover */}
                        <div className="produto-info absolute inset-0 bg-white/95 flex flex-col items-center justify-center text-center px-4 rounded-2xl">
                            <p className="text-sm text-zinc-700 mb-4">
                                Ideal para o dia a dia. Embalagem compacta, perfeita para levar na bolsa ou mochila.
                            </p>
                            <a
                                href="https://wa.me/5561998219177?text=Olá! Gostaria de comprar o protetor solar Suntech 75g."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-yellow-500 text-black px-5 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
                            >
                                Comprar via WhatsApp
                            </a>
                        </div>
                    </div>

                    {/* Produto 180g */}
                    <div
                        className="produto-card relative bg-yellow-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer"
                        data-aos="zoom-in-up"
                        data-aos-delay="200"
                    >
                        <h3 className="text-xl font-bold text-yellow-600 text-center mb-4">
                            Protetor Solar FPS 50 – 180g
                        </h3>
                        <div className="flex gap-4 mb-4 justify-center">
                            <Image
                                src="/suntech3.webp"
                                alt="Protetor 180g Frente"
                                width={160}
                                height={220}
                                className="rounded-md border"
                            />
                            <Image
                                src="/suntech4.webp"
                                alt="Protetor 180g Verso"
                                width={160}
                                height={220}
                                className="rounded-md border"
                            />
                        </div>

                        <div className="produto-info absolute inset-0 bg-white/95 flex flex-col items-center justify-center text-center px-4 rounded-2xl">
                            <p className="text-sm text-zinc-700 mb-4">
                                Para quem usa com frequência. Mais produto, mais economia, mais proteção.
                            </p>
                            <a
                                href="https://wa.me/5561995982423?text=Olá! Quero comprar o protetor solar Suntech 180g."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-yellow-500 text-black px-5 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
                            >
                                Comprar via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
