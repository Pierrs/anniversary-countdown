import React, { useState, useEffect } from 'react'
import { Heart, Gift, Music, Mail } from 'lucide-react'
import Countdown from './Countdown'
import { useAudio } from './useAudio'
import HeartCard from './HeartCard'
import RomanticDateMemories from './RomanticDateMemories'
import LoveAudio from './LoveAudio'

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Memory {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  onClick?: () => void;
}

const AnniversaryCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [showMessage, setShowMessage] = useState<boolean>(false)
  const [showHeartCard, setShowHeartCard] = useState<boolean>(false)
  const [showRomanticMemories, setShowRomanticMemories] = useState<boolean>(false)
  const [showLoveAudio, setShowLoveAudio] = useState<boolean>(false)
  const [audioInitialized, setAudioInitialized] = useState<boolean>(false)
  const [heartbeatStopped, setHeartbeatStopped] = useState<boolean>(false)
  const {
    audioContext,
    heartbeatBuffer,
    audioSource,
    celebrationPlayed,
    playHeartbeatAudio,
    playCelebrationAudio,
    initializeAudio,
    stopHeartbeatAudio,
    setCelebrationPlayed
  } = useAudio()

  useEffect(() => {
    const anniversaryDate = new Date('2024-08-31T00:00:00')

    const updateCountdown = () => {
      const now = new Date()
      const difference = anniversaryDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
        setShowMessage(false)

        if (!audioSource && audioInitialized && !heartbeatStopped) {
          playHeartbeatAudio()
        }
      } else {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        })
        setShowMessage(true)

        if (!heartbeatStopped) {
          stopHeartbeatAudio()
          setHeartbeatStopped(true)
        }

        if (!celebrationPlayed) {
          playCelebrationAudio()
          setCelebrationPlayed(true)
        }
      }
    }

    const timer = setInterval(updateCountdown, 1000)
    updateCountdown()

    return () => clearInterval(timer)
  }, [
    audioSource,
    playHeartbeatAudio,
    audioInitialized,
    heartbeatStopped,
    celebrationPlayed,
    stopHeartbeatAudio,
    playCelebrationAudio,
    setCelebrationPlayed,
  ])

  useEffect(() => {
    if (audioContext && heartbeatBuffer && localStorage.getItem('audioPlaying') === 'true') {
      playHeartbeatAudio()
    }
  }, [audioContext, heartbeatBuffer, playHeartbeatAudio])

  const handleAudioInit = () => {
    initializeAudio()
    setAudioInitialized(true)
  }

  const handleMemoryClick = (action: () => void) => {
    if (showMessage) {
      action()
    }
  }

  const memories: Memory[] = [
    { 
      icon: Gift, 
      text: "Nuestras primeras citas",
      onClick: () => handleMemoryClick(() => setShowRomanticMemories(true))
    },
    { 
      icon: Mail, 
      text: "Ábreme mi amorcito", 
      onClick: () => handleMemoryClick(() => setShowHeartCard(true))
    },
    { 
      icon: Music, 
      text: "Bailando bajo las estrellas",
      onClick: () => handleMemoryClick(() => setShowLoveAudio(true))
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-4">
      <div className="text-center p-8 bg-white bg-opacity-90 rounded-lg shadow-xl max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-pink-600 mb-4">Casi es nuestro día especial</h1>
        <div className="flex justify-center items-center mb-6">
          <Heart className="text-red-500 w-12 h-12 mr-2 animate-pulse" />
          <span className="text-2xl font-semibold text-gray-700">Cuenta regresiva</span>
          <Heart className="text-red-500 w-12 h-12 ml-2 animate-pulse" />
        </div>
        <Countdown timeLeft={timeLeft} showMessage={showMessage} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {memories.map((memory, index) => (
            <div
              key={index}
              className={`flex items-center bg-indigo-100 p-4 rounded-lg ${showMessage ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
              onClick={memory.onClick}
            >
              <memory.icon className="text-indigo-500 w-6 h-6 mr-2" />
              <span className="text-gray-700">{memory.text}</span>
            </div>
          ))}
        </div>
        <p className="text-lg text-gray-600">
          Celebrando dos maravillosos años juntos y esperando muchos más.
        </p>
        {!audioInitialized && (
          <button
            onClick={handleAudioInit}
            className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-lg"
          >
            Inicializar Audio
          </button>
        )}
        {showHeartCard && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setShowHeartCard(false)}
          >
            <HeartCard />
          </div>
        )}
        {showRomanticMemories && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setShowRomanticMemories(false)}
          >
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-4xl">
              <RomanticDateMemories />
            </div>
          </div>
        )}
        {showLoveAudio && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={() => setShowLoveAudio(false)}
          >
            <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
              <LoveAudio audioSrc="./love.mp3" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AnniversaryCountdown