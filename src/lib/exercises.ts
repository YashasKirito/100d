/** The exercise knowledge base. Every movement that appears on any day page
 *  gets an entry here (and an animated pictogram in
 *  src/components/pictograms/). Day pages open these in the ExerciseSheet. */

export interface ExerciseInfo {
  id: string
  name: string
  muscles: string[]
  /** numbered how-to, in doing order */
  steps: string[]
  /** short form cues to keep in mind mid-set */
  cues: string[]
  mistakes: string[]
  wristNote?: string
}

export const EXERCISES: Record<string, ExerciseInfo> = {
  'incline-pushup': {
    id: 'incline-pushup',
    name: 'Incline Push-up',
    muscles: ['Chest', 'Front delts', 'Triceps'],
    steps: [
      'Grip the two dumbbells placed on a desk/table edge (or grip the edge itself if stable) — this keeps your wrists dead straight.',
      'Walk your feet back until your body is one straight line from head to heels, leaning at roughly 45°.',
      'Lower your chest toward the surface over 2 seconds, elbows tucked about 45° from your body.',
      'Press back up until your arms are straight. That’s one rep.',
    ],
    cues: [
      'Squeeze your glutes and abs — no sagging hips',
      'Wrists stacked in line with forearms the whole time',
      'Chest travels to the hands, not your chin',
    ],
    mistakes: [
      'Hips dropping or piking up — the body line breaks',
      'Elbows flaring straight out at 90°',
      'Half reps — get the chest all the way down',
    ],
    wristNote:
      'The dumbbell-handle grip is the whole point: knuckles forward, wrist neutral. If anything hurts above 2/10, raise the incline (higher surface = easier).',
  },
  'db-ohp': {
    id: 'db-ohp',
    name: 'Overhead Press (Dumbbells, Neutral Grip)',
    muscles: ['Shoulders', 'Triceps', 'Upper chest'],
    steps: [
      'Stand tall, a dumbbell in each hand at shoulder height, palms facing each other.',
      'Brace your abs like someone might poke you, ribs pulled down.',
      'Press both dumbbells straight up until your arms are locked out overhead, biceps near your ears.',
      'Lower under control back to shoulders. That’s one rep.',
    ],
    cues: [
      'Squeeze glutes so your lower back doesn’t arch',
      'Push your head slightly "through the window" at the top',
      'Slow 2-second lowering — that’s where growth lives',
    ],
    mistakes: [
      'Leaning back and turning it into an incline press',
      'Pressing forward instead of straight up',
      'Shrugging shoulders to your ears',
    ],
    wristNote: 'Neutral grip (palms in) keeps the wrist happy. Don’t let the dumbbells tilt back.',
  },
  'lateral-raise': {
    id: 'lateral-raise',
    name: 'Lateral Raise',
    muscles: ['Side delts — the width muscle'],
    steps: [
      'Stand with a dumbbell in each hand at your sides, slight bend in the elbows.',
      'Raise both arms out to the sides, leading with your elbows, until they reach shoulder height.',
      'Pause a beat at the top.',
      'Lower slowly — 3 seconds down. That’s one rep.',
    ],
    cues: [
      'Pour-the-jug: pinkies slightly higher than thumbs at the top',
      'Elbows reach the top first, hands follow',
      'Torso stays still — zero swinging',
    ],
    mistakes: [
      'Swinging the weights up with momentum',
      'Raising above shoulder height and shrugging',
      'Dropping instead of lowering — the way down is half the exercise',
    ],
  },
  squat: {
    id: 'squat',
    name: 'Bodyweight Squat (Slow)',
    muscles: ['Quads', 'Glutes', 'Core'],
    steps: [
      'Feet shoulder-width, toes pointed slightly out. Arms out in front for balance.',
      'Sit back and down over 3 slow seconds — like lowering into a chair behind you.',
      'Go until your thighs are at least parallel to the floor (or as deep as comfortable).',
      'Drive through your whole foot to stand back up. That’s one rep.',
    ],
    cues: [
      'Knees track over your toes — pushed slightly out, never caving in',
      'Chest proud, eyes forward',
      'Heels glued to the floor',
    ],
    mistakes: [
      'Knees collapsing inward',
      'Heels lifting — you’re on your toes',
      'Shallow bouncing reps done fast',
    ],
  },
  plank: {
    id: 'plank',
    name: 'Plank (Forearms)',
    muscles: ['Deep core', 'Shoulders', 'Glutes'],
    steps: [
      'Forearms on the floor, elbows directly under shoulders, hands relaxed.',
      'Step your feet back, body in one straight line from head to heels.',
      'Squeeze glutes, brace abs, breathe normally.',
      'Hold. The set ends when your hips start to sag — not when the timer says so.',
    ],
    cues: [
      'Imagine pulling your elbows toward your toes — full-body tension',
      'Neck neutral: look at the floor, not forward',
      'Breathe — don’t hold your breath',
    ],
    mistakes: [
      'Hips sagging (lower back takes over)',
      'Butt piked high (core stops working)',
      'Holding breath and going red',
    ],
    wristNote: 'Forearm plank means zero wrist load — this one is fully wrist-safe.',
  },
  'wrist-circles': {
    id: 'wrist-circles',
    name: 'Wrist Circles',
    muscles: ['Wrist mobility'],
    steps: [
      'Make loose fists, arms relaxed in front of you.',
      'Roll your fists in slow, full circles — as big a range as is comfortable.',
      '20 seconds one direction, then 20 seconds the other.',
    ],
    cues: ['Slow and smooth — this is oiling the joint, not exercise', 'Explore the edges of the range gently'],
    mistakes: ['Rushing through tiny fast circles', 'Forcing through a pinchy angle'],
  },
  prayer: {
    id: 'prayer',
    name: 'Prayer Stretch',
    muscles: ['Wrist flexors', 'Forearms'],
    steps: [
      'Press your palms together in front of your chest, fingers pointing up — like a namaste.',
      'Keeping palms glued together, slowly lower your hands toward your waist.',
      'Stop when you feel a gentle stretch in your forearms. Hold 20 seconds.',
      'Rest and repeat 3 times.',
    ],
    cues: ['Elbows drift outward as hands lower', 'Mild stretch only — 3/10 intensity, never pain'],
    mistakes: ['Letting the palms peel apart', 'Bouncing or forcing lower for a bigger stretch'],
    wristNote: 'This is rehab for the extension range that push-ups need. Gentle daily beats hard occasionally.',
  },
  'wrist-curls': {
    id: 'wrist-curls',
    name: 'Wrist Curls (Palm Up)',
    muscles: ['Wrist flexors', 'Forearms'],
    steps: [
      'Sit. Rest your right forearm along your thigh, palm up, wrist and hand hanging past the knee.',
      'Hold the 5kg dumbbell. Let your wrist bend down slowly as far as comfortable.',
      'Curl the wrist up as high as it goes. Only the wrist moves.',
      '2 sets of 15 each hand.',
    ],
    cues: ['Forearm stays glued to the thigh', 'Full range, slow tempo — 2s down'],
    mistakes: ['Lifting the forearm off the thigh to cheat', 'Gripping so hard your forearm cramps before the set ends'],
  },
  'rev-curls': {
    id: 'rev-curls',
    name: 'Reverse Wrist Curls (Palm Down)',
    muscles: ['Wrist extensors — the injured side’s support crew'],
    steps: [
      'Same setup as wrist curls, but palm facing DOWN, wrist hanging past the knee.',
      'Let the wrist drop slowly, then raise the back of your hand up as far as comfortable.',
      '2 sets of 12. If 5kg is too heavy (common), hold the dumbbell by its head, or use a filled water bottle.',
    ],
    cues: ['Slow, controlled, small range is fine at first', 'This one directly strengthens the painful direction — be patient with it'],
    mistakes: ['Using a weight that forces jerky reps', 'Pushing into pain — 2/10 max, always'],
    wristNote: 'The most important five minutes of your rehab. Weak extensors are usually why push-ups hurt.',
  },
  'chin-tucks': {
    id: 'chin-tucks',
    name: 'Chin Tucks',
    muscles: ['Deep neck flexors', 'Posture'],
    steps: [
      'Sit or stand tall, eyes level.',
      'Glide your head straight BACK — like making a double chin. Don’t tilt up or down.',
      'Hold 2 seconds, feeling the back of your neck lengthen.',
      'Release. 10 reps.',
    ],
    cues: ['Imagine a string pulling the crown of your head up', 'Backward glide, not a nod'],
    mistakes: ['Tilting the chin down instead of gliding back', 'Jutting forward again between reps'],
  },
  'pec-stretch': {
    id: 'pec-stretch',
    name: 'Doorway Pec Stretch',
    muscles: ['Chest', 'Front delts — the rounded-shoulder culprits'],
    steps: [
      'Stand in a doorway. Place your forearm on the frame, elbow at shoulder height bent 90°.',
      'Step that same-side foot forward through the door.',
      'Lean your body gently forward until you feel the stretch across your chest.',
      'Hold 45 seconds. Switch sides.',
    ],
    cues: ['Shoulder stays down and back — don’t shrug into it', 'Breathe slow; sink slightly deeper on each exhale'],
    mistakes: ['Elbow too low (stretches the wrong fibers)', 'Twisting the spine instead of leaning the whole body'],
  },
  'thoracic-ext': {
    id: 'thoracic-ext',
    name: 'Thoracic Extension (Over Chair Back)',
    muscles: ['Mid-back mobility', 'Posture'],
    steps: [
      'Sit in a chair whose backrest ends at your mid-back (most office chairs work).',
      'Interlace your fingers behind your head, elbows wide.',
      'Arch your upper back over the top edge of the backrest — chest to the ceiling.',
      'Hold 2–3 seconds at the top, return. Repeat gently for 60 seconds.',
    ],
    cues: [
      'The bend happens over the chair edge, in your MID-back — not your lower back',
      'Exhale as you arch back',
      'Move a little further each rep, never forcing',
    ],
    mistakes: [
      'Arching the lower back instead of the stiff upper back',
      'Holding your breath',
      'Bouncing hard against the chair edge',
    ],
  },
  'wall-angels': {
    id: 'wall-angels',
    name: 'Wall Angels',
    muscles: ['Upper back', 'Rear delts', 'Shoulder mobility'],
    steps: [
      'Stand with your back flat against a wall, feet a few inches out.',
      'Press your lower back, upper back, and head against the wall.',
      'Raise your arms to a goalpost "W", backs of hands touching the wall.',
      'Slide your arms slowly up the wall toward a "Y", keeping everything in contact.',
      'Slide back down to the W. That’s one rep — 8 slow ones.',
    ],
    cues: ['The game: hands and elbows never leave the wall', 'Ribs stay down — don’t arch your lower back to cheat'],
    mistakes: ['Arching the back as arms go up', 'Rushing — each rep should take ~5 seconds'],
  },
}
