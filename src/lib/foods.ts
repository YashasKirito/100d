/** Personal food library for the Fuel tracker. Not a food database — just the
 *  staples Yashas actually eats, so logging an extra is one tap. Protein/kcal
 *  are honest household-portion estimates; precision theatre helps nobody. */

export interface Food {
  id: string
  name: string
  protein: number
  kcal: number
}

export const FOOD_LIBRARY: Food[] = [
  { id: 'egg', name: 'Egg', protein: 6, kcal: 78 },
  { id: 'shake', name: 'SuperYou shake', protein: 25, kcal: 180 },
  { id: 'curd', name: 'Curd 200g', protein: 7, kcal: 120 },
  { id: 'milk', name: 'Milk 250ml', protein: 8, kcal: 150 },
  { id: 'paneer', name: 'Paneer 150g', protein: 27, kcal: 390 },
  { id: 'soya', name: 'Soya curry (40g dry)', protein: 20, kcal: 180 },
  { id: 'chicken', name: 'Chicken curry 150g', protein: 33, kcal: 270 },
  { id: 'sprouts', name: 'Baked sprouts 200g', protein: 18, kcal: 220 },
  { id: 'mudde', name: 'Ragi mudde ×1', protein: 7, kcal: 340 },
  { id: 'rice-sambar', name: 'Rice + sambar plate', protein: 10, kcal: 450 },
  { id: 'dal', name: 'Dal bowl / bisi bele bath', protein: 9, kcal: 260 },
  { id: 'peanuts', name: 'Peanuts 30g', protein: 8, kcal: 170 },
]

export const foodById = (id: string) => FOOD_LIBRARY.find((f) => f.id === id)
