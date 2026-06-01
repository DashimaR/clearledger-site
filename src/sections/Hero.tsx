import { motion } from 'motion/react'
import { APP_URL, C } from '../constants'

// ── Chaos card data ───────────────────────────────────────────────────────────
type CardType = 'mpesa' | 'bank' | 'fuliza' | 'note'

interface Card {
  id: number; type: CardType; lines: string[]
  top: string; left: string; rotate: string
  delay: number; duration: number
  y: [number, number, number, number, number]
}

const cards: Card[] = [
  { id:1, type:'mpesa',
    lines:['Confirmed.','KES2,500.00 sent to','MAMA MBOGA','0712***678.','Bal: KES12,430.00','Cost: KES28.00'],
    top:'6%', left:'3%', rotate:'-3deg', delay:0, duration:7.2, y:[0,-11,3,-8,0] },
  { id:2, type:'bank',
    lines:['KCB BANK ALERT','Dr KES 8,000.00','TRANSFER OUT','Bal:KES23,450.00','12-May 14:32'],
    top:'3%', left:'50%', rotate:'2.5deg', delay:0.8, duration:9.1, y:[0,8,-4,9,0] },
  { id:3, type:'fuliza',
    lines:['Fuliza M-Pesa','Limit: KES 1,200','Repay KES340.00','by 15 Jun.'],
    top:'36%', left:'20%', rotate:'-2deg', delay:1.6, duration:8.3, y:[0,-7,5,-9,0] },
  { id:4, type:'mpesa',
    lines:['Confirmed.','Received KES15,000','from JOHN KAMAU','0722***123.','Bal: KES27,430'],
    top:'55%', left:'1%', rotate:'3.5deg', delay:0.3, duration:10, y:[0,9,-5,7,0] },
  { id:5, type:'note',
    lines:['rent  25,000 ✓','food  ????','airtime  500','school fees ??','petrol','saf broadband'],
    top:'52%', left:'53%', rotate:'-5deg', delay:2.1, duration:11, y:[0,-10,6,-8,0] },
  { id:6, type:'bank',
    lines:['M-Shwari Acct','Savings:KES4,250','Loan bal:KES3,000','Due: 30 Jun'],
    top:'74%', left:'26%', rotate:'1.5deg', delay:0.9, duration:8.7, y:[0,6,-8,4,0] },
  { id:7, type:'mpesa',
    lines:['Confirmed.','KES500.00 sent to','SAFARICOM DATA','Bundle activated.'],
    top:'77%', left:'60%', rotate:'-2.5deg', delay:1.4, duration:9.4, y:[0,-8,5,-6,0] },
]

const cardStyle: Record<CardType, { bg: string; border: string }> = {
  mpesa:  { bg:'#0D1710', border:'rgba(16,185,129,0.35)' },
  bank:   { bg:'#0A0D14', border:'rgba(59,130,246,0.35)' },
  fuliza: { bg:'#140A08', border:'rgba(196,87,43,0.55)'  },
  note:   { bg:'#131008', border:'rgba(212,168,67,0.35)' },
}

function ChaosCard({ type, lines, top, left, rotate, delay, duration, y }: Card) {
  const { bg, border } = cardStyle[type]
  return (
    <div className="absolute select-none" style={{ top, left, transform:`rotate(${rotate})` }}>
      <motion.div
        animate={{ y }}
        transition={{ duration, repeat: Infinity, ease:'easeInOut', delay }}
        style={{ background:bg, border:`1px solid ${border}`, borderRadius:'6px',
          padding:'10px 12px', minWidth:'148px', maxWidth:'182px',
          boxShadow:'0 6px 28px rgba(0,0,0,0.5)' }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{
            fontFamily:'inherit', fontSize:'11px', lineHeight:'1.55',
            color: type==='note' ? '#9A8E73' : i===0 ? '#A89880' : '#5A5248',
            fontWeight: i===0 && type!=='note' ? '600' : '400',
          }}>
            {line}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// ── Maasai divider ────────────────────────────────────────────────────────────
function MaasaiDivider() {
  return <div className="maasai-divider" />
}

// ── Clarity preview card ──────────────────────────────────────────────────────
function ClarityCard() {
  return (
    <div className="w-full max-w-xs rounded-xl p-5"
      style={{ background:C.bg800, border:`1px solid ${C.bg700}` }}>
      <div className="mb-4">
        <div style={{ fontSize:'10px', color:C.muted, marginBottom:'2px' }}>Net Worth</div>
        <div style={{ fontSize:'26px', fontWeight:'700', color:C.em, letterSpacing:'-0.5px' }}>KES 134,500</div>
        <div style={{ fontSize:'10px', color:C.em, marginTop:'2px' }}>↑ 12% this month</div>
      </div>
      <div style={{ height:'1px', background:C.bg700, margin:'12px 0' }} />
      <div className="mb-4">
        <div style={{ fontSize:'10px', color:C.muted, marginBottom:'8px' }}>Latest transaction</div>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div style={{ fontSize:'11px', color:C.warm, fontWeight:'600' }}>MAMA MBOGA</div>
            <div style={{ fontSize:'10px', color:C.em, marginTop:'2px' }}>🥦 Chakula · Food</div>
          </div>
          <div style={{ fontSize:'12px', color:C.terra, fontWeight:'600', flexShrink:0 }}>−KES 2,500</div>
        </div>
      </div>
      <div style={{ height:'1px', background:C.bg700, margin:'12px 0' }} />
      <div className="flex items-center gap-3">
        <div className="budget-ring flex-shrink-0">
          <div className="budget-ring-inner">67%</div>
        </div>
        <div>
          <div style={{ fontSize:'11px', color:C.warm, fontWeight:'600' }}>Chakula · Food</div>
          <div style={{ fontSize:'10px', color:C.muted, marginTop:'2px' }}>KES 5,350 of KES 8,000</div>
        </div>
      </div>
    </div>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section className="relative flex overflow-hidden"
      style={{ height:'calc(100vh - 57px)', minHeight:'600px' }}>

      {/* Chaos — intentionally dark: receipts scattered on a shadowed desk */}
      <div className="relative flex-1 overflow-hidden noise-overlay" style={{ background:'#1C1208' }}>
        <div className="absolute inset-0 z-10 pointer-events-none"
          style={{ background:'radial-gradient(ellipse 70% 70% at 55% 45%, transparent 30%, rgba(12,8,2,0.75) 100%)' }}
        />
        <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 rounded-full px-3 py-1 text-xs"
          style={{ background:'rgba(12,8,2,0.82)', color:'#9A8B7A', border:'1px solid #3D2E1E' }}>
          kabla · before
        </div>
        {cards.map(c => <ChaosCard key={c.id} {...c} />)}
      </div>

      {/* Divider */}
      <MaasaiDivider />

      {/* Clarity */}
      <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-8 py-12"
        style={{ background:`linear-gradient(135deg, ${C.bg950} 0%, ${C.bg900} 100%)` }}>
        <div className="pointer-events-none absolute inset-0"
          style={{ background:'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(11,122,82,0.07), transparent)' }}
        />
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs"
          style={{ background:'rgba(11,122,82,0.1)', color:C.em, border:'1px solid rgba(11,122,82,0.25)' }}>
          baada · after
        </div>

        <motion.div
          initial={{ opacity:0, y:22 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, delay:0.2, ease:[0.25,0.1,0.25,1] }}
          className="relative z-10 flex flex-col items-start gap-5 w-full max-w-sm"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs"
            style={{ background:'rgba(154,106,10,0.1)', border:'1px solid rgba(154,106,10,0.28)', color:C.gold }}>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Built for Kenya · M-Pesa native
          </div>

          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl" style={{ color:C.text, margin:0 }}>
              Financial clarity,
            </h1>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl" style={{ color:C.em, margin:0 }}>
              finally within reach.
            </h1>
          </div>

          <p className="text-sm leading-relaxed" style={{ color:C.muted, maxWidth:'300px' }}>
            Reconcile M-Pesa, bank, and cash in one place.{' '}
            <span style={{ color:C.gold }}>Uwazi wa fedha.</span>{' '}
            Your money, finally clear.
          </p>

          <ClarityCard />

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-5 py-2.5 text-sm font-medium text-slate-950 transition-all hover:bg-emerald-400"
              style={{ boxShadow:'0 0 28px rgba(16,185,129,0.22)' }}>
              Anza bure · Start free
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <a href={`${APP_URL}/login`}
              className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm transition-colors"
              style={{ border:`1px solid ${C.bg700}`, color:C.muted, background:C.bg800 }}>
              Sign in
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
