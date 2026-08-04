import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { ExerciseInfo } from '../lib/exercises'
import { Pictogram } from './pictograms/Pictograms'
import './exercise-sheet.css'

/** Bottom sheet showing how an exercise is done: animated pictogram, steps,
 *  cues, mistakes. Opened from any day page via an info affordance. */
export function ExerciseSheet({
  info,
  onClose,
}: {
  info: ExerciseInfo | null
  onClose: () => void
}) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!info) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [info])

  return (
    <AnimatePresence>
      {info && (
        <div className="xs-root" key={info.id}>
          <motion.button
            className="xs-backdrop"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          <motion.div
            className="xs-panel"
            role="dialog"
            aria-label={info.name}
            initial={{ y: reduced ? 0 : '100%', opacity: reduced ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reduced ? 0 : '100%', opacity: reduced ? 0 : 1 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
            drag={reduced ? false : 'y'}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, { offset, velocity }) => {
              if (offset.y > 90 || velocity.y > 500) onClose()
            }}
          >
            <div className="xs-handle" />
            <div className="xs-scroll">
              <div className="xs-pict">
                <Pictogram id={info.id} />
              </div>
              <h2 className="xs-name">{info.name}</h2>
              <div className="xs-muscles">
                {info.muscles.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>

              <h3 className="xs-h">How to do it</h3>
              <ol className="xs-steps">
                {info.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>

              <h3 className="xs-h">Keep in mind</h3>
              <ul className="xs-list">
                {info.cues.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              <h3 className="xs-h">Don't</h3>
              <ul className="xs-list xs-bad">
                {info.mistakes.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              {info.wristNote && (
                <div className="xs-wrist">
                  <strong>Wrist:</strong> {info.wristNote}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
