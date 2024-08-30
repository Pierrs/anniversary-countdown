import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface LoveAudioProps {
  audioSrc: string;
}

const LoveAudio: React.FC<LoveAudioProps> = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error('Playback failed:', error));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
    }
  }, [audioSrc]);

  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-4">Mi canción de amor</h3>
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={togglePlay}
          className="bg-white text-purple-600 p-3 rounded-full hover:bg-purple-100 transition-colors"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button
          onClick={toggleMute}
          className="bg-white text-purple-600 p-3 rounded-full hover:bg-purple-100 transition-colors"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
      <audio ref={audioRef} />
      <p className="text-white text-center mt-4">
        Revive nuestros momentos bailando bajo las estrellas
      </p>
    </div>
  );
};

export default LoveAudio;
