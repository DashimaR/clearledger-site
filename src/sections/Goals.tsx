import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { C } from '../constants'

// ── Data ──────────────────────────────────────────────────────────────────────
const goals = [
  { name:'New Laptop',     sw:'Kompyuta Mpya',    icon:'💻', target:80000,  saved:76000, pct:95, deadline:'Jun 2025' },
  { name:'School Fees',    sw:'Ada ya Shule',     icon:'📚', target:50000,  saved:32000, pct:64, deadline:'Aug 2025' },
  { name:'Emergency Fund', sw:'Akiba ya Dharura', icon:'🛡️', target:100000, saved:45000, pct:45, deadline:'Dec 2025' },
  { name:'Kenya Safari',   sw:'Safari Kenya',     icon:'🦁', target:30000,  saved:8000,  pct:27, deadline:'Jan 2026' },
  { name:'Biashara',       sw:'Biashara Yangu',   icon:'🏪', target:200000, saved:62000, pct:31, deadline:'Mar 2026' },
]

// Each branch connects trunk-top (220,200) to an endpoint
const branches = [
  { goal: goals[1], d:'M220,200 C200,168 182,136 162,108', ex:162, ey:108 }, // upper-left
  { goal: goals[4], d:'M220,200 C198,178 168,160 118,142', ex:118, ey:142 }, // left
  { goal: goals[2], d:'M220,200 C218,162 216,128 214,82',  ex:214, ey:82  }, // center-up
  { goal: goals[0], d:'M220,200 C240,168 258,136 278,108', ex:278, ey:108 }, // upper-right
  { goal: goals[3], d:'M220,200 C242,178 272,160 322,142', ex:322, ey:142 }, // right
]

function goalColor(pct: number) {
  if (pct >= 90) return C.em
  if (pct >= 60) return C.gold
  if (pct >= 40) return '#a78bfa'
  return C.muted
}

// ── Baobab SVG ────────────────────────────────────────────────────────────────
function Baobab({ inView }: { inView: boolean }) {
  return (
    <svg viewBox="0 0 440 320" width="100%" aria-hidden="true">

      {/* Ground line */}
      <line x1="80" y1="292" x2="360" y2="292" stroke={C.bg700} strokeWidth="1" />

      {/* Roots */}
      {['M202,290 C182,294 158,296 140,294','M238,290 C258,294 282,296 300,294',
        'M216,291 C212,297 208,304 205,308','M224,291 C228,297 232,304 235,308'].map((d,i)=>(
        <motion.path key={i} d={d} fill="none" stroke={C.bg700} strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength:0 }} animate={inView?{pathLength:1}:{}}
          transition={{ delay:0.3+i*0.08, duration:0.5 }} />
      ))}

      {/* Trunk fill */}
      <motion.path
        d="M200,290 C196,268 197,248 207,228 C212,215 216,204 220,200 C224,204 228,215 233,228 C243,248 244,268 240,290 Z"
        fill={C.bg700} stroke={C.bg600} strokeWidth="1"
        initial={{ scaleY:0 }} animate={inView?{scaleY:1}:{}}
        style={{ transformOrigin:'220px 290px' }}
        transition={{ delay:0.1, duration:0.6, ease:'easeOut' }}
      />
      {/* Trunk texture line */}
      <motion.path
        d="M212,280 C214,265 216,248 220,234 C224,248 226,265 228,280"
        fill="none" stroke={C.bg600} strokeWidth="1" opacity="0.6"
        initial={{ pathLength:0 }} animate={inView?{pathLength:1}:{}}
        transition={{ delay:0.5, duration:0.5 }}
      />

      {/* Ghost branches */}
      {branches.map(b=>(
        <path key={`g-${b.goal.name}`} d={b.d} fill="none"
          stroke={goalColor(b.goal.pct)} strokeWidth="2" opacity="0.08"
          strokeLinecap="round" />
      ))}

      {/* Animated branches — grow to goal progress */}
      {branches.map((b, i)=>(
        <motion.path key={`b-${b.goal.name}`} d={b.d} fill="none"
          stroke={goalColor(b.goal.pct)} strokeWidth="2.5" strokeLinecap="round"
          opacity={0.8}
          initial={{ pathLength:0 }}
          animate={inView ? { pathLength: b.goal.pct/100 } : {}}
          transition={{ delay:0.8+i*0.15, duration:1.3, ease:'easeOut' }}
        />
      ))}

      {/* Glow dot at branch tip */}
      {branches.map((b, i)=>(
        <motion.circle key={`dot-${b.goal.name}`}
          cx={b.ex} cy={b.ey} r={4}
          fill={goalColor(b.goal.pct)}
          initial={{ scale:0, opacity:0 }}
          animate={inView ? { scale:1, opacity: b.goal.pct/100 } : {}}
          transition={{ delay:0.8+i*0.15+1.1, duration:0.4 }}
        />
      ))}

      {/* Bloom leaves for near-complete goals (>=85%) */}
      {branches.filter(b=>b.goal.pct>=85).map(b=>(
        <g key={`leaf-${b.goal.name}`}>
          {[[-7,-5],[7,-5],[0,-11],[6,3],[-6,3],[0,1]].map(([dx,dy],j)=>(
            <motion.circle key={j} cx={b.ex+dx} cy={b.ey+dy} r={2.5} fill={C.gold}
              initial={{ scale:0, opacity:0 }}
              animate={inView ? { scale:1, opacity:0.85 } : {}}
              transition={{ delay:2.3+j*0.07 }}
            />
          ))}
        </g>
      ))}

      {/* Labels near each branch end */}
      {branches.map(b=>{
        const ta = b.ex > 300 ? 'start' : b.ex < 140 ? 'end' : 'middle'
        const lx = b.ex > 300 ? b.ex-35 : b.ex < 140 ? b.ex+35 : b.ex
        return (
          <motion.g key={`lbl-${b.goal.name}`}
            initial={{ opacity:0 }} animate={inView?{opacity:1}:{}}
            transition={{ delay:2.0 }}>
            <text x={lx} y={b.ey-14} textAnchor={ta} fontSize="9" fontWeight="700"
              fill={goalColor(b.goal.pct)} fontFamily="inherit">{b.goal.name}</text>
            <text x={lx} y={b.ey-4} textAnchor={ta} fontSize="8"
              fill={C.muted} fontFamily="inherit">{b.goal.pct}% · {b.goal.sw}</text>
          </motion.g>
        )
      })}

    </svg>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export function Goals() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once:true, amount:0.2 })

  const totalSaved  = goals.reduce((s,g)=>s+g.saved,  0)
  const totalTarget = goals.reduce((s,g)=>s+g.target, 0)

  return (
    <section ref={ref} className="px-6 py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div className="mb-16 max-w-lg"
          initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}}
          transition={{ duration:0.6 }}>
          <p className="mb-2 text-xs" style={{ color:C.gold }}>— malengo · goals</p>
          <h2 className="text-3xl font-bold" style={{ color:C.text }}>Save with a deadline.</h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color:C.muted }}>
            Each goal is a branch. The tree grows as your savings grow.{' '}
            <span style={{ color:C.warm, fontStyle:'italic' }}>Mvumilivu hula mbivu.</span>
            {' '}The patient one eats the ripe ones.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 items-center">

          {/* Goal cards */}
          <div className="flex flex-col gap-3 order-2 lg:order-1">
            {goals.map((g, i)=>(
              <motion.div key={g.name} className="rounded-xl p-4"
                style={{ background:C.bg900, border:`1px solid ${C.bg700}` }}
                initial={{ opacity:0, x:-20 }} animate={inView?{opacity:1,x:0}:{}}
                transition={{ delay:i*0.1+0.3, duration:0.5 }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span>{g.icon}</span>
                    <div>
                      <div className="text-sm font-semibold" style={{ color:C.warm }}>{g.name}</div>
                      <div className="text-xs" style={{ color:C.muted }}>{g.sw} · {g.deadline}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold" style={{ color:goalColor(g.pct) }}>{g.pct}%</div>
                    <div className="text-xs" style={{ color:C.bg600 }}>
                      {(g.saved/1000).toFixed(0)}k / {(g.target/1000).toFixed(0)}k
                    </div>
                  </div>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background:C.bg800 }}>
                  <motion.div className="h-full rounded-full"
                    style={{ background:goalColor(g.pct) }}
                    initial={{ width:0 }}
                    animate={inView?{ width:`${g.pct}%` }:{}}
                    transition={{ delay:i*0.1+0.6, duration:1, ease:'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Total */}
            <motion.div className="flex items-center justify-between rounded-xl px-4 py-3 mt-1"
              style={{ background:'rgba(154,106,10,0.08)', border:`1px solid rgba(154,106,10,0.22)` }}
              initial={{ opacity:0 }} animate={inView?{opacity:1}:{}} transition={{ delay:0.9 }}>
              <div className="text-sm" style={{ color:C.muted }}>Total saved</div>
              <div>
                <span className="text-base font-bold" style={{ color:C.gold }}>
                  KES {totalSaved.toLocaleString()}
                </span>
                <span className="ml-2 text-xs" style={{ color:C.bg600 }}>
                  of {totalTarget.toLocaleString()}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Baobab illustration */}
          <motion.div className="rounded-2xl p-4 order-1 lg:order-2"
            style={{ background:C.bg950, border:`1px solid ${C.bg700}` }}
            initial={{ opacity:0, scale:0.97 }} animate={inView?{opacity:1,scale:1}:{}}
            transition={{ duration:0.7, delay:0.1 }}>
            <div className="mb-2 text-center">
              <span className="text-xs" style={{ color:C.bg600 }}>Mti wa Malengo · The Goal Tree</span>
            </div>
            <Baobab inView={inView} />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
