import React, { useState } from 'react'
import { Gift, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function RomanticDateMemories() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleGallery = () => setIsOpen(!isOpen)

  // Usar las imágenes de la carpeta public
  const photos = [
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
  ]

  return (
    <div className="container mx-auto p-4 bg-pink-50 rounded-lg shadow-xl">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-red-400 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 mb-8"
        onClick={toggleGallery}
      >
        <Gift className="w-5 h-5" />
        <span className="font-semibold">Nuestras Citas</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-full max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-8 text-red-500">Nuestros Recuerdos Románticos</h2>
            <div className="grid grid-cols-2 gap-2 md:gap-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              {photos.map((photo, index) => (
                <motion.div
                  key={index}
                  className="relative aspect-square"
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? -3 : 3 }}
                >
                  <div className="absolute inset-0 bg-red-200 rounded-full transform rotate-45" />
                  <img
                    src={photo}
                    alt={`Recuerdo de cita ${index + 1}`}
                    className="relative z-10 object-cover w-full h-full rounded-full shadow-lg"
                  />
                  <motion.div
                    className="absolute top-1 right-1 z-20"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <Heart className="w-4 h-4 md:w-6 md:w-6 text-red-500 fill-current" />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-red-200"
              initial={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                scale: [0, 1, 0],
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ♥
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}