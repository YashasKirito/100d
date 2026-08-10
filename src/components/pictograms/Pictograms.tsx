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

function FloorPress() {
  return (
    <Svg label="floor press, dumbbells pressed up from the floor">
      <Ground />
      {/* body lying: head, torso, bent legs */}
      <circle cx="42" cy="118" r="8" />
      <line x1="52" y1="118" x2="110" y2="118" />
      <line x1="110" y1="118" x2="130" y2="94" />
      <line x1="130" y1="94" x2="144" y2="126" />
      {/* arm: shoulder → elbow (floor at bottom, vertical at top) */}
      <line x1="62" y1="116" x2="86" y2="118">
        <A at="x2" v={[86, 64, 86]} />
        <A at="y2" v={[118, 96, 118]} />
      </line>
      {/* forearm elbow → hand */}
      <line x1="86" y1="118" x2="86" y2="96">
        <A at="x1" v={[86, 64, 86]} />
        <A at="y1" v={[118, 96, 118]} />
        <A at="x2" v={[86, 64, 86]} />
        <A at="y2" v={[96, 74, 96]} />
      </line>
      <rect x="79" y="88" width="14" height="8" rx="2" className="db">
        <A at="x" v={[79, 57, 79]} />
        <A at="y" v={[88, 66, 88]} />
      </rect>
    </Svg>
  )
}

function OhTriceps() {
  return (
    <Svg label="overhead triceps extension, dumbbell lowered behind the head">
      <FrontBase />
      {/* upper arms fixed overhead, biceps by the ears */}
      <line x1="100" y1="68" x2="90" y2="44" />
      <line x1="100" y1="68" x2="110" y2="44" />
      {/* forearms hinge: hands meet on the dumbbell */}
      <line x1="90" y1="44" x2="96" y2="22">
        <A at="x2" v={[96, 90, 96]} />
        <A at="y2" v={[22, 52, 22]} />
      </line>
      <line x1="110" y1="44" x2="104" y2="22">
        <A at="x2" v={[104, 110, 104]} />
        <A at="y2" v={[22, 52, 22]} />
      </line>
      <rect x="92" y="12" width="16" height="9" rx="2" className="db">
        <A at="y" v={[12, 48, 12]} />
      </rect>
    </Svg>
  )
}

function Curls() {
  return (
    <Svg label="dumbbell curl, forearm hinging at the elbow">
      <Ground />
      {/* standing side profile */}
      <line x1="92" y1="62" x2="92" y2="110" />
      <circle cx="94" cy="50" r="9" />
      <line x1="92" y1="110" x2="84" y2="126" />
      <line x1="92" y1="110" x2="102" y2="126" />
      {/* upper arm pinned to the side */}
      <line x1="92" y1="66" x2="95" y2="90" />
      {/* forearm: hanging → curled to the shoulder */}
      <line x1="95" y1="90" x2="98" y2="114">
        <A at="x2" v={[98, 116, 98]} />
        <A at="y2" v={[114, 76, 114]} />
      </line>
      <circle cx="98" cy="114" r="7" className="db-fill">
        <A at="cx" v={[98, 116, 98]} />
        <A at="cy" v={[114, 76, 114]} />
      </circle>
    </Svg>
  )
}

function ThoracicFloor() {
  return (
    <Svg label="thoracic extension lying over a rolled towel on the floor">
      <Ground />
      {/* the towel roll under the mid-back */}
      <circle cx="96" cy="118" r="8" className="faint" />
      {/* bent legs: foot → knee → hip */}
      <line x1="150" y1="126" x2="140" y2="98" />
      <line x1="140" y1="98" x2="118" y2="116" />
      {/* torso arching over the roll */}
      <line x1="118" y1="116" x2="80" y2="102">
        <A at="x2" v={[80, 74, 80]} dur="3s" />
        <A at="y2" v={[102, 114, 102]} dur="3s" />
      </line>
      <circle cx="68" cy="96" r="8">
        <A at="cx" v={[68, 58, 68]} dur="3s" />
        <A at="cy" v={[96, 112, 96]} dur="3s" />
      </circle>
      {/* elbows-to-ceiling arms hinted */}
      <line x1="76" y1="98" x2="82" y2="80">
        <A at="x1" v={[76, 68, 76]} dur="3s" />
        <A at="y1" v={[98, 110, 98]} dur="3s" />
        <A at="x2" v={[82, 70, 82]} dur="3s" />
        <A at="y2" v={[80, 90, 80]} dur="3s" />
      </line>
    </Svg>
  )
}

function DeadHang() {
  return (
    <Svg label="dead hang from a doorway bar">
      {/* door frame + bar */}
      <line x1="60" y1="8" x2="60" y2="126" className="faint" />
      <line x1="140" y1="8" x2="140" y2="126" className="faint" />
      <line x1="60" y1="18" x2="140" y2="18" />
      <g>
        {animate && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0;0 3;0 0"
            dur="3s"
            repeatCount="indefinite"
            calcMode="spline"
            keyTimes="0;0.5;1"
            keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
          />
        )}
        {/* arms from the bar to shoulders */}
        <line x1="88" y1="18" x2="94" y2="48" />
        <line x1="112" y1="18" x2="106" y2="48" />
        <circle cx="100" cy="40" r="8" />
        <line x1="100" y1="48" x2="100" y2="88" />
        <line x1="100" y1="88" x2="94" y2="112" />
        <line x1="100" y1="88" x2="106" y2="112" />
      </g>
    </Svg>
  )
}

function BandRow() {
  return (
    <Svg label="seated band row, elbows pulling back">
      <Ground />
      {/* legs out front, band anchored at the feet */}
      <line x1="86" y1="114" x2="146" y2="122" />
      <line x1="146" y1="122" x2="150" y2="126" />
      {/* torso tall */}
      <line x1="86" y1="114" x2="82" y2="66" />
      <circle cx="81" cy="55" r="8" />
      {/* band: foot → hand (stretches as the elbow drives back) */}
      <line x1="148" y1="120" x2="112" y2="86" className="dashed">
        <A at="x2" v={[112, 88, 112]} />
        <A at="y2" v={[86, 88, 86]} />
      </line>
      {/* arm: shoulder → elbow → hand */}
      <line x1="84" y1="72" x2="100" y2="80">
        <A at="x2" v={[100, 80, 100]} />
        <A at="y2" v={[80, 88, 80]} />
      </line>
      <line x1="100" y1="80" x2="112" y2="86">
        <A at="x1" v={[100, 80, 100]} />
        <A at="y1" v={[80, 88, 80]} />
        <A at="x2" v={[112, 88, 112]} />
        <A at="y2" v={[86, 88, 86]} />
      </line>
    </Svg>
  )
}

function DbRow() {
  return (
    <Svg label="single-arm dumbbell row, bench supported">
      <Ground />
      {/* the bench/bed */}
      <rect x="30" y="96" width="58" height="30" rx="4" className="faint" />
      {/* supporting arm + flat back */}
      <line x1="52" y1="96" x2="58" y2="66" />
      <line x1="58" y1="66" x2="126" y2="60" />
      <circle cx="48" cy="60" r="8" />
      {/* standing leg */}
      <line x1="126" y1="60" x2="142" y2="126" />
      {/* rowing arm: hangs → to the hip */}
      <line x1="106" y1="62" x2="108" y2="92">
        <A at="x2" v={[108, 112, 108]} />
        <A at="y2" v={[92, 70, 92]} />
      </line>
      <rect x="101" y="92" width="14" height="8" rx="2" className="db">
        <A at="x" v={[101, 105, 101]} />
        <A at="y" v={[92, 70, 92]} />
      </rect>
    </Svg>
  )
}

function FacePulls() {
  return (
    <Svg label="band face pull toward the forehead, elbows wide">
      <Ground />
      {/* anchor point at face height */}
      <line x1="164" y1="10" x2="164" y2="126" className="faint" />
      <circle cx="160" cy="52" r="3" className="db-fill" />
      {/* figure */}
      <line x1="74" y1="70" x2="74" y2="112" />
      <circle cx="74" cy="52" r="8" />
      <line x1="74" y1="112" x2="66" y2="126" />
      <line x1="74" y1="112" x2="84" y2="126" />
      {/* band: anchor → hand */}
      <line x1="158" y1="52" x2="112" y2="56" className="dashed">
        <A at="x2" v={[112, 92, 112]} />
        <A at="y2" v={[56, 50, 56]} />
      </line>
      {/* arm: shoulder → elbow (rises + widens) → hand (to the ear) */}
      <line x1="76" y1="66" x2="96" y2="64">
        <A at="x2" v={[96, 94, 96]} />
        <A at="y2" v={[64, 58, 64]} />
      </line>
      <line x1="96" y1="64" x2="112" y2="56">
        <A at="x1" v={[96, 94, 96]} />
        <A at="y1" v={[64, 58, 64]} />
        <A at="x2" v={[112, 92, 112]} />
        <A at="y2" v={[56, 50, 56]} />
      </line>
    </Svg>
  )
}

function DeadBug() {
  return (
    <Svg label="dead bug, opposite arm and leg extending">
      <Ground />
      {/* torso lying, head left, lower back glued down */}
      <circle cx="52" cy="118" r="8" />
      <line x1="62" y1="120" x2="118" y2="120" />
      {/* arm: vertical → overhead */}
      <line x1="74" y1="120" x2="74" y2="86">
        <A at="x2" v={[74, 48, 74]} />
        <A at="y2" v={[86, 100, 86]} />
      </line>
      {/* bent leg staying up */}
      <line x1="118" y1="120" x2="128" y2="94" />
      <line x1="128" y1="94" x2="146" y2="100" />
      {/* extending leg: knee bent → reaching long, hovering */}
      <line x1="118" y1="120" x2="136" y2="106">
        <A at="x2" v={[136, 158, 136]} />
        <A at="y2" v={[106, 116, 106]} />
      </line>
    </Svg>
  )
}

function PullAparts() {
  return (
    <Svg label="band pull-apart, straight arms opening to a T">
      <FrontBase />
      {/* band between the hands */}
      <line x1="76" y1="66" x2="124" y2="66" className="dashed">
        <A at="x1" v={[76, 46, 76]} />
        <A at="x2" v={[124, 154, 124]} />
      </line>
      {/* straight arms from shoulders to hands */}
      <line x1="100" y1="68" x2="76" y2="66">
        <A at="x2" v={[76, 46, 76]} />
      </line>
      <line x1="100" y1="68" x2="124" y2="66">
        <A at="x2" v={[124, 154, 124]} />
      </line>
    </Svg>
  )
}

function PikePushup() {
  return (
    <Svg label="pike push-up, hips high, head lowering between the hands">
      <Ground />
      {/* legs: feet planted, hips at the apex */}
      <line x1="148" y1="126" x2="112" y2="66" />
      {/* torso: hips → shoulders (shoulders dip toward the floor) */}
      <line x1="112" y1="66" x2="70" y2="96">
        <A at="x2" v={[70, 66, 70]} />
        <A at="y2" v={[96, 108, 96]} />
      </line>
      {/* head below the shoulders */}
      <circle cx="62" cy="106" r="8">
        <A at="cx" v={[62, 58, 62]} />
        <A at="cy" v={[106, 116, 106]} />
      </circle>
      {/* arm: shoulder → hand on the handle */}
      <line x1="70" y1="96" x2="76" y2="124">
        <A at="x1" v={[70, 66, 70]} />
        <A at="y1" v={[96, 108, 96]} />
      </line>
      <rect x="69" y="120" width="14" height="7" rx="2" className="db" />
    </Svg>
  )
}

function GobletSquat() {
  return (
    <Svg label="goblet squat holding a dumbbell at the chest">
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
      {/* torso — more upright than a bodyweight squat */}
      <line x1="97" y1="58" x2="99" y2="22">
        <A at="x1" v={[97, 104, 97]} />
        <A at="y1" v={[58, 84, 58]} />
        <A at="x2" v={[99, 94, 99]} />
        <A at="y2" v={[22, 48, 22]} />
      </line>
      <circle cx="100" cy="13" r="8">
        <A at="cx" v={[100, 93, 100]} />
        <A at="cy" v={[13, 39, 13]} />
      </circle>
      {/* the goblet: dumbbell held at the chest, riding with the torso */}
      <circle cx="112" cy="34" r="7" className="db-fill">
        <A at="cx" v={[112, 108, 112]} />
        <A at="cy" v={[34, 60, 34]} />
      </circle>
    </Svg>
  )
}

function BandOhp() {
  return (
    <Svg label="overhead press with a band anchored under the feet">
      <FrontBase />
      {/* band: from under the feet up to each hand */}
      <line x1="94" y1="124" x2="82" y2="60" className="dashed">
        <A at="x2" v={[82, 90, 82]} />
        <A at="y2" v={[60, 26, 60]} />
      </line>
      <line x1="106" y1="124" x2="118" y2="60" className="dashed">
        <A at="x2" v={[118, 110, 118]} />
        <A at="y2" v={[60, 26, 60]} />
      </line>
      {/* left arm: shoulder → elbow → hand */}
      <line x1="100" y1="68" x2="84" y2="76">
        <A at="x2" v={[84, 90, 84]} />
        <A at="y2" v={[76, 46, 76]} />
      </line>
      <line x1="84" y1="76" x2="82" y2="60">
        <A at="x1" v={[84, 90, 84]} />
        <A at="y1" v={[76, 46, 76]} />
        <A at="x2" v={[82, 90, 82]} />
        <A at="y2" v={[60, 26, 60]} />
      </line>
      {/* right arm */}
      <line x1="100" y1="68" x2="116" y2="76">
        <A at="x2" v={[116, 110, 116]} />
        <A at="y2" v={[76, 46, 76]} />
      </line>
      <line x1="116" y1="76" x2="118" y2="60">
        <A at="x1" v={[116, 110, 116]} />
        <A at="y1" v={[76, 46, 76]} />
        <A at="x2" v={[118, 110, 118]} />
        <A at="y2" v={[60, 26, 60]} />
      </line>
    </Svg>
  )
}

const PICTOGRAMS: Record<string, () => ReactNode> = {
  'band-ohp': BandOhp,
  'pike-pushup': PikePushup,
  'goblet-squat': GobletSquat,
  'dead-hang': DeadHang,
  'band-row': BandRow,
  'db-row': DbRow,
  'face-pulls': FacePulls,
  'dead-bug': DeadBug,
  'pull-aparts': PullAparts,
  'floor-press': FloorPress,
  'oh-triceps': OhTriceps,
  curls: Curls,
  'thoracic-floor': ThoracicFloor,
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
