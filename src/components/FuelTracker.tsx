import { FOOD_LIBRARY, foodById } from '../lib/foods'
import './fuel-tracker.css'

/** The Fuel tracker: tappable planned meals + one-tap extras from the personal
 *  food library, with a live protein/kcal total against the day's targets.
 *  State lives in useDayProgress: meals as `meal:<id>` checks, extras as a
 *  comma-separated list of food ids in logs['fuel:extras']. */

export interface MealPlan {
  id: string
  when: string
  what: string
  protein: number
  kcal: number
}

export function FuelTracker({
  meals,
  checks,
  onToggleMeal,
  extras,
  onExtras,
  proteinTarget = 135,
  kcalTarget = 2350,
}: {
  meals: MealPlan[]
  checks: Record<string, boolean>
  onToggleMeal: (id: string) => void
  /** comma-separated food ids (duplicates allowed), from logs['fuel:extras'] */
  extras: string
  onExtras: (v: string) => void
  proteinTarget?: number
  kcalTarget?: number
}) {
  const extraIds = extras ? extras.split(',').filter(Boolean) : []
  const eaten = meals.filter((m) => checks[`meal:${m.id}`])
  const protein =
    eaten.reduce((s, m) => s + m.protein, 0) +
    extraIds.reduce((s, id) => s + (foodById(id)?.protein ?? 0), 0)
  const kcal =
    eaten.reduce((s, m) => s + m.kcal, 0) +
    extraIds.reduce((s, id) => s + (foodById(id)?.kcal ?? 0), 0)
  const pct = Math.min(100, (protein / proteinTarget) * 100)

  const addExtra = (id: string) => onExtras([...extraIds, id].join(','))
  const removeExtra = (index: number) =>
    onExtras(extraIds.filter((_, i) => i !== index).join(','))

  return (
    <div className="p-fuel">
      <div className="p-fuel-totals">
        <div className="p-fuel-protein tabular">
          <span className="v">{protein}g</span>
          <span className="of"> / {proteinTarget}g protein</span>
        </div>
        <div className="p-fuel-kcal tabular">
          {kcal} / {kcalTarget} kcal
        </div>
      </div>
      <div
        className="p-fuel-bar"
        role="progressbar"
        aria-valuenow={protein}
        aria-valuemax={proteinTarget}
        aria-label="Protein eaten today"
        data-done={protein >= proteinTarget}
      >
        <div className="fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="p-fuel-meals">
        {meals.map((m) => {
          const done = !!checks[`meal:${m.id}`]
          return (
            <button
              key={m.id}
              className="p-fuel-meal"
              data-checked={done}
              onClick={() => onToggleMeal(m.id)}
            >
              <span className="box" aria-hidden>
                <svg viewBox="0 0 16 16">
                  <path d="M2.5 8.5l3.5 3.5 7-8" />
                </svg>
              </span>
              <span className="body">
                <span className="when">{m.when}</span>
                <span className="what">{m.what}</span>
              </span>
              <span className="p tabular">{m.protein}g</span>
            </button>
          )
        })}
      </div>

      <div className="p-fuel-extras">
        <div className="p-fuel-extras-h">Ate something else? One tap:</div>
        <div className="p-fuel-chips">
          {FOOD_LIBRARY.map((f) => (
            <button key={f.id} className="p-fuel-chip press" onClick={() => addExtra(f.id)}>
              {f.name} <span className="g tabular">+{f.protein}g</span>
            </button>
          ))}
        </div>
        {extraIds.length > 0 && (
          <div className="p-fuel-logged">
            {extraIds.map((id, i) => (
              <button
                key={`${id}-${i}`}
                className="p-fuel-logged-item press"
                onClick={() => removeExtra(i)}
                aria-label={`Remove ${foodById(id)?.name ?? id}`}
              >
                {foodById(id)?.name ?? id} <span aria-hidden>×</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
