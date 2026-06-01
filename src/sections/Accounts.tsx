import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { C } from '../constants'

// ── Node definitions ──────────────────────────────────────────────────────────
const nodes = [
  { id:'mpesa', label:'M-Pesa',  sub:'Mkoba',     x:80,  y:65,  r:26, color:C.em,   balance:'KES 12,430' },
  { id:'bank',  label:'Equity',  sub:'Benki',     x:360, y:65,  r:26, color:'#3b82f6', balance:'KES 89,200' },
  { id:'cash',  label:'Cash',    sub:'Taslimu',   x:80,  y:255, r:26, color:C.gold,  balance:'KES 3,200'  },
  { id:'sacco', label:'SACCO',   sub:'Akiba',     x:360, y:255, r:26, color:'#a78bfa', balance:'KES 29,670' },
  { id:'net',   label:'Jumla',   sub:'Net Worth', x:220, y:165, r:38, color:C.em,   balance:'KES 134,500' },
]

// Bezier paths from source nodes to net worth centre
const paths = [
  { id:'p1', d:'M80,65  C80,140 220,105 220,165', color:C.em,      delay:0.2 },
  { id:'p2', d:'M360,65 C360,140 220,105 220,165', color:'#3b82f6', delay:0.4 },
  { id:'p3', d:'M80,255 C80,180 220,225 220,165',  color:C.gold,   delay:0.6 },
  { id:'p4', d:'M360,255 C360,180 220,225 220,165', color:'#a78bfa', delay:0.8 },
]

// Particle offsets: each account sends a "drop" travelling toward net worth
const particles = [
  { pathId:'p1', color:C.em,      delay:0.8,  dur:2.2 },
  { pathId:'p2', color:'#3b82f6', delay:1.2,  dur:2.0 },
  { pathId:'p3', color:C.gold,    delay:1.6,  dur:2.4 },
  { pathId:'p4', color:'#a78bfa', delay:1.0,  dur:2.1 },
  { pathId:'p1', color:C.em,      delay:3.2,  dur:2.2 },
  { pathId:'p3', color:C.gold,    delay:3.8,  dur:2.4 },
]

export function Accounts() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section ref={ref} className="px-6 py-24 overflow-hidden" style={{ background:C.bg900 }}>
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div className="mb-16 max-w-lg"
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }}>
          <p className="mb-2 text-xs" style={{ color:C.gold }}>— akaunti · accounts</p>
          <h2 className="text-3xl font-bold" style={{ color:C.text }}>All your money,<br />one river.</h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color:C.muted }}>
            M-Pesa, bank, cash, SACCO — every source flows into a single picture.{' '}
            <span style={{ color:C.warm }}>Ujue mali yako.</span>{' '}
            Know your wealth.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 items-center">

          {/* River map illustration */}
          <motion.div
            initial={{ opacity:0, scale:0.96 }} animate={inView ? { opacity:1, scale:1 } : {}}
            transition={{ duration:0.8, delay:0.1 }}
            className="rounded-2xl p-4"
            style={{ background:C.bg950, border:`1px solid ${C.bg700}` }}>

            <svg viewBox="0 0 440 320" width="100%" style={{ overflow:'visible' }}>
              <defs>
                {/* Glow filters per colour */}
                {[
                  ['glow-em',   C.em],
                  ['glow-blue', '#3b82f6'],
                  ['glow-gold', C.gold],
                  ['glow-vio',  '#a78bfa'],
                ].map(([id, col]) => (
                  <filter key={id} id={id} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                    <feColorMatrix in="blur" type="matrix"
                      values={`0 0 0 0 ${parseInt(col.slice(1,3),16)/255} 0 0 0 0 ${parseInt(col.slice(3,5),16)/255} 0 0 0 0 ${parseInt(col.slice(5,7),16)/255} 0 0 0 0.6 0`} />
                  </filter>
                ))}
                {/* Path defs for particle animation */}
                {paths.map(p => (
                  <path key={`def-${p.id}`} id={p.id} d={p.d} />
                ))}
              </defs>

              {/* Flow paths */}
              {paths.map((p) => (
                <g key={p.id}>
                  {/* Ghost path */}
                  <path d={p.d} fill="none" stroke={p.color} strokeWidth="1" opacity="0.12" />
                  {/* Animated path */}
                  <motion.path
                    d={p.d} fill="none" stroke={p.color} strokeWidth="1.5" opacity={0.5}
                    initial={{ pathLength:0 }}
                    animate={inView ? { pathLength:1 } : {}}
                    transition={{ duration:1.2, delay:p.delay, ease:'easeOut' }}
                  />
                </g>
              ))}

              {/* Flowing particles (CSS offset-path) */}
              {inView && particles.map((pt, i) => (
                <circle key={i} r="3" fill={pt.color} opacity="0.9"
                  style={{
                    offsetPath: `path("${paths.find(p=>p.id===pt.pathId)!.d}")`,
                    animation: `flow-particle ${pt.dur}s ${pt.delay}s ease-in-out infinite`,
                  } as React.CSSProperties}
                />
              ))}

              {/* Source nodes */}
              {nodes.filter(n => n.id !== 'net').map(n => (
                <g key={n.id}>
                  {/* Glow ring */}
                  <circle cx={n.x} cy={n.y} r={n.r+6} fill={n.color} opacity="0.06" />
                  <circle cx={n.x} cy={n.y} r={n.r+2} fill="none" stroke={n.color} strokeWidth="1" opacity="0.2" />
                  {/* Node circle */}
                  <circle cx={n.x} cy={n.y} r={n.r} fill={C.bg800} stroke={n.color} strokeWidth="1.5" />
                  {/* Label */}
                  <text x={n.x} y={n.y-4} textAnchor="middle" fontSize="9" fontWeight="600" fill={n.color} fontFamily="inherit">{n.label}</text>
                  <text x={n.x} y={n.y+7} textAnchor="middle" fontSize="8" fill={C.muted} fontFamily="inherit">{n.sub}</text>
                  {/* Balance below node */}
                  <text x={n.x} y={n.y + n.r + 14} textAnchor="middle" fontSize="8" fill={C.bg600} fontFamily="inherit">{n.balance}</text>
                </g>
              ))}

              {/* Net worth central node */}
              {(() => {
                const n = nodes.find(n => n.id === 'net')!
                return (
                  <g>
                    <motion.circle cx={n.x} cy={n.y} r={n.r+14} fill={n.color} opacity="0.04"
                      animate={inView ? { r:[n.r+10, n.r+18, n.r+10] } : {}}
                      transition={{ duration:3, repeat:Infinity, ease:'easeInOut' }}
                    />
                    <circle cx={n.x} cy={n.y} r={n.r+4} fill="none" stroke={n.color} strokeWidth="1" opacity="0.25" />
                    <circle cx={n.x} cy={n.y} r={n.r} fill={C.bg800} stroke={n.color} strokeWidth="2" />
                    <text x={n.x} y={n.y-8} textAnchor="middle" fontSize="10" fontWeight="700" fill={n.color} fontFamily="inherit">{n.label}</text>
                    <text x={n.x} y={n.y+4} textAnchor="middle" fontSize="8" fill={C.muted} fontFamily="inherit">{n.sub}</text>
                    <text x={n.x} y={n.y+16} textAnchor="middle" fontSize="9" fontWeight="600" fill={C.warm} fontFamily="inherit">{n.balance}</text>
                  </g>
                )
              })()}
            </svg>
          </motion.div>

          {/* Account list */}
          <div className="flex flex-col gap-3">
            {nodes.filter(n => n.id !== 'net').map((n, i) => (
              <motion.div key={n.id} className="flex items-center justify-between rounded-xl px-4 py-3"
                style={{ background:C.bg950, border:`1px solid ${C.bg700}` }}
                initial={{ opacity:0, x:24 }} animate={inView ? { opacity:1, x:0 } : {}}
                transition={{ delay: i * 0.1 + 0.4, duration:0.5 }}>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background:n.color }} />
                  <div>
                    <div className="text-sm font-semibold" style={{ color:C.warm }}>{n.label}</div>
                    <div className="text-xs" style={{ color:C.muted }}>{n.sub}</div>
                  </div>
                </div>
                <div className="text-sm font-bold" style={{ color:n.color }}>{n.balance}</div>
              </motion.div>
            ))}

            {/* Net worth total */}
            <motion.div className="flex items-center justify-between rounded-xl px-4 py-4 mt-1"
              style={{ background:`rgba(9,92,60,0.08)`, border:`1px solid rgba(9,92,60,0.28)` }}
              initial={{ opacity:0, y:12 }} animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ delay:0.8, duration:0.5 }}>
              <div>
                <div className="text-sm font-bold" style={{ color:C.em }}>Jumla · Net Worth</div>
                <div className="text-xs" style={{ color:C.muted }}>All accounts combined</div>
              </div>
              <div className="text-xl font-bold" style={{ color:C.em }}>KES 134,500</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
