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
  'floor-press': {
    id: 'floor-press',
    name: 'Floor Press (5kg Dumbbells, Neutral Grip)',
    muscles: ['Chest', 'Triceps', 'Front delts'],
    steps: [
      'Lie on your back, knees bent, feet flat. A dumbbell in each hand, palms facing each other.',
      'Start with upper arms resting on the floor, elbows about 45° from your body, forearms pointing at the ceiling.',
      'Press both dumbbells up until your arms are straight above your chest.',
      'Lower slowly until the backs of your upper arms touch the floor. Pause there one beat — no bounce. That’s one rep.',
    ],
    cues: [
      'The floor is the feature: it stops the range right where a cranky shoulder stays happy',
      'Wrists stacked straight over elbows the whole way',
      'Press over your chest, not over your face',
    ],
    mistakes: [
      'Bouncing the elbows off the floor for momentum',
      'Elbows flaring straight out at 90°',
      'Arching the lower back off the floor',
    ],
    wristNote: 'Neutral grip, wrist dead straight under the load — this is the wrist-safest press there is.',
  },
  'oh-triceps': {
    id: 'oh-triceps',
    name: 'Overhead Triceps Extension (Single 5kg, Both Hands)',
    muscles: ['Triceps — the arm-size majority'],
    steps: [
      'Stand tall. Cup the top head of one dumbbell with both palms, like holding a cup upside down.',
      'Take it overhead, arms straight, biceps near your ears.',
      'Bend only the elbows to lower the dumbbell behind your head — slow, 2 seconds.',
      'Extend back up to straight. Elbows stay pointing forward the whole time. That’s one rep.',
    ],
    cues: [
      'Upper arms frozen, elbows close to your ears — only the forearms move',
      'Ribs down, glutes squeezed so the lower back doesn’t arch',
      'Left shoulder pinching above 2/10 just getting it overhead? Lie down and do the same elbow-bend as a floor skull-crusher — same triceps, zero overhead.',
    ],
    mistakes: [
      'Elbows drifting wide like wings',
      'Turning it into a press by moving the upper arms',
      'Dropping the weight fast behind the head',
    ],
    wristNote: 'The weight rests in your palms with wrists neutral — grip the plate head, not the handle, if that feels straighter.',
  },
  curls: {
    id: 'curls',
    name: 'Dumbbell Curls (5kg)',
    muscles: ['Biceps', 'Forearms'],
    steps: [
      'Stand tall, a dumbbell in each hand at your sides, palms facing forward.',
      'Curl both dumbbells up toward your shoulders — upper arms pinned to your sides.',
      'Squeeze at the top for a beat.',
      'Lower over 3 slow seconds. That’s one rep — the way down builds as much as the way up.',
    ],
    cues: [
      'Elbows glued to your ribs — they don’t travel forward',
      'Wrist locked dead straight; the forearm is a rigid lever',
      'Torso still: if you’re rocking, the biceps aren’t working',
    ],
    mistakes: [
      'Swinging the hips to throw the weight up',
      'Curling the wrist at the top (your wrist will complain)',
      'Letting the dumbbells free-fall down',
    ],
    wristNote: 'Keep the wrist straight as a ruler. If it wants to bend late in a set, switch to hammer grip (palms facing in) — the wrist-safest curl.',
  },
  'band-ohp': {
    id: 'band-ohp',
    name: 'Band Overhead Press (Yellow Band)',
    muscles: ['Shoulders', 'Triceps'],
    steps: [
      'Stand on the middle of the yellow band, feet hip-width.',
      'Hold an end in each hand at shoulder height, palms facing each other.',
      'Press both hands straight up until your arms are locked out overhead.',
      'Lower under control — the band pulls faster than gravity, don’t let it win. That’s one rep.',
    ],
    cues: [
      'This is the overhead press coming back from suspension — yellow band only, light on purpose',
      'The band gets heavier as you go up, so the bottom is easy and the lockout is the work',
      'Ribs down, glutes tight, wrists neutral',
    ],
    mistakes: [
      'Grading yourself on effort — today is pattern rehearsal, not load',
      'Arching the lower back at lockout',
      'Any left-shoulder pinch above 2/10 and the set is over — write the number down',
    ],
    wristNote: 'Neutral grip on the band, wrist straight — the band wants to fold your wrist back at the top; don’t let it.',
  },
  'pike-pushup': {
    id: 'pike-pushup',
    name: 'Pike Push-up (Rung 1: Knees Bent, Small Range)',
    muscles: ['Shoulders', 'Upper chest', 'Triceps'],
    steps: [
      'Hands on the dumbbell handles on the floor, then walk your feet toward your hands until your hips point at the ceiling — an upside-down V.',
      'Rung 1: keep your knees bent and the range small. This is a technique rehearsal, not a max effort.',
      'Bend your elbows and lower the top of your head toward the space between your hands — 2 seconds down.',
      'Press back up. Weight stays over your shoulders, not your feet.',
    ],
    cues: [
      'Hips stay high the whole set — the higher the hips, the more shoulder it is',
      'Head travels to the floor in FRONT of your hands, not between your arms',
      'This is the overhead-press pattern with the floor as spotter — treat it with the same shoulder rule',
    ],
    mistakes: [
      'Letting it become a normal push-up (hips dropping)',
      'Flaring the elbows straight out',
      'Pushing through a shoulder pinch — above 2/10, stop the set and tell the notes',
    ],
    wristNote:
      'On the handles, always. This loads the wrist more vertically than a push-up — if it complains above 2/10, raise the hands onto a low step and shorten the range.',
  },
  'goblet-squat': {
    id: 'goblet-squat',
    name: 'Goblet Squat (5kg)',
    muscles: ['Quads', 'Glutes', 'Core'],
    steps: [
      'Hold one dumbbell vertically against your chest, both palms cupping the top head — like holding a goblet.',
      'Feet shoulder-width, toes slightly out.',
      'Sit down between your heels over 3 seconds, elbows tracking inside your knees.',
      'Drive up through the whole foot. The dumbbell never leaves your chest.',
    ],
    cues: [
      'The weight is a counterbalance — it lets you sit deeper and more upright than a bodyweight squat',
      'Chest proud, elbows down',
      'Knees pushed out over the toes',
    ],
    mistakes: [
      'Holding the dumbbell away from the chest (turns it into an arm exercise)',
      'Heels lifting',
      'Cutting depth — this variant exists to let you go deeper',
    ],
    wristNote: 'Cupping the head keeps the wrists neutral and stacked — no extension load.',
  },
  'scap-pulls': {
    id: 'scap-pulls',
    name: 'Scapular Pulls (Doorway Bar)',
    muscles: ['Lower traps', 'Lats — the pull-up starter muscles'],
    steps: [
      'Hang from the bar exactly like a dead hang — straight arms, thumbs wrapped.',
      'Without bending your elbows AT ALL, pull your shoulder blades down and back — your body rises a few centimetres.',
      'Hold the top for 1–2 seconds. Your neck should feel longer, ears away from shoulders.',
      'Release slowly back into the full hang. That’s one rep.',
    ],
    cues: [
      'The movement is tiny and lives entirely in the shoulder blades',
      'Think "put your shoulder blades in your back pockets"',
      'If your elbows bend, you’re doing a pull-up — too soon, go smaller',
    ],
    mistakes: [
      'Bending the arms to fake height',
      'Kipping or swinging for momentum',
      'Rushing the release — the lower is half the rep',
    ],
    wristNote: 'Same neutral hanging load as the dead hang — wrist-friendly by design.',
  },
  'dead-hang': {
    id: 'dead-hang',
    name: 'Dead Hang (Doorway Bar)',
    muscles: ['Lats', 'Grip/forearms', 'Shoulders'],
    steps: [
      'Before your first ever hang: mount the bar per the instructions, then test it — hang with both feet still on the floor and bounce gently. Only trust it with full weight after that.',
      'Grip the bar overhand, hands shoulder-width, thumbs wrapped.',
      'Lift your feet and hang with straight arms. Shoulders can shrug up by your ears — that’s allowed on day one.',
      'Hang until your grip starts to fail, land soft on both feet. Log the seconds.',
    ],
    cues: [
      'Breathe — hanging while holding your breath halves the time',
      'Body quiet, no swinging',
      'Later progression: pull shoulder blades down away from the ears — that’s the scapular pull, the next rung',
    ],
    mistakes: [
      'Skipping the feet-on-floor safety test on a fresh mount',
      'Thumbless grip (the bar can spit your hands off)',
      'Dropping from the bar instead of landing soft',
    ],
    wristNote: 'Hangs load the wrist in neutral — generally the friendliest grip work there is, and quietly the best forearm builder in the program.',
  },
  'band-row': {
    id: 'band-row',
    name: 'Band Row (Seated, Red Band)',
    muscles: ['Lats', 'Mid-back', 'Biceps'],
    steps: [
      'Sit on the floor, legs out in front, knees soft. Loop the red band around both feet (mid-foot).',
      'Hold the band ends, arms extended, back tall — think proud chest.',
      'Pull your elbows back past your ribs, squeezing the shoulder blades together.',
      'Pause one beat at the back, then let the band pull you forward slowly. That’s one rep.',
    ],
    cues: [
      'Shoulder blades start the pull, hands just hold on',
      'Elbows brush your ribs — not chicken-winging out wide',
      'Sit tall the whole set; a slumped row trains nothing',
    ],
    mistakes: [
      'Leaning way back to fake the pull with bodyweight',
      'Shrugging shoulders to the ears',
      'Letting the band snap forward on the release',
    ],
    wristNote: 'Keep the wrist straight, band across the palm. Grip fatigue is expected — it’s a feature.',
  },
  'db-row': {
    id: 'db-row',
    name: 'Single-Arm Row (5kg, Slow Tempo)',
    muscles: ['Lats', 'Mid-back', 'Biceps'],
    steps: [
      'Left hand and left knee on a bed/sofa/sturdy chair, right foot on the floor. Back flat like a table.',
      'Dumbbell in the right hand, arm hanging straight down.',
      'Row the dumbbell to your hip over 3 seconds — elbow tracing your ribs.',
      'Pause 1 second at the top, lower over 3 seconds. That’s the 3-1-3 tempo. Swap sides each set.',
    ],
    cues: [
      'Pull to the hip, not the armpit — the lat lives low',
      'The 3-1-3 tempo is the load: 5kg moved slowly is heavy',
      'Back stays flat — no twisting to hoist the weight',
    ],
    mistakes: [
      'Fast reps (5kg fast is a warm-up, 5kg slow is training)',
      'Rounding the back',
      'Shrugging instead of rowing',
    ],
    wristNote: 'Neutral grip, wrist locked straight — fully wrist-safe.',
  },
  'face-pulls': {
    id: 'face-pulls',
    name: 'Band Face Pull (Yellow Band)',
    muscles: ['Rear delts', 'Rotator cuff', 'Mid-traps — the shoulder medicine'],
    steps: [
      'Anchor the yellow band at face height — around a door hinge, window grill, or the mounted pull-up bar.',
      'Hold the band with both hands, arms extended, palms facing each other. Step back until it’s taut.',
      'Pull the band toward your face, elbows high and wide, until your hands reach your ears.',
      'At the back, rotate your knuckles toward the ceiling — like flexing in a mirror. Return slowly.',
    ],
    cues: [
      'Elbows travel high and WIDE — this is the opposite of a row',
      'The end position is a "double biceps" pose — that rotation is the rotator-cuff gold',
      'Light band, strict reps: if you’re straining, you’re cheating it',
    ],
    mistakes: [
      'Pulling to the chest with elbows down (that’s a row, not a face pull)',
      'Using a band so heavy the shoulders shrug',
      'Rushing — each rep should take ~3 seconds',
    ],
    wristNote: 'This movement is the direct treatment for your left-shoulder pinch: it strengthens exactly the muscles that keep the joint seated when you press. Never skip it on a pull or posture day.',
  },
  'dead-bug': {
    id: 'dead-bug',
    name: 'Dead Bug',
    muscles: ['Deep core', 'The flat-stomach wall'],
    steps: [
      'Lie on your back. Arms straight up at the ceiling, knees bent 90° over your hips.',
      'Press your lower back into the floor — this contact never breaks.',
      'Slowly lower your right arm overhead AND extend your left leg toward the floor, together.',
      'Stop just above the floor, return, switch sides. That’s one rep per side.',
    ],
    cues: [
      'The whole exercise is the lower back staying glued down',
      'Exhale as the limbs go away from you',
      'Slow is the point — 3 seconds out, 3 back',
    ],
    mistakes: [
      'Lower back arching off the floor (shorten the range instead)',
      'Both limbs on the same side moving (it’s always opposites)',
      'Racing through reps',
    ],
  },
  'pull-aparts': {
    id: 'pull-aparts',
    name: 'Band Pull-Apart (Yellow Band)',
    muscles: ['Rear delts', 'Upper back', 'Posture'],
    steps: [
      'Hold the yellow band in front of you at shoulder height, hands shoulder-width, arms straight.',
      'Pull your hands apart until the band touches your chest — arms out wide like a T.',
      'Squeeze the shoulder blades together for a beat.',
      'Return slowly, keeping tension. That’s one rep.',
    ],
    cues: [
      'Straight arms the whole way — bending turns it into a row',
      'Ribs down, no lower-back arch',
      'Courier late? Towel version: pull a taut towel apart isometrically, 10s × 8',
    ],
    mistakes: [
      'Shrugging as the band comes apart',
      'Cutting the range short of the chest',
      'Letting the band snap back',
    ],
  },
  'thoracic-floor': {
    id: 'thoracic-floor',
    name: 'Thoracic Extension (Floor, Over a Rolled Towel)',
    muscles: ['Mid-back mobility', 'Posture'],
    steps: [
      'Roll a bath towel or thin blanket into a tight roll about 10cm thick.',
      'Lie on the floor with the roll horizontal under your mid-back — right at the bottom of your shoulder blades.',
      'Support your head lightly with your hands, elbows toward the ceiling, knees bent.',
      'Exhale and gently arch your upper back over the roll — small arcs, 2–3s each. Keep going for 60 seconds, shifting the roll up or down a notch as it eases.',
    ],
    cues: [
      'The bend happens exactly where the roll is — your stiff mid-back, not your lower back',
      'Ribs stay down; this is an unfurl, not a backbend',
      'Exhale into every extension — the mid-back releases on the breath out',
    ],
    mistakes: [
      'Roll placed under the lower back (arching the already-mobile bit)',
      'Lifting the hips to fake a bigger arch',
      'Holding your breath and forcing range',
    ],
  },
}
