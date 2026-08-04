import type { ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'
import './pictograms.css'

/** Animated exercise pictograms. Hand-authored SVG stick figures whose joint
 *  coordinates tween between poses via SMIL. All strokes use currentColor so
 *  each day page's accent colors them. Reduced motion → frozen first pose. */

const EASE = { calcMode: 'spline', keyTimes: '0;0.5;1', keySplines: '0.45 0 0.55 1;0.45 0 0.55 1' }

interface AProps {
  at: string
  v: (number | string)[]
  dur?: string
  linear?: boolean
}

let animate = true

function A({ at, v, dur = '2.4s', linear }: AProps) {
  if (!animate) return null
  const keyTimes = v.length === 3 ? EASE.keyTimes : v.map((_, i) => (i / (v.length - 1)).toFixed(3)).join(';')
  return (
    <animate
      attributeName={at}
      values={v.join(';')}
      dur={dur}
      repeatCount="indefinite"
      calcMode={linear ? 'linear' : 'spline'}
      keyTimes={keyTimes}
      keySplines={linear ? undefined : Array(v.length - 1).fill('0.45 0 0.55 1').join(';')}
    />
  )
}

function Svg({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 200 140" className="pict" role="img" aria-label={`Animation: ${label}`}>
      {children}
    </svg>
  )
}

const Ground = () => <line x1="14" y1="126" x2="186" y2="126" className="faint" />

function Squat() {
  return (
    <Svg label="bodyweight squat">
      <Ground />
      <line x1="95" y1="126" x2="78" y2="126" />
      {/* shin */}
      <line x1="95" y1="126" x2="95" y2="92">
        <A at="x2" v={[95, 82, 95]} />
        <A at="y2" v={[92, 96, 92]} />
      </line>
      {/* thigh */}
      <line x1="95" y1="92" x2="97" y2="58">
        <A at="x1" v={[95, 82, 95]} />
        <A at="y1" v={[92, 96, 92]} />
        <A at="x2" v={[97, 104, 97]} />
        <A at="y2" v={[58, 84, 58]} />
      </line>
      {/* torso */}
      <line x1="97" y1="58" x2="101" y2="22">
        <A at="x1" v={[97, 104, 97]} />
        <A at="y1" v={[58, 84, 58]} />
        <A at="x2" v={[101, 88, 101]} />
        <A at="y2" v={[22, 52, 22]} />
      </line>
      <circle cx="102" cy="13" r="8">
        <A at="cx" v={[102, 86, 102]} />
        <A at="cy" v={[13, 43, 13]} />
      </circle>
      {/* arm reaching forward for balance */}
      <line x1="100" y1="34" x2="126" y2="40">
        <A at="x1" v={[100, 90, 100]} />
        <A at="y1" v={[34, 60, 34]} />
        <A at="x2" v={[126, 122, 126]} />
        <A at="y2" v={[40, 56, 40]} />
      </line>
    </Svg>
  )
}

function InclinePushup() {
  return (
    <Svg label="incline push-up on a raised surface">
      <Ground />
      {/* the desk/box */}
      <rect x="24" y="80" width="36" height="46" rx="4" className="faint" />
      {/* body: feet anchored, straight line to shoulder */}
      <line x1="168" y1="126" x2="86" y2="58">
        <A at="x2" v={[86, 74, 86]} />
        <A at="y2" v={[58, 74, 58]} />
      </line>
      <circle cx="76" cy="50" r="8">
        <A at="cx" v={[76, 63, 76]} />
        <A at="cy" v={[50, 68, 50]} />
      </circle>
      {/* upper arm shoulder→elbow */}
      <line x1="86" y1="58" x2="70" y2="68">
        <A at="x1" v={[86, 74, 86]} />
        <A at="y1" v={[58, 74, 58]} />
        <A at="x2" v={[70, 84, 70]} />
        <A at="y2" v={[68, 86, 68]} />
      </line>
      {/* forearm elbow→hand (hand stays on the box) */}
      <line x1="70" y1="68" x2="56" y2="80">
        <A at="x1" v={[70, 84, 70]} />
        <A at="y1" v={[68, 86, 68]} />
      </line>
    </Svg>
  )
}

function FrontBase() {
  return (
    <>
      <Ground />
      <line x1="100" y1="64" x2="100" y2="108" />
      <circle cx="100" cy="50" r="9" />
      <line x1="100" y1="108" x2="88" y2="126" />
      <line x1="100" y1="108" x2="112" y2="126" />
    </>
  )
}

function DbOhp() {
  return (
    <Svg label="overhead press with dumbbells">
      <FrontBase />
      {/* left arm */}
      <line x1="100" y1="68" x2="80" y2="78">
        <A at="x2" v={[80, 88, 80]} />
        <A at="y2" v={[78, 44, 78]} />
      </line>
      <line x1="80" y1="78" x2="78" y2="58">
        <A at="x1" v={[80, 88, 80]} />
        <A at="y1" v={[78, 44, 78]} />
        <A at="x2" v={[78, 90, 78]} />
        <A at="y2" v={[58, 26, 58]} />
      </line>
      <rect x="71" y="50" width="14" height="8" rx="2" className="db">
        <A at="x" v={[71, 83, 71]} />
        <A at="y" v={[50, 18, 50]} />
      </rect>
      {/* right arm */}
      <line x1="100" y1="68" x2="120" y2="78">
        <A at="x2" v={[120, 112, 120]} />
        <A at="y2" v={[78, 44, 78]} />
      </line>
      <line x1="120" y1="78" x2="122" y2="58">
        <A at="x1" v={[120, 112, 120]} />
        <A at="y1" v={[78, 44, 78]} />
        <A at="x2" v={[122, 110, 122]} />
        <A at="y2" v={[58, 26, 58]} />
      </line>
      <rect x="115" y="50" width="14" height="8" rx="2" className="db">
        <A at="x" v={[115, 103, 115]} />
        <A at="y" v={[50, 18, 50]} />
      </rect>
    </Svg>
  )
}

function LateralRaise() {
  return (
    <Svg label="lateral raise with dumbbells">
      <FrontBase />
      <line x1="100" y1="68" x2="86" y2="106">
        <A at="x2" v={[86, 56, 86]} />
        <A at="y2" v={[106, 68, 106]} />
      </line>
      <rect x="79" y="102" width="14" height="8" rx="2" className="db">
        <A at="x" v={[79, 49, 79]} />
        <A at="y" v={[102, 64, 102]} />
      </rect>
      <line x1="100" y1="68" x2="114" y2="106">
        <A at="x2" v={[114, 144, 114]} />
        <A at="y2" v={[106, 68, 106]} />
      </line>
      <rect x="107" y="102" width="14" height="8" rx="2" className="db">
        <A at="x" v={[107, 137, 107]} />
        <A at="y" v={[102, 64, 102]} />
      </rect>
    </Svg>
  )
}

function Plank() {
  return (
    <Svg label="forearm plank hold">
      <Ground />
      <g>
        {animate && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0;0 2.5;0 0"
            dur="3s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
          />
        )}
        <line x1="46" y1="126" x2="72" y2="126" />
        <line x1="66" y1="126" x2="72" y2="100" />
        <line x1="72" y1="100" x2="164" y2="122" />
        <circle cx="61" cy="93" r="8" />
      </g>
    </Svg>
  )
}

function WristCircles() {
  return (
    <Svg label="wrist circles">
      <line x1="46" y1="86" x2="118" y2="82" />
      <circle cx="118" cy="82" r="16" className="faint dashed" />
      <circle cx="132" cy="82" r="8">
        <A at="cx" v={[132, 128, 118, 108, 104, 108, 118, 128, 132]} dur="2.6s" linear />
        <A at="cy" v={[82, 93, 98, 93, 82, 71, 66, 71, 82]} dur="2.6s" linear />
      </circle>
    </Svg>
  )
}

function Prayer() {
  return (
    <Svg label="prayer stretch, palms together lowering">
      <line x1="66" y1="118" x2="90" y2="86">
        <A at="x2" v={[90, 88, 90]} />
        <A at="y2" v={[86, 96, 86]} />
      </line>
      <line x1="134" y1="118" x2="110" y2="86">
        <A at="x2" v={[110, 112, 110]} />
        <A at="y2" v={[86, 96, 86]} />
      </line>
      <g>
        {animate && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0;0 11;0 0"
            dur="2.4s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
          />
        )}
        <rect x="88" y="52" width="9" height="32" rx="4.5" />
        <rect x="103" y="52" width="9" height="32" rx="4.5" />
      </g>
    </Svg>
  )
}

function WristCurl({ reverse }: { reverse?: boolean }) {
  // palm-up curls lift the weight above the hand line; palm-down below
  const hand = reverse ? { down: [138, 102], up: [136, 78] } : { down: [138, 104], up: [134, 76] }
  return (
    <Svg label={reverse ? 'reverse wrist curl, palm down' : 'wrist curl, palm up'}>
      <g transform="translate(0 -18)">
        {/* thigh the forearm rests on */}
        <line x1="36" y1="106" x2="150" y2="102" className="faint" />
        <line x1="58" y1="98" x2="122" y2="92" />
        <line x1="122" y1="92" x2={hand.down[0]} y2={hand.down[1]}>
          <A at="x2" v={[hand.down[0], hand.up[0], hand.down[0]]} />
          <A at="y2" v={[hand.down[1], hand.up[1], hand.down[1]]} />
        </line>
        <circle cx={hand.down[0]} cy={hand.down[1]} r="7" className="db-fill">
          <A at="cx" v={[hand.down[0], hand.up[0], hand.down[0]]} />
          <A at="cy" v={[hand.down[1], hand.up[1], hand.down[1]]} />
        </circle>
      </g>
    </Svg>
  )
}

function ChinTucks() {
  return (
    <Svg label="chin tuck, head gliding straight back">
      <line x1="88" y1="72" x2="88" y2="124" />
      <line x1="88" y1="124" x2="130" y2="124" className="faint" />
      {/* neck */}
      <line x1="88" y1="74" x2="100" y2="62">
        <A at="x2" v={[100, 88, 100]} />
      </line>
      <circle cx="104" cy="52" r="10">
        <A at="cx" v={[104, 92, 104]} />
      </circle>
      {/* nose */}
      <line x1="113" y1="50" x2="119" y2="51">
        <A at="x1" v={[113, 101, 113]} />
        <A at="x2" v={[119, 107, 119]} />
      </line>
      {/* direction hint */}
      <line x1="138" y1="28" x2="118" y2="28" className="faint dashed" />
      <path d="M124 22 L116 28 L124 34" className="faint" fill="none" />
    </Svg>
  )
}

function PecStretch() {
  return (
    <Svg label="doorway pec stretch">
      <Ground />
      {/* door frame */}
      <line x1="74" y1="16" x2="74" y2="126" className="faint" />
      <line x1="142" y1="16" x2="142" y2="126" className="faint" />
      {/* forearm up the frame, elbow at shoulder height */}
      <line x1="74" y1="34" x2="74" y2="56" />
      <line x1="74" y1="56" x2="100" y2="60">
        <A at="x2" v={[100, 96, 100]} />
      </line>
      {/* body leaning through the door */}
      <line x1="100" y1="60" x2="104" y2="118">
        <A at="x1" v={[100, 96, 100]} />
      </line>
      <circle cx="98" cy="46" r="8">
        <A at="cx" v={[98, 93, 98]} />
      </circle>
      <line x1="104" y1="118" x2="92" y2="126" />
      <line x1="104" y1="118" x2="118" y2="126" />
    </Svg>
  )
}

function WallAngels() {
  return (
    <Svg label="wall angels, arms sliding from W to Y">
      <FrontBase />
      {/* left arm: W → Y */}
      <line x1="100" y1="70" x2="78" y2="80">
        <A at="x2" v={[78, 84, 78]} />
        <A at="y2" v={[80, 48, 80]} />
      </line>
      <line x1="78" y1="80" x2="72" y2="58">
        <A at="x1" v={[78, 84, 78]} />
        <A at="y1" v={[80, 48, 80]} />
        <A at="x2" v={[72, 74, 72]} />
        <A at="y2" v={[58, 28, 58]} />
      </line>
      {/* right arm */}
      <line x1="100" y1="70" x2="122" y2="80">
        <A at="x2" v={[122, 116, 122]} />
        <A at="y2" v={[80, 48, 80]} />
      </line>
      <line x1="122" y1="80" x2="128" y2="58">
        <A at="x1" v={[122, 116, 122]} />
        <A at="y1" v={[80, 48, 80]} />
        <A at="x2" v={[128, 126, 128]} />
        <A at="y2" v={[58, 28, 58]} />
      </line>
    </Svg>
  )
}

function ThoracicExt() {
  return (
    <Svg label="thoracic extension arching over a chair back">
      <Ground />
      {/* chair: seat + backrest */}
      <line x1="76" y1="92" x2="120" y2="92" className="faint" />
      <line x1="80" y1="92" x2="80" y2="60" className="faint" />
      <line x1="84" y1="92" x2="84" y2="126" className="faint" />
      <line x1="114" y1="92" x2="114" y2="126" className="faint" />
      {/* thighs + shins seated */}
      <line x1="104" y1="90" x2="138" y2="94" />
      <line x1="138" y1="94" x2="138" y2="126" />
      {/* torso arching back over the backrest edge */}
      <line x1="104" y1="90" x2="94" y2="52">
        <A at="x2" v={[94, 76, 94]} dur="3s" />
        <A at="y2" v={[52, 58, 52]} dur="3s" />
      </line>
      <circle cx="92" cy="42" r="8">
        <A at="cx" v={[92, 66, 92]} dur="3s" />
        <A at="cy" v={[42, 54, 42]} dur="3s" />
      </circle>
      {/* elbows-wide arms hinted as a short line at the head */}
      <line x1="98" y1="46" x2="108" y2="38">
        <A at="x1" v={[98, 72, 98]} dur="3s" />
        <A at="y1" v={[46, 60, 46]} dur="3s" />
        <A at="x2" v={[108, 84, 108]} dur="3s" />
        <A at="y2" v={[38, 46, 38]} dur="3s" />
      </line>
    </Svg>
  )
}

const PICTOGRAMS: Record<string, () => ReactNode> = {
  'thoracic-ext': ThoracicExt,
  squat: Squat,
  'incline-pushup': InclinePushup,
  'db-ohp': DbOhp,
  'lateral-raise': LateralRaise,
  plank: Plank,
  'wrist-circles': WristCircles,
  prayer: Prayer,
  'wrist-curls': () => <WristCurl />,
  'rev-curls': () => <WristCurl reverse />,
  'chin-tucks': ChinTucks,
  'pec-stretch': PecStretch,
  'wall-angels': WallAngels,
}

export function Pictogram({ id }: { id: string }) {
  const reduced = useReducedMotion()
  animate = !reduced
  const Component = PICTOGRAMS[id]
  return Component ? <>{Component()}</> : null
}
