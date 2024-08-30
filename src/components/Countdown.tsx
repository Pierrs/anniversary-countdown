// Countdown.tsx
import React from 'react'

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  timeLeft: TimeLeft;
  showMessage: boolean;
}

const Countdown: React.FC<CountdownProps> = ({ timeLeft, showMessage }) => {
  return (
    <>
      {!showMessage ? (
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center bg-pink-100 p-4 rounded-lg">
              <span className="text-5xl font-bold text-indigo-600">{value}</span>
              <span className="text-sm uppercase text-gray-500">
                {unit === 'days' ? 'Días' : unit === 'hours' ? 'Horas' : unit === 'minutes' ? 'Minutos' : 'Segundos'}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-3xl font-bold text-pink-600 mb-8 animate-bounce">
          ¡Feliz Aniversario mi amorcito lindo!
        </div>
      )}
    </>
  )
}

export default Countdown