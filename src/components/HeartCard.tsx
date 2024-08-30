import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function Component() {
  const [isOpen, setIsOpen] = useState(true)
  const controls = useAnimation()

  const heartPoints = Array.from({ length: 27 }, (_, i) => {
    const t = i / 13.5 * Math.PI * 2
    const x = 16 * Math.pow(Math.sin(t), 3)
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
    return { x: x * 14 + 250, y: y * 14 + 250 }
  })

  useEffect(() => {
    if (isOpen) {
      controls.start(i => ({
        opacity: [0, 1, 0],
        scale: [0.8, 1, 0.8],
        transition: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          delay: i * 0.1,
        },
      }))
    } else {
      controls.stop()
    }
  }, [isOpen, controls])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-pink-50 to-purple-50">
      <div className="relative w-[500px] h-[500px]">
        <svg viewBox="0 0 500 500" className="absolute inset-0">
          <defs>
            <clipPath id="heart-clip">
              <path d="M250 470.5c-10.8-9.5-21.5-18.9-31.9-28.1-52.8-46.6-96.1-85.9-127.2-122.6C56.6 277.9 40 242.1 40 208c0-68.1 55.4-123.5 123.5-123.5 40.7 0 80.2 20.1 103.5 52.7 23.3-32.6 62.8-52.7 103.5-52.7 68.1 0 123.5 55.4 123.5 123.5 0 34.1-16.6 69.9-50.9 111.8-31.1 36.7-74.4 76-127.2 122.6-10.4 9.2-21.1 18.6-31.9 28.1L250 470.5z" />
            </clipPath>
          </defs>
        </svg>
        <div className="absolute inset-0" style={{ clipPath: 'url(#heart-clip)', background: 'linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8))' }}>
          {isOpen && (
            <>
              {heartPoints.map((point, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  animate={controls}
                  className="absolute"
                  style={{ x: point.x, y: point.y }}
                >
                  <Heart className="w-4 h-4 text-red-300 fill-current drop-shadow-lg" />
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center p-4 w-[340px] h-[340px] flex flex-col justify-center items-center" style={{ transform: 'translateY(30px)' }}>
                  <h2 className="text-3xl font-bold text-pink-600 mb-4 font-serif drop-shadow-lg">Sidny Mi Amor</h2>
                  <p className="text-sm leading-relaxed text-gray-700 mb-4 font-sans">
                    En el jardín de nuestros días,
                    donde florece la esperanza,
                    dos años juntos construimos,
                    un amor que nunca cansa.

                    Tus ojos, mi faro brillante,
                    tu risa, mi melodía,
                    en cada abrazo siento,
                    la magia de cada día.

                    Celebramos estos años,con corazones entrelazados,
                    mi amor por ti es infinito,
                    y siempre será nuestro legado.
                  </p>
                  <p className="text-lg font-semibold text-pink-600 font-serif drop-shadow-lg">
                    Siempre juntos
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}