import { useState, useCallback, useRef } from 'react'
import confetti from 'canvas-confetti'

export const useAudio = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null)
  const [heartbeatBuffer, setHeartbeatBuffer] = useState<AudioBuffer | null>(null)
  const [celebrationBuffer, setCelebrationBuffer] = useState<AudioBuffer | null>(null)
  const [audioSource, setAudioSource] = useState<AudioBufferSourceNode | null>(null)
  const [gainNode, setGainNode] = useState<GainNode | null>(null)
  const [celebrationPlayed, setCelebrationPlayed] = useState<boolean>(false)
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null)

  const playHeartbeatAudio = useCallback(() => {
    if (audioContext && heartbeatBuffer && !audioSourceRef.current) {
      const source = audioContext.createBufferSource()
      source.buffer = heartbeatBuffer
      source.loop = true

      const gain = audioContext.createGain()
      gain.connect(audioContext.destination)
      setGainNode(gain)

      source.connect(gain)
      source.start(0)
      setAudioSource(source)
      audioSourceRef.current = source
      localStorage.setItem('audioPlaying', 'true')
    }
  }, [audioContext, heartbeatBuffer])

  const stopHeartbeatAudio = useCallback(() => {
    if (audioSourceRef.current) {
      if (gainNode) {
        gainNode.disconnect()
      }
      audioSourceRef.current.stop()
      audioSourceRef.current = null
      setAudioSource(null)
      localStorage.removeItem('audioPlaying')
    }
  }, [gainNode])

  const playCelebrationAudio = useCallback(() => {
    if (audioContext && celebrationBuffer && !celebrationPlayed) {
      const source = audioContext.createBufferSource()
      source.buffer = celebrationBuffer
      source.connect(audioContext.destination)
      source.start(0)
      setCelebrationPlayed(true)

      const confettiInterval = setInterval(() => {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        })
      }, 250)

      setTimeout(() => {
        source.stop()
        clearInterval(confettiInterval)
      }, 6000)
    }
  }, [audioContext, celebrationBuffer, celebrationPlayed])

  const initializeAudio = useCallback(async () => {
    const context = new AudioContext()
    setAudioContext(context)

    try {
      const [heartbeatResponse, celebrationResponse] = await Promise.all([
        fetch('/heartbeat.mp3'),
        fetch('/celebration.mp3')
      ])

      if (!heartbeatResponse.ok || !celebrationResponse.ok) {
        throw new Error('Failed to load audio files')
      }

      const [heartbeatArrayBuffer, celebrationArrayBuffer] = await Promise.all([
        heartbeatResponse.arrayBuffer(),
        celebrationResponse.arrayBuffer()
      ])

      const [heartbeatBuffer, celebrationBuffer] = await Promise.all([
        context.decodeAudioData(heartbeatArrayBuffer),
        context.decodeAudioData(celebrationArrayBuffer)
      ])

      setHeartbeatBuffer(heartbeatBuffer)
      setCelebrationBuffer(celebrationBuffer)
    } catch (error) {
      console.error('Error initializing audio:', error)
    }
  }, [])

  return {
    audioContext,
    heartbeatBuffer,
    celebrationBuffer,
    audioSource,
    gainNode,
    playHeartbeatAudio,
    playCelebrationAudio,
    initializeAudio,
    stopHeartbeatAudio,
    celebrationPlayed,
    setCelebrationPlayed
  }
}