import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { C } from '../constants'

// ── Data ──────────────────────────────────────────────────────────────────────
const loans = [
  { name:'Fuliza M-Pesa',  icon:'📱', balance:340,    rate:'0.5%/day', due:'3 days',   urgency:'high'   as const },
  { name:'M-Shwari',       icon:'💚', balance:3000,   rate:'7.5%/mo',  due:'15 days',  urgency:'medium' as const },
  { name:'KCB Flexipay',   icon:'🏦', balance:8500,   rate:'1.8%/mo',  due:'30 days',  urgency:'low'    as const },
  { name:'Equity Bank',    icon:'🏛️', balance:45000,  rate:'1.5%/mo',  due:'60 days',  urgency:'none'   as const },
  { name:'SACCO Loan',     icon:'🤝', balance:120000, rate:'1%/mo',    due:'6 months', urgency:'none'   as const },
]

const urgencyColor: Record<string, string> = {
  high:   C.terra,
  medium: C.gold,
  low:    '#B8960C',
  none:   C.muted,
}

const urgencyLabel: Record<string, string> = {
  high:   'Haraka · Urgent',
  medium: 'Angalia · Caution',
  low:    'Hivi karibuni · Soon',
  none:   'Sawa · Current',
}

// ── Stone pile ────────────────────────────────────────────────────────────────
// Stones ordered bottom-to-top (largest first)
const stoneOrder = [...loans].sort((a,b)=>b.balance-a.balance)

// Stone widths scaled logarithmically
function stoneWidth(balance: number): number {
  const maxW = 300, minW = 70
  const log = Math.log(balance + 1)
  const logMax = Math.log(120000 + 1)
  return minW + (maxW - minW) * (log / logMax)
}

function stoneHeight(balance: number): number {
  return balance > 50000 ? 44 : balance > 5000 ? 36 : balance > 1000 ? 28 : 22
}

function StoneStack({ inView }: { inView: boolean }) {
  let yPos = 286 // Start from ground

  const stoneData = stoneOrder.map(loan => {
    const h = stoneHeight(loan.balance)
    const w = stoneWidth(loan.balance)
    yPos -= h + 3
    return { loan, w, h, y: yPos, x: 220 - w/2 }
  })

  return (
    <svg viewBox="0 0 440 320" width="100%" aria-hidden="true">

      {/* Ground shadow */}
      <ellipse cx="220" cy="292" rx="155" ry="5" fill={C.bg700} opacity="0.5" />
      {/* Ground line */}
      <line x1="60" y1="290" x2="380" y2="290" stroke={C.bg700} strokeWidth="1" />

      {/* Stones — drop in from above */}
      {stoneData.map(({ loan, w, h, y, x }, i) => {
        const col = urgencyColor[loan.urgency]
        const isDone = loan.urgency === 'none'

        return (
          <motion.g key={loan.name}
            initial={{ y:-80, opacity:0 }}
            animate={inView ? { y:0, opacity:1 } : {}}
            transition={{ delay: (stoneData.length - 1 - i) * 0.12 + 0.3,
              duration:0.6, ease:[0.34,1.4,0.64,1] as any }}
          >
            {/* Stone shadow */}
            <ellipse cx={x + w/2} cy={y + h + 1} rx={w/2 - 4} ry={3}
              fill="rgba(0,0,0,0.4)" />

            {/* Stone body */}
            <rect x={x} y={y} width={w} height={h} rx={4}
              fill={C.bg800} stroke={col} strokeWidth={loan.urgency === 'high' ? 1.5 : 1}
              opacity={isDone ? 0.6 : 1}
            />

            {/* Stone fill overlay (urgency highlight) */}
            <rect x={x} y={y} width={w} height={h} rx={4}
              fill={col} opacity={0.06} />

            {/* Left urgency bar */}
            <rect x={x} y={y+4} width={3} height={h-8} rx={1.5} fill={col} opacity={0.7} />

            {/* Labels inside stone */}
            <text x={x+14} y={y + h/2 - 3} fontSize="10" fontWeight="600"
              fill={isDone ? C.muted : C.warm} fontFamily="inherit">{loan.name}</text>
            <text x={x+14} y={y + h/2 + 8} fontSize="9"
              fill={col} fontFamily="inherit">
              KES {loan.balance.toLocaleString()}  ·  {loan.due}
            </text>
          </motion.g>
        )
      })}

      {/* Total burden label */}
      <motion.g
        initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
        transition={{ delay:1.6 }}>
        <text x="220" y="32" textAnchor="middle" fontSize="10"
          fill={C.muted} fontFamily="inherit">Mzigo wako wote · Total burden</text>
        <text x="220" y="52" textAnchor="middle" fontSize="18" fontWeight="700"
          fill={C.terra} fontFamily="inherit">
          KES {loans.reduce((s,l)=>s+l.balance,0).toLocaleString()}
        </text>
        {/* Down arrow */}
        <text x="220" y="68" textAnchor="middle" fontSize="10" fill={C.bg600} fontFamily="inherit">↓</text>
      </motion.g>

    </svg>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function Loans() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once:true, amount:0.2 })

  const total = loans.reduce((s,l)=>s+l.balance,0)

  return (
    <section ref={ref} className="px-6 py-24 overflow-hidden" style={{ background:C.bg900 }}>
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div className="mb-16 max-w-lg"
          initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.6 }}>
          <p className="mb-2 text-xs" style={{ color:C.gold }}>— mikopo · loans</p>
          <h2 className="text-3xl font-bold" style={{ color:C.text }}>Know what you carry.</h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color:C.muted }}>
            Every loan is a stone on the pile. The bigger the balance, the heavier the stone.{' '}
            <span style={{ color:C.warm }}>Pay one down — watch it lift.</span>
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 items-center">

          {/* Stone pile illustration */}
          <motion.div className="rounded-2xl p-4"
            style={{ background:C.bg950, border:`1px solid ${C.bg700}` }}
            initial={{ opacity:0, scale:0.97 }} animate={inView?{opacity:1,scale:1}:{}}
            transition={{ duration:0.7, delay:0.1 }}>
            <StoneStack inView={inView} />
          </motion.div>

          {/* Loan cards */}
          <div className="flex flex-col gap-3">
            {loans.map((loan, i)=>{
              const col = urgencyColor[loan.urgency]
              return (
                <motion.div key={loan.name} className="rounded-xl p-4"
                  style={{ background:C.bg950, border:`1px solid ${loan.urgency==='high' ? col+'55' : C.bg700}` }}
                  initial={{ opacity:0, x:24 }} animate={inView?{opacity:1,x:0}:{}}
                  transition={{ delay:i*0.1+0.4, duration:0.5 }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{loan.icon}</span>
                      <div>
                        <div className="text-sm font-semibold" style={{ color:C.warm }}>{loan.name}</div>
                        <div className="text-xs" style={{ color:C.muted }}>{loan.rate}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold" style={{ color:col }}>
                        KES {loan.balance.toLocaleString()}
                      </div>
                      <div className="text-xs" style={{ color:col }}>
                        {urgencyLabel[loan.urgency]}
                      </div>
                    </div>
                  </div>

                  {/* Due-date bar */}
                  {loan.urgency !== 'none' && (
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-1 flex-1 rounded-full overflow-hidden" style={{ background:C.bg800 }}>
                        <motion.div className="h-full rounded-full" style={{ background:col }}
                          initial={{ width:0 }}
                          animate={inView ? { width: loan.urgency==='high'?'90%' : loan.urgency==='medium'?'60%':'35%' } : {}}
                          transition={{ delay:i*0.1+0.7, duration:0.8 }}
                        />
                      </div>
                      <span className="text-xs flex-shrink-0" style={{ color:col }}>Due in {loan.due}</span>
                    </div>
                  )}
                </motion.div>
              )
            })}

            {/* Total */}
            <motion.div className="flex items-center justify-between rounded-xl px-4 py-4 mt-1"
              style={{ background:'rgba(196,87,43,0.06)', border:`1px solid rgba(196,87,43,0.25)` }}
              initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:1 }}>
              <div>
                <div className="text-sm font-bold" style={{ color:C.terra }}>Mzigo wote · Total loans</div>
                <div className="text-xs" style={{ color:C.muted }}>Across all lenders</div>
              </div>
              <div className="text-xl font-bold" style={{ color:C.terra }}>
                KES {total.toLocaleString()}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
