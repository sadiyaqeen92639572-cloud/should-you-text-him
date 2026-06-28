'use client'
import { useRef, useState, useEffect, useCallback } from 'react'

const SEGMENTS = [
  { label: 'TEXT IT 🔥', color: '#00FF00', result: 'YES' as const },
  { label: 'GIRL NO 💀', color: '#FF6B6B', result: 'NO' as const },
  { label: 'SEND IT', color: '#4ADE80', result: 'YES' as const },
  { label: 'PUT IT DOWN', color: '#FF6B6B', result: 'NO' as const },
  { label: 'DO IT', color: '#00FF00', result: 'YES' as const },
  { label: 'STEP AWAY', color: '#EF4444', result: 'NO' as const },
  { label: 'OBVIOUSLY YES', color: '#22C55E', result: 'YES' as const },
  { label: 'ABSOLUTELY NOT', color: '#FF6B6B', result: 'NO' as const },
]

const SEG_ANGLE = (Math.PI * 2) / SEGMENTS.length

export default function SpinWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rotRef = useRef(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState<{ label: string; isYes: boolean } | null>(null)

  const draw = useCallback((rot: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = canvas.width
    const cx = W / 2
    const cy = W / 2
    const R = W / 2 - 5

    ctx.clearRect(0, 0, W, W)

    SEGMENTS.forEach((seg, i) => {
      const start = rot - Math.PI / 2 + i * SEG_ANGLE
      const end = start + SEG_ANGLE

      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.arc(cx, cy, R, start, end)
      ctx.closePath()
      ctx.fillStyle = seg.color
      ctx.fill()
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 2.5
      ctx.stroke()

      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(start + SEG_ANGLE / 2)
      ctx.textAlign = 'right'
      ctx.fillStyle = '#000'
      ctx.font = 'bold 10px sans-serif'
      ctx.fillText(seg.label, R - 12, 4)
      ctx.restore()
    })

    // Outer border
    ctx.beginPath()
    ctx.arc(cx, cy, R, 0, Math.PI * 2)
    ctx.strokeStyle = '#000'
    ctx.lineWidth = 5
    ctx.stroke()

    // Center disc (behind SPIN button)
    ctx.beginPath()
    ctx.arc(cx, cy, 32, 0, Math.PI * 2)
    ctx.fillStyle = '#111'
    ctx.fill()
    ctx.strokeStyle = '#FFD93D'
    ctx.lineWidth = 3
    ctx.stroke()
  }, [])

  useEffect(() => {
    draw(0)
  }, [draw])

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setResult(null)

    const spins = (6 + Math.random() * 6) * Math.PI * 2
    const extra = Math.random() * Math.PI * 2
    const target = rotRef.current + spins + extra
    const duration = 3500
    const startTime = performance.now()
    const startRot = rotRef.current

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 4)

    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1)
      const rot = startRot + (target - startRot) * easeOut(t)
      rotRef.current = rot
      draw(rot)

      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        rotRef.current = target
        const relAngle = (((-target) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)
        const idx = Math.floor(relAngle / SEG_ANGLE) % SEGMENTS.length
        const seg = SEGMENTS[idx]
        setResult({ label: seg.label, isYes: seg.result === 'YES' })
        setSpinning(false)
      }
    }

    requestAnimationFrame(tick)
  }

  return (
    <section className="mt-6 bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <h2 className="text-xl font-black uppercase tracking-tight text-center mb-1">
        Should I Text Him Yes or No Wheel
      </h2>
      <p className="text-[11px] font-bold text-center text-gray-500 uppercase tracking-wider mb-5">
        Too lazy to think? Let fate decide. (We warned you.)
      </p>

      <div className="flex flex-col items-center">
        {/* Pointer triangle */}
        <div className="text-2xl leading-none z-10 relative mb-[-6px]">▼</div>

        {/* Wheel + centered SPIN button */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={280}
            height={280}
            className="block"
          />
          <button
            onClick={spin}
            disabled={spinning}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[62px] h-[62px] rounded-full bg-[#FFD93D] border-4 border-black font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all ${spinning ? 'opacity-50 cursor-not-allowed animate-none' : 'animate-pulse cursor-pointer'}`}
          >
            SPIN
          </button>
        </div>

        {result && (
          <div
            className={`mt-5 w-full border-4 border-black p-4 text-center font-black uppercase text-base shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${result.isYes ? 'bg-[#00FF00]' : 'bg-[#FF6B6B]'}`}
          >
            {result.isYes
              ? "✅ THE WHEEL SAID SEND IT. DON'T BLAME US."
              : '❌ THE WHEEL SAID NO. STEP AWAY FROM THE KEYBOARD.'}
          </div>
        )}
      </div>
    </section>
  )
}
