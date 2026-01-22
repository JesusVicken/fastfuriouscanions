// app/_components/gallery.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Importando as imagens diretamente
import img1 from '../../../public/img1.jpeg';
import img2 from '../../../public/img2.jpeg';
import img3 from '../../../public/img3.jpeg';
import img4 from '../../../public/img4.jpeg';
import img5 from '../../../public/img5.jpeg';
import img6 from '../../../public/img6.jpeg';
import img7 from '../../../public/img7.jpeg';
import img8 from '../../../public/img8.jpeg';
import img9 from '../../../public/img9.jpeg';
import img10 from '../../../public/img10.jpeg';
import img11 from '../../../public/img11.jpeg';
import img12 from '../../../public/img12.jpeg';

const images = [
    img1, img2, img3, img4, img5, img6,
    img7, img8, img9, img10, img11, img12
];

export function Gallery() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState<boolean[]>([]);
    const [imageErrors, setImageErrors] = useState<boolean[]>([]);

    // Inicializa os arrays de estado
    useEffect(() => {
        setLoadedImages(new Array(images.length).fill(false));
        setImageErrors(new Array(images.length).fill(false));
    }, []);

    const openModal = (index: number) => {
        setCurrentIndex(index);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleImageLoad = (index: number) => {
        const newLoadedImages = [...loadedImages];
        newLoadedImages[index] = true;
        setLoadedImages(newLoadedImages);
    };

    const handleImageError = (index: number) => {
        const newImageErrors = [...imageErrors];
        newImageErrors[index] = true;
        setImageErrors(newImageErrors);
    };

    // Filtra apenas imagens que não tiveram erro
    const validImages = images.filter((_, index) => !imageErrors[index]);

    // Navegação pelo teclado
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isModalOpen) return;

            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen]);

    if (validImages.length === 0) {
        return (
            <section id="gallery" className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Galeria de Fotos</h2>
                    <div className="flex items-center justify-center text-gray-500">
                        <ImageIcon size={48} className="mr-3" />
                        <p>Nenhuma imagem disponível no momento</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="gallery" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-4">Galeria de Fotos</h2>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Confira alguns dos momentos de treinos e cursos
                </p>

                {/* Grid de miniaturas */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image, index) => {
                        if (imageErrors[index]) return null;

                        return (
                            <motion.div
                                key={index}
                                className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md bg-black"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                onClick={() => openModal(index)}
                            >
                                <div className={`absolute inset-0 bg-gray-800 animate-pulse rounded-lg ${loadedImages[index] ? 'hidden' : 'block'}`}></div>
                                <div className="relative w-full h-full">
                                    <Image
                                        src={image}
                                        alt={`Foto de treino ${index + 1}`}
                                        className="object-cover transition-opacity duration-300"
                                        style={{
                                            opacity: loadedImages[index] ? 1 : 0,
                                            width: '100%',
                                            height: '100%'
                                        }}
                                        onLoad={() => handleImageLoad(index)}
                                        onError={() => handleImageError(index)}
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Modal do carrossel */}
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                        >
                            <div className="relative w-full max-w-6xl max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                                {/* Botão fechar */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-4 right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all z-10"
                                    aria-label="Fechar galeria"
                                >
                                    <X size={28} />
                                </button>

                                {/* Botão anterior */}
                                {validImages.length > 1 && (
                                    <button
                                        onClick={goToPrevious}
                                        className="absolute left-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all z-10 md:left-8"
                                        aria-label="Foto anterior"
                                    >
                                        <ChevronLeft size={36} />
                                    </button>
                                )}

                                {/* Imagem principal */}
                                <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
                                    <motion.div
                                        key={currentIndex}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="relative w-full h-full bg-black"
                                    >
                                        <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg" style={{ display: loadedImages[currentIndex] ? 'none' : 'block' }}></div>
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <Image
                                                src={validImages[currentIndex]}
                                                alt={`Foto de treino ${currentIndex + 1}`}
                                                className="object-contain transition-opacity duration-300"
                                                style={{
                                                    opacity: loadedImages[currentIndex] ? 1 : 0,
                                                    maxWidth: '100%',
                                                    maxHeight: '100%'
                                                }}
                                                onLoad={() => handleImageLoad(currentIndex)}
                                                sizes="(max-width: 768px) 100vw, 80vw"
                                                priority
                                            />
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Botão próximo */}
                                {validImages.length > 1 && (
                                    <button
                                        onClick={goToNext}
                                        className="absolute right-4 text-white p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70 transition-all z-10 md:right-8"
                                        aria-label="Próxima foto"
                                    >
                                        <ChevronRight size={36} />
                                    </button>
                                )}

                                {/* Indicadores */}
                                {validImages.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                                        {validImages.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentIndex(index)}
                                                className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-white' : 'bg-gray-500 hover:bg-gray-300'
                                                    }`}
                                                aria-label={`Ir para foto ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Contador */}
                                {validImages.length > 1 && (
                                    <div className="absolute top-4 left-4 text-white text-lg font-medium z-10 bg-black bg-opacity-50 px-3 py-1 rounded-full">
                                        {currentIndex + 1} / {validImages.length}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}