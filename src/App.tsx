import { APP_URL, C } from './constants'
import { Hero }         from './sections/Hero'
import { Transactions } from './sections/Transactions'
import { Accounts }     from './sections/Accounts'
import { Budgets }      from './sections/Budgets'
import { Goals }        from './sections/Goals'
import { Loans }        from './sections/Loans'
import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

// ── Shared divider ────────────────────────────────────────────────────────────
function SectionDivider() {
  return (
    <div className="w-full" style={{
      height:'2px',
      background:`repeating-linear-gradient(to right, ${C.gold} 0px, ${C.gold} 8px, transparent 8px, transparent 16px)`,
      opacity:0.45,
    }} />
  )
}

// ── Arrow icon ────────────────────────────────────────────────────────────────
function Arrow() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  )
}

// ── Trust / Built for Kenya ───────────────────────────────────────────────────
function Kenya() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once:true, amount:0.2 })
  const items = [
    { label:'M-Pesa ready',      detail:'PDF, SMS & CSV import' },
    { label:'5+ account types',  detail:'Mobile, bank, cash, SACCO' },
    { label:'AI categorisation', detail:'Powered by Claude' },
    { label:'KES native',        detail:'Built for Kenyan shillings' },
    { label:'Loan tracking',     detail:'Fuliza, M-Shwari & more' },
    { label:'Tax-aware',         detail:'KRA compliance built in' },
  ]
  return (
    <section ref={ref} className="px-6 py-24" style={{ background:C.bg900 }}>
      <div className="mx-auto max-w-5xl">
        <motion.div className="mb-12 max-w-lg"
          initial={{ opacity:0, y:20 }} animate={inView ? { opacity:1, y:0 } : {}}
          transition={{ duration:0.6 }}>
          <p className="mb-2 text-xs" style={{ color:C.gold }}>— imetengenezwa hapa</p>
          <h2 className="text-3xl font-bold" style={{ color:C.text }}>
            Built for the Kenyan<br />financial reality.
          </h2>
          <p className="mt-3 text-sm leading-relaxed" style={{ color:C.muted }}>
            Not a generic app ported from San Francisco.
            Designed around how Kenyans actually move money.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {items.map((item, i) => (
            <motion.div key={item.label} className="rounded-lg p-4"
              style={{ background:C.bg800, border:`1px solid ${C.bg700}` }}
              initial={{ opacity:0, y:12 }} animate={inView ? { opacity:1, y:0 } : {}}
              transition={{ delay: i * 0.07 + 0.2 }}>
              <div className="mb-1 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 flex-shrink-0" style={{ color:C.gold }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <span className="text-sm font-medium" style={{ color:C.warm }}>{item.label}</span>
              </div>
              <p className="pl-6 text-xs" style={{ color:C.bg600 }}>{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ background:C.bg950, color:C.text, fontFamily:"'Nunito', system-ui, sans-serif", minHeight:'100vh' }}>

      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-md"
        style={{ background:'rgba(252,247,239,0.93)', borderBottom:`1px solid rgba(154,106,10,0.18)`, boxShadow:'0 1px 16px rgba(60,42,24,0.06)' }}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500 text-xs font-bold text-slate-950">CL</div>
            <span className="text-sm font-bold tracking-wide" style={{ color:C.text }}>ClearLedger</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={`${APP_URL}/login`} className="rounded-md px-4 py-2 text-sm transition-colors" style={{ color:C.muted }}>Sign in</a>
            <a href={`${APP_URL}/register`} className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400">Get started</a>
          </div>
        </nav>
      </header>

      {/* Sections */}
      <Hero />
      <SectionDivider />
      <Transactions />
      <SectionDivider />
      <Accounts />
      <SectionDivider />
      <Budgets />
      <SectionDivider />
      <Goals />
      <SectionDivider />
      <Loans />
      <SectionDivider />
      <Kenya />
      <SectionDivider />

      {/* CTA */}
      <section className="px-6 py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold" style={{ color:C.text }}>Anza leo.<br />Start today.</h2>
          <p className="mt-4 text-sm" style={{ color:C.muted }}>Free to get started. No credit card. Your data stays yours.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-8 py-3 text-sm font-medium text-slate-950 transition-all hover:bg-emerald-400"
              style={{ boxShadow:'0 0 32px rgba(11,122,82,0.18)' }}>
              Create your free account <Arrow />
            </a>
            <a href={`${APP_URL}/login`} className="text-sm transition-colors" style={{ color:C.bg600 }}>
              Already have an account? Sign in →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop:`1px solid ${C.bg800}` }} className="px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-xs font-bold text-slate-950">CL</div>
            <span className="text-sm" style={{ color:C.muted }}>ClearLedger</span>
            <span className="text-xs" style={{ color:C.bg600 }}>· Mwanga</span>
          </div>
          <div className="flex items-center gap-6 text-xs" style={{ color:C.bg600 }}>
            <a href={`${APP_URL}/login`} className="transition-colors hover:text-emerald-400">Sign in</a>
            <a href={`${APP_URL}/register`} className="transition-colors hover:text-emerald-400">Register</a>
            <span>© {new Date().getFullYear()} ClearLedger</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
