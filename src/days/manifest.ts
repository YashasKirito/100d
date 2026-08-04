/** Every day module exports a `manifest` describing its completable items.
 *  The frozen-day summary view renders from this — in that day's own theme. */
export interface DayManifest {
  day: number
  title: string
  /** the day page's root theme class (e.g. 'd1') — the summary wraps itself
   *  in this so it inherits the day's colors, fonts, and mood */
  themeClass: string
  sections: {
    title: string
    items: { key: string; label: string }[]
  }[]
}
