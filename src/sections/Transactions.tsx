import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { C } from '../constants'

// ── Receipt lines ─────────────────────────────────────────────────────────────
const receiptLines = [
  { text: 'SAFARICOM M-PESA',    bold: true,  color: '#10b981' },
  { text: '────────────────────', bold: false, color: C.bg600   },
  { text: 'Confirmed.',           bold: true,  color: C.warm    },
  { text: 'KES2,500.00 sent to',  bold: false, color: C.muted   },
  { text: 'MAMA MBOGA',           bold: true,  color: C.warm    },
  { text: '0712***678 on',        bold: false, color: C.muted   },
  { text: '12/5/25 at 2:32 PM.',  bold: false, color: C.muted   },
  { text: ' ',                    bold: false, color: 'transparent' },
  { text: 'New M-PESA balance',   bold: false, color: C.muted   },
  { text: 'is KES12,430.00.',     bold: true,  color: C.warm    },
  { text: ' ',                    bold: false, color: 'transparent' },
  { text: 'Transaction cost,',    bold: false, color: C.muted   },
  { text: 'KES28.00.',            bold: false, color: C.muted   },
  { text: '────────────────────', bold: false, color: C.bg600   },
  { text: 'RCE4X8Y3LM',          bold: false, color: C.bg600   },
]

// ── Categorised transactions ──────────────────────────────────────────────────
const categorised = [
  {
    icon: '🥦',
    category: 'Chakula · Food & Groceries',
    merchant: 'MAMA MBOGA · 0712***678',
    time: '12 May 2025, 14:32',
    amount: '−KES 2,500',
    color: C.em,
  },
  {
    icon: '📡',
    category: 'Gharama za Mtandao · Telecom Fee',
    merchant: 'Safaricom · Auto-categorised',
    time: '12 May 2025, 14:32',
    amount: '−KES 28',
    color: C.muted,
  },
  {
    icon: '💳',
    category: 'Usawa wa M-Pesa · Balance',
    merchant: 'Updated automatically',
    time: '',
    amount: 'KES 12,430',
    color: C.em,
  },
]

// ── Line variants ─────────────────────────────────────────────────────────────
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
}
const line = {
  hidden:  { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { ease: 'easeOut' as const } },
}
const itemVariant = {
  hidden:  { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1, x: 0,
    transition: { delay: i * 0.15 + 0.4, duration: 0.5, ease: 'easeOut' as const },
  }),
}

export function Transactions() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="px-6 py-24 overflow-hidden" style={{ background:'#DECAA8' }}>
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <motion.div className="mb-16 max-w-lg"
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }}>
          <p className="mb-2 text-xs" style={{ color:C.gold }}>— matumizi · transactions</p>
          <h2 className="text-3xl font-bold" style={{ color:C.text }}>Every shilling, decoded.</h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color:C.muted }}>
            Your M-Pesa already knows where your money went.{' '}
            <span style={{ color:C.warm }}>ClearLedger makes it readable.</span>
          </p>
        </motion.div>

        {/* Two-panel: receipt ↔ categorised */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">

          {/* Receipt */}
          <motion.div
            initial={{ opacity:0, x:-30 }} animate={inView ? { opacity:1, x:0 } : {}}
            transition={{ duration:0.7, delay:0.15 }}>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px flex-1" style={{ background:`linear-gradient(to right, ${C.em}40, transparent)` }} />
              <span className="text-xs" style={{ color:C.em }}>Ujumbe wa M-Pesa · Raw SMS</span>
              <div className="h-px flex-1" style={{ background:`linear-gradient(to left, ${C.em}40, transparent)` }} />
            </div>

            <div className="rounded-xl p-5 font-mono"
              style={{ background:'#071410', border:`1px solid rgba(16,185,129,0.2)`, boxShadow:`0 0 40px rgba(16,185,129,0.05)` }}>
              {/* Perforations */}
              <div className="mb-4 flex gap-1.5">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full" style={{ background:C.bg700 }} />
                ))}
              </div>

              <motion.div variants={container} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
                {receiptLines.map((l, i) => (
                  <motion.div key={i} variants={line}
                    style={{ fontSize:'12px', lineHeight:'1.7', color:l.color,
                      fontWeight: l.bold ? '600' : '400', letterSpacing:'0.02em' }}>
                    {l.text}
                  </motion.div>
                ))}
              </motion.div>

              {/* Perforations */}
              <div className="mt-4 flex gap-1.5">
                {Array.from({ length: 18 }).map((_, i) => (
                  <div key={i} className="h-1.5 w-1.5 rounded-full" style={{ background:C.bg700 }} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Categorised */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="h-px flex-1" style={{ background:`linear-gradient(to right, ${C.gold}40, transparent)` }} />
              <span className="text-xs" style={{ color:C.gold }}>Imechakatwa · Processed</span>
              <div className="h-px flex-1" style={{ background:`linear-gradient(to left, ${C.gold}40, transparent)` }} />
            </div>

            <div className="flex flex-col gap-3">
              {categorised.map((item, i) => (
                <motion.div key={i} custom={i} variants={itemVariant}
                  initial="hidden" animate={inView ? 'visible' : 'hidden'}
                  className="rounded-xl p-4"
                  style={{ background:C.bg900, border:`1px solid ${C.bg700}` }}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-base"
                        style={{ background:C.bg800 }}>
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-xs font-semibold" style={{ color:item.color }}>{item.category}</div>
                        <div className="mt-0.5 text-xs" style={{ color:C.muted }}>{item.merchant}</div>
                        {item.time && <div className="mt-0.5 text-xs" style={{ color:C.bg600 }}>{item.time}</div>}
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-sm font-bold" style={{ color:item.amount.startsWith('−') ? C.terra : C.em }}>
                      {item.amount}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI tag */}
            <motion.div className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2"
              style={{ background:'rgba(154,106,10,0.07)', border:`1px solid rgba(154,106,10,0.2)` }}
              initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}}
              transition={{ delay:1.2, duration:0.5 }}>
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <p className="text-xs" style={{ color:C.muted }}>
                Categorised automatically by Claude AI.{' '}
                <span style={{ color:C.gold }}>Hakuna kuandika kwa mkono.</span>{' '}
                No manual entry.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
