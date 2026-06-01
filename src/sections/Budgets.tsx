import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { C } from '../constants'

// ── Plot data ─────────────────────────────────────────────────────────────────
const plots = [
  { en:'Food',          sw:'Chakula',   pct:67, spent:5350,  total:8000,  icon:'🥦' },
  { en:'Rent',          sw:'Kodi',      pct:100, spent:25000, total:25000, icon:'🏠' },
  { en:'Transport',     sw:'Usafiri',   pct:42, spent:2100,  total:5000,  icon:'🚌' },
  { en:'Airtime',       sw:'Simu',      pct:20, spent:200,   total:1000,  icon:'📱' },
  { en:'School',        sw:'Shule',     pct:55, spent:5500,  total:10000, icon:'📚' },
  { en:'Health',        sw:'Afya',      pct:15, spent:450,   total:3000,  icon:'💊' },
  { en:'Utilities',     sw:'Huduma',    pct:78, spent:3900,  total:5000,  icon:'💡' },
  { en:'Savings',       sw:'Akiba',     pct:30, spent:3000,  total:10000, icon:'🌱' },
  { en:'Entertainment', sw:'Burudani',  pct:12, spent:360,   total:3000,  icon:'🎵' },
]

function plotColor(pct: number): string {
  if (pct >= 100) return C.em      // paid/complete — emerald
  if (pct >= 75)  return C.terra   // approaching — terracotta
  if (pct >= 50)  return C.gold    // caution — gold
  return C.em                      // healthy — emerald
}


export function Budgets() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="px-6 py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div className="mb-6 flex flex-col gap-1 lg:flex-row lg:items-end lg:justify-between"
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }}>
          <div className="max-w-lg">
            <p className="mb-2 text-xs" style={{ color:C.gold }}>— bajeti · budgets</p>
            <h2 className="text-3xl font-bold" style={{ color:C.text }}>Every shilling has a plot.</h2>
            <p className="mt-3 text-sm leading-relaxed" style={{ color:C.muted }}>
              <span style={{ color:C.warm, fontStyle:'italic' }}>Tend to it.</span>
              {' '}Set limits per category. Watch your shamba — each plot fills as you spend.
            </p>
          </div>
          <p className="text-xs lg:text-right" style={{ color:C.bg600 }}>
            Haba na haba hujaza kibaba.<br />
            <span style={{ color:C.muted }}>Little by little fills the measure.</span>
          </p>
        </motion.div>

        {/* Shamba grid */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-3">
          {plots.map((plot, i) => {
            const col = plotColor(plot.pct)
            return (
              <motion.div
                key={plot.en}
                className="relative overflow-hidden rounded-lg"
                style={{ background:C.bg900, border:`1px solid ${C.bg700}`, minHeight:'120px' }}
                initial={{ opacity:0, y:16 }}
                animate={inView ? { opacity:1, y:0 } : {}}
                transition={{ delay: i * 0.06 + 0.2, duration:0.5 }}
              >
                {/* Fill from bottom */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0"
                  style={{ background:`${col}18`, transformOrigin:'bottom' }}
                  initial={{ scaleY:0 }}
                  animate={inView ? { scaleY:1 } : {}}
                  transition={{ delay: i * 0.06 + 0.5, duration:0.9, ease:[0.34,1.56,0.64,1] }}
                >
                  <div style={{ height:`${plot.pct * 1.2}px`, maxHeight:'110px' }} />
                </motion.div>

                {/* Left border fill indicator */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-0.5"
                  style={{ background:col, transformOrigin:'bottom' }}
                  initial={{ scaleY:0 }}
                  animate={inView ? { scaleY: plot.pct / 100 } : {}}
                  transition={{ delay: i * 0.06 + 0.5, duration:0.9, ease:'easeOut' }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-between h-full p-3" style={{ minHeight:'120px' }}>
                  <div>
                    <div className="text-base mb-1">{plot.icon}</div>
                    <div className="text-xs font-semibold leading-tight" style={{ color:C.warm }}>{plot.en}</div>
                    <div className="text-xs" style={{ color:C.muted }}>{plot.sw}</div>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <motion.span
                        className="text-sm font-bold"
                        style={{ color:col }}
                        initial={{ opacity:0 }}
                        animate={inView ? { opacity:1 } : {}}
                        transition={{ delay: i * 0.06 + 1.1 }}
                      >
                        {plot.pct}%
                      </motion.span>
                      <span className="text-xs" style={{ color:C.bg600 }}>
                        {(plot.spent / 1000).toFixed(0)}k/{(plot.total / 1000).toFixed(0)}k
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 rounded-full overflow-hidden" style={{ background:C.bg800 }}>
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background:col }}
                        initial={{ width:0 }}
                        animate={inView ? { width:`${plot.pct}%` } : {}}
                        transition={{ delay: i * 0.06 + 0.5, duration:0.9, ease:'easeOut' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Legend */}
        <motion.div className="mt-6 flex flex-wrap gap-4"
          initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}}
          transition={{ delay:1.5, duration:0.5 }}>
          {[
            { col:C.em,    label:'Healthy · Sawa' },
            { col:C.gold,  label:'Caution · Angalia' },
            { col:C.terra, label:'Nearly full · Karibu mwisho' },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ background:l.col }} />
              <span className="text-xs" style={{ color:C.muted }}>{l.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
