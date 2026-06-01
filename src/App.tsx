// ClearLedger — Landing Page
// Standalone Vite + React + Tailwind site.
// Links point to the ClearLedger app. Update APP_URL when the app is live.

const APP_URL = 'https://app.clearledger.co.ke'

// ── Data ────────────────────────────────────────────────────────────────────

const features = [
  {
    name: 'Transactions',
    tagline: 'Every shilling, accounted for',
    description:
      'Import M-Pesa PDFs, bank statements, or SMS messages. AI categorises each entry automatically — no manual tagging required.',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    ringColor: 'ring-emerald-500/20',
    pillBg: 'bg-emerald-500/10',
    pillText: 'text-emerald-300',
    hoverBorder: 'hover:border-emerald-500/40',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 3M21 7.5H7.5" />
      </svg>
    ),
  },
  {
    name: 'Accounts',
    tagline: 'All accounts, one view',
    description:
      'M-Pesa wallets, bank accounts, cash, and savings — see your true net worth at a glance, updated in real time.',
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-400',
    ringColor: 'ring-sky-500/20',
    pillBg: 'bg-sky-500/10',
    pillText: 'text-sky-300',
    hoverBorder: 'hover:border-sky-500/40',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>
    ),
  },
  {
    name: 'Budgets',
    tagline: 'Spend with intention',
    description:
      'Set monthly limits per category. Live progress bars and alerts keep you on track before you overspend.',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    ringColor: 'ring-violet-500/20',
    pillBg: 'bg-violet-500/10',
    pillText: 'text-violet-300',
    hoverBorder: 'hover:border-violet-500/40',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
      </svg>
    ),
  },
  {
    name: 'Goals',
    tagline: 'Save with a deadline',
    description:
      'Name your goal, set a target and date, then watch your progress grow. Completion is detected automatically when you hit the mark.',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    ringColor: 'ring-amber-500/20',
    pillBg: 'bg-amber-500/10',
    pillText: 'text-amber-300',
    hoverBorder: 'hover:border-amber-500/40',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    name: 'Loans',
    tagline: 'Know exactly what you owe',
    description:
      'Track Fuliza, M-Shwari, KCB M-Pesa, bank loans, and SACCOs. See balance, interest rate, and next due date in one place.',
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-400',
    ringColor: 'ring-rose-500/20',
    pillBg: 'bg-rose-500/10',
    pillText: 'text-rose-300',
    hoverBorder: 'hover:border-rose-500/40',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
      </svg>
    ),
  },
]

const steps = [
  {
    number: '01',
    title: 'Connect your accounts',
    description:
      'Import M-Pesa statements, upload bank CSVs, or forward SMS messages. Works with all major Kenyan banks and mobile money.',
  },
  {
    number: '02',
    title: 'AI categorises everything',
    description:
      'Claude AI reads each transaction and assigns a category automatically. Review and adjust with one tap — no spreadsheets needed.',
  },
  {
    number: '03',
    title: 'See your full picture',
    description:
      'Budgets, goals, loans, and net worth — all updated in real time. Make financial decisions with complete confidence.',
  },
]

const trustItems = [
  { label: 'M-Pesa ready',      detail: 'PDF, SMS & CSV import' },
  { label: '5+ account types',  detail: 'Mobile, bank, cash, SACCO' },
  { label: 'AI categorisation', detail: 'Powered by Claude' },
  { label: 'KES native',        detail: 'Built for Kenyan shillings' },
  { label: 'Loan tracking',     detail: 'Fuliza, M-Shwari & more' },
  { label: 'Tax-aware',         detail: 'KRA compliance built in' },
]

// ── Icons ────────────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  )
}

function ArrowRight({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100" style={{ fontFamily: "'IBM Plex Mono', Menlo, monospace" }}>

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500 text-xs font-bold text-slate-950">
              CL
            </div>
            <span className="text-sm font-bold tracking-wide">ClearLedger</span>
          </div>
          <div className="flex items-center gap-3">
            <a href={`${APP_URL}/login`} className="rounded-md px-4 py-2 text-sm text-slate-300 transition-colors hover:text-white">
              Sign in
            </a>
            <a href={`${APP_URL}/register`} className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-emerald-400">
              Get started
            </a>
          </div>
        </nav>
      </header>

      <main>

        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-24 pt-20">
          <div aria-hidden className="pointer-events-none absolute inset-0 flex items-start justify-center">
            <div className="h-[600px] w-[900px] rounded-full bg-emerald-500/5 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs text-emerald-300">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Built for Kenya · M-Pesa native
            </div>
            <h1 className="text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
              Financial clarity,{' '}
              <span className="text-emerald-400">finally within reach.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              Reconcile M-Pesa, bank, and cash in one place. AI-powered categorisation, real-time
              budgets, savings goals, and loan tracking — built for the Kenyan financial reality.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-6 py-3 text-sm font-medium text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/25"
              >
                Start for free <ArrowRight />
              </a>
              <a
                href={`${APP_URL}/login`}
                className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-6 py-3 text-sm text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
              >
                Sign in to your account
              </a>
            </div>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
              {features.map((f) => (
                <span key={f.name} className="rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-xs text-slate-400">
                  {f.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold text-white">Everything you need, nothing you don't</h2>
              <p className="mt-3 text-slate-400">Five core modules that cover your entire financial life.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.name} className={`group rounded-xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-200 hover:bg-slate-900 ${f.hoverBorder}`}>
                  <div className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ${f.iconBg} ${f.ringColor}`}>
                    <span className={f.iconColor}>{f.icon}</span>
                  </div>
                  <div className={`mb-3 inline-block rounded-full px-2.5 py-0.5 text-xs ${f.pillBg} ${f.pillText}`}>
                    {f.name}
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-white">{f.tagline}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-slate-800/60 bg-slate-900/40 px-6 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-14 text-center">
              <h2 className="text-3xl font-bold text-white">Up and running in minutes</h2>
              <p className="mt-3 text-slate-400">No accountant required.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              {steps.map((step, i) => (
                <div key={step.number} className="relative">
                  {i < steps.length - 1 && (
                    <div aria-hidden className="absolute left-[calc(50%+2rem)] top-5 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-emerald-500/40 to-slate-700/40 sm:block" />
                  )}
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-sm font-bold text-emerald-400">
                      {step.number}
                    </div>
                    <h3 className="mb-2 text-base font-semibold text-white">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Built for Kenya */}
        <section className="px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-white">Built for the Kenyan financial reality</h2>
              <p className="mt-3 text-slate-400">Not a generic budgeting app. Designed around how Kenyans actually move money.</p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {trustItems.map((item) => (
                <div key={item.label} className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <CheckIcon />
                    <span className="text-sm font-medium text-white">{item.label}</span>
                  </div>
                  <p className="pl-6 text-xs text-slate-500">{item.detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center">
              <p className="text-sm text-slate-300">
                <span className="font-semibold text-emerald-400">M-Pesa statement import</span>
                {' '}— upload your PDF and every transaction is parsed, categorised, and added to your
                ledger automatically. No typing. No spreadsheets.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="border-t border-slate-800/60 px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold text-white">Start tracking your finances today.</h2>
            <p className="mt-4 text-slate-400">Free to get started. No credit card required. Your data stays yours.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-8 py-3 text-sm font-medium text-slate-950 transition-all hover:bg-emerald-400 hover:shadow-xl hover:shadow-emerald-500/25"
              >
                Create your free account <ArrowRight />
              </a>
              <a href={`${APP_URL}/login`} className="text-sm text-slate-500 transition-colors hover:text-slate-300">
                Already have an account? Sign in →
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 px-6 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-500 text-xs font-bold text-slate-950">CL</div>
            <span className="text-sm text-slate-400">ClearLedger</span>
            <span className="text-xs text-slate-600">· Financial clarity for Kenya</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <a href={`${APP_URL}/login`} className="transition-colors hover:text-slate-400">Sign in</a>
            <a href={`${APP_URL}/register`} className="transition-colors hover:text-slate-400">Register</a>
            <span>© {new Date().getFullYear()} ClearLedger</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
