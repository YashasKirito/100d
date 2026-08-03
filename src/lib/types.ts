/** Progress for a single day. Keys in `checks`/`logs` are free-form but conventionally namespaced:
 *  checks: "exercise:pike-pushup", "habit:sleep", "rehab:wrist", "posture", "meal:breakfast"
 *  logs:   "reps:pike-pushup" -> "10,9,8", "weight:goblet-squat" -> "5kg"
 */
export interface DayProgress {
  checks: Record<string, boolean>
  logs: Record<string, string>
  water: number
  notes: string
  updatedAt: number
}

export interface Measurement {
  day: number
  date: string
  weightKg?: number
  waistCm?: number
  chestCm?: number
  shouldersCm?: number
  leftArmCm?: number
  rightArmCm?: number
  photosTaken?: boolean
  notes?: string
  updatedAt: number
}

export interface Profile {
  /** YYYY-MM-DD of challenge Day 1 */
  startDate: string
  updatedAt: number
}

export const emptyDay = (): DayProgress => ({
  checks: {},
  logs: {},
  water: 0,
  notes: '',
  updatedAt: 0,
})
