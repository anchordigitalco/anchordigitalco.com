'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Check, ArrowRight, ArrowLeft } from 'lucide-react'
import clsx from 'clsx'

const INDUSTRIES = [
  'Restaurant / Cafe',
  'Clothing / Streetwear Brand',
  'Personal Brand / Creator',
  'Barbershop / Salon',
  'Photographer / Artist',
  'Startup / Small Business',
  'Athlete / Sports Organization',
  'Local Service Business',
  'E-commerce / Retail',
  'Other',
]

const PROJECT_NEEDS = [
  'New Website',
  'Website Redesign',
  'E-commerce Store',
  'Booking System',
  'Blog / CMS',
  'Landing Page',
  'Other',
]

const STYLE_OPTIONS = [
  { label: 'Minimal / Clean', description: 'Less is more. White space, clarity, precision.' },
  { label: 'Bold / Expressive', description: 'Strong typography, high contrast, impactful.' },
  { label: 'Luxury / High-end', description: 'Refined, editorial, premium aesthetic.' },
  { label: 'Playful / Fun', description: 'Colorful, approachable, personality-forward.' },
]

const THEME_OPTIONS = [
  { label: 'Dark Mode', description: 'Dark backgrounds, light text.' },
  { label: 'Light Mode', description: 'Clean white/light backgrounds.' },
  { label: 'No Preference', description: 'You decide what works best.' },
]

const BUDGET_RANGES = [
  'Starter — $50/mo',
  'Growth — $150/mo',
  'Elite — $300/mo',
  'Not sure yet',
]

const REFERRAL_SOURCES = [
  'Google Search',
  'Social Media (Instagram / TikTok)',
  'Friend / Word of Mouth',
  'LinkedIn',
  'Online Ad',
  'Other',
]

interface FormData {
  businessName: string
  industry: string
  currentWebsite: string
  projectNeeds: string[]
  stylePreference: string
  themePreference: string
  budget: string
  launchDate: string
  name: string
  email: string
  phone: string
  referral: string
}

const TOTAL_STEPS = 5

export default function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<FormData>>({
    projectNeeds: [],
  })
  const [submitted, setSubmitted] = useState(false)
  const [direction, setDirection] = useState(1)

  const { register, handleSubmit, formState: { errors }, trigger, getValues } = useForm<FormData>()

  const goNext = async () => {
    const fields = getFieldsForStep(step)
    const valid = await trigger(fields as any)
    if (!valid) return
    const values = getValues()
    setFormData((prev) => ({ ...prev, ...values }))
    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  const goPrev = () => {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 1))
  }

  const getFieldsForStep = (s: number): (keyof FormData)[] => {
    const map: Record<number, (keyof FormData)[]> = {
      1: ['businessName', 'industry'],
      2: [],
      3: [],
      4: ['budget'],
      5: ['name', 'email'],
    }
    return map[s] || []
  }

  const toggleNeed = (need: string) => {
    setFormData((prev) => {
      const current = prev.projectNeeds || []
      return {
        ...prev,
        projectNeeds: current.includes(need)
          ? current.filter((n) => n !== need)
          : [...current, need],
      }
    })
  }

  const handleFinalSubmit = (data: FormData) => {
    const finalData = { ...formData, ...data }
    console.log('Form submitted:', finalData)
    setSubmitted(true)
  }

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center py-20"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-20 h-20 rounded-full bg-gold/15 border-2 border-gold flex items-center justify-center mx-auto mb-8"
        >
          <Check size={36} className="text-gold" strokeWidth={2} />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-cormorant text-4xl lg:text-5xl font-300 text-cream mb-4"
        >
          You&apos;re on the list.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-charcoal-300 text-lg max-w-md mx-auto leading-relaxed"
        >
          We&apos;ll be in touch within 24 hours with next steps. Check your email at{' '}
          <span className="text-gold">{formData.email}</span>.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 inline-flex items-center gap-2 font-sans text-sm text-charcoal-400"
        >
          <div className="w-4 h-px bg-charcoal-500" />
          Average response time: under 4 hours
          <div className="w-4 h-px bg-charcoal-500" />
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="font-sans text-xs text-charcoal-300 tracking-wide">
            Step {step} of {TOTAL_STEPS}
          </span>
          <span className="font-sans text-xs text-charcoal-300 tracking-wide">
            {Math.round((step / TOTAL_STEPS) * 100)}% complete
          </span>
        </div>
        <div className="h-px bg-charcoal-700 relative overflow-hidden rounded-full">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gold rounded-full"
            initial={{ width: `${((step - 1) / TOTAL_STEPS) * 100}%` }}
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        {/* Step dots */}
        <div className="flex items-center gap-2 mt-3">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={clsx(
                'h-1 rounded-full transition-all duration-500',
                i + 1 < step
                  ? 'bg-gold flex-1'
                  : i + 1 === step
                  ? 'bg-gold flex-[2]'
                  : 'bg-charcoal-700 flex-1'
              )}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFinalSubmit)}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-cormorant text-3xl lg:text-4xl font-300 text-cream mb-2">
                    Tell us about your business.
                  </h2>
                  <p className="font-sans text-sm text-charcoal-300">
                    Just the basics to get started.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="font-sans text-xs tracking-[0.12em] uppercase text-charcoal-300 block mb-2">
                      Business Name *
                    </label>
                    <input
                      {...register('businessName', { required: 'Required' })}
                      placeholder="e.g. Nuevo Sabor Restaurant"
                      className="form-input w-full px-4 py-3 rounded-sm font-sans text-sm"
                    />
                    {errors.businessName && (
                      <p className="font-sans text-xs text-red-400 mt-1">{errors.businessName.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="font-sans text-xs tracking-[0.12em] uppercase text-charcoal-300 block mb-2">
                      Industry *
                    </label>
                    <select
                      {...register('industry', { required: 'Required' })}
                      className="form-input w-full px-4 py-3 rounded-sm font-sans text-sm appearance-none"
                    >
                      <option value="" className="bg-charcoal-800">Select your industry</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind} className="bg-charcoal-800">{ind}</option>
                      ))}
                    </select>
                    {errors.industry && (
                      <p className="font-sans text-xs text-red-400 mt-1">{errors.industry.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="font-sans text-xs tracking-[0.12em] uppercase text-charcoal-300 block mb-2">
                      Current Website URL <span className="text-charcoal-500 normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      {...register('currentWebsite')}
                      placeholder="https://yoursite.com"
                      className="form-input w-full px-4 py-3 rounded-sm font-sans text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-cormorant text-3xl lg:text-4xl font-300 text-cream mb-2">
                    What do you need?
                  </h2>
                  <p className="font-sans text-sm text-charcoal-300">
                    Select everything that applies.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {PROJECT_NEEDS.map((need) => {
                    const selected = (formData.projectNeeds || []).includes(need)
                    return (
                      <button
                        key={need}
                        type="button"
                        onClick={() => toggleNeed(need)}
                        className={clsx(
                          'text-left px-4 py-4 rounded-sm border font-sans text-sm transition-all duration-200',
                          selected
                            ? 'border-gold/60 bg-gold/10 text-cream'
                            : 'border-charcoal-600 bg-charcoal-800 text-charcoal-300 hover:border-charcoal-400 hover:text-cream'
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <div className={clsx(
                            'w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center transition-all',
                            selected ? 'bg-gold border-gold' : 'border-charcoal-500'
                          )}>
                            {selected && <Check size={10} strokeWidth={3} className="text-charcoal-900" />}
                          </div>
                          {need}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-cormorant text-3xl lg:text-4xl font-300 text-cream mb-2">
                    What&apos;s your style?
                  </h2>
                  <p className="font-sans text-sm text-charcoal-300">
                    This helps us nail the visual direction.
                  </p>
                </div>
                <div className="space-y-3">
                  <label className="font-sans text-xs tracking-[0.12em] uppercase text-charcoal-300 block">
                    Visual Style
                  </label>
                  {STYLE_OPTIONS.map((opt) => {
                    const selected = formData.stylePreference === opt.label
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => setFormData((p) => ({ ...p, stylePreference: opt.label }))}
                        className={clsx(
                          'w-full text-left px-5 py-4 rounded-sm border transition-all duration-200 flex items-center justify-between gap-4',
                          selected
                            ? 'border-gold/60 bg-gold/10'
                            : 'border-charcoal-600 bg-charcoal-800 hover:border-charcoal-400'
                        )}
                      >
                        <div>
                          <div className={clsx('font-sans text-sm font-500', selected ? 'text-cream' : 'text-charcoal-200')}>
                            {opt.label}
                          </div>
                          <div className="font-sans text-xs text-charcoal-400 mt-0.5">{opt.description}</div>
                        </div>
                        <div className={clsx(
                          'w-4 h-4 rounded-full border flex-shrink-0 transition-all',
                          selected ? 'border-gold bg-gold' : 'border-charcoal-500'
                        )}>
                          {selected && (
                            <div className="w-full h-full rounded-full flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-charcoal-900" />
                            </div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
                <div className="space-y-3">
                  <label className="font-sans text-xs tracking-[0.12em] uppercase text-charcoal-300 block">
                    Color Theme
                  </label>
                  <div className="flex gap-3">
                    {THEME_OPTIONS.map((opt) => {
                      const selected = formData.themePreference === opt.label
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => setFormData((p) => ({ ...p, themePreference: opt.label }))}
                          className={clsx(
                            'flex-1 py-3 px-3 rounded-sm border font-sans text-xs transition-all duration-200 text-center',
                            selected
                              ? 'border-gold/60 bg-gold/10 text-cream'
                              : 'border-charcoal-600 bg-charcoal-800 text-charcoal-300 hover:border-charcoal-400'
                          )}
                        >
                          {opt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-cormorant text-3xl lg:text-4xl font-300 text-cream mb-2">
                    Budget & timeline.
                  </h2>
                  <p className="font-sans text-sm text-charcoal-300">
                    We&apos;ll make it work for your situation.
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="font-sans text-xs tracking-[0.12em] uppercase text-charcoal-300 block mb-2">
                      Monthly Budget Range *
                    </label>
                    <select
                      {...register('budget', { required: 'Please select a budget range' })}
                      className="form-input w-full px-4 py-3 rounded-sm font-sans text-sm appearance-none"
                    >
                      <option value="" className="bg-charcoal-800">Select a range</option>
                      {BUDGET_RANGES.map((b) => (
                        <option key={b} value={b} className="bg-charcoal-800">{b}</option>
                      ))}
                    </select>
                    {errors.budget && (
                      <p className="font-sans text-xs text-red-400 mt-1">{errors.budget.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="font-sans text-xs tracking-[0.12em] uppercase text-charcoal-300 block mb-2">
                      Desired Launch Date <span className="text-charcoal-500 normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      {...register('launchDate')}
                      type="text"
                      placeholder="e.g. Within 2 weeks, End of month, ASAP..."
                      className="form-input w-full px-4 py-3 rounded-sm font-sans text-sm"
                    />
                  </div>
                </div>
                {/* Fast launch callout */}
                <div className="bg-gold/8 border border-gold/25 rounded-sm p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    <span className="font-sans text-xs tracking-[0.12em] uppercase text-gold font-500">
                      Fast Launch Available
                    </span>
                  </div>
                  <p className="font-sans text-sm text-charcoal-200 leading-relaxed">
                    Need it fast? Our <strong className="text-cream">Website in 7 Days</strong> offer
                    delivers a fully built, launched site in one week. Ask us about it.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 5 */}
            {step === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-cormorant text-3xl lg:text-4xl font-300 text-cream mb-2">
                    Last step.
                  </h2>
                  <p className="font-sans text-sm text-charcoal-300">
                    How do we reach you?
                  </p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="font-sans text-xs tracking-[0.12em] uppercase text-charcoal-300 block mb-2">
                      Your Name *
                    </label>
                    <input
                      {...register('name', { required: 'Required' })}
                      placeholder="Full name"
                      className="form-input w-full px-4 py-3 rounded-sm font-sans text-sm"
                    />
                    {errors.name && (
                      <p className="font-sans text-xs text-red-400 mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="font-sans text-xs tracking-[0.12em] uppercase text-charcoal-300 block mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email', {
                        required: 'Required',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                      })}
                      type="email"
                      placeholder="hello@yourbusiness.com"
                      className="form-input w-full px-4 py-3 rounded-sm font-sans text-sm"
                    />
                    {errors.email && (
                      <p className="font-sans text-xs text-red-400 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="font-sans text-xs tracking-[0.12em] uppercase text-charcoal-300 block mb-2">
                      Phone <span className="text-charcoal-500 normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="form-input w-full px-4 py-3 rounded-sm font-sans text-sm"
                    />
                  </div>
                  <div>
                    <label className="font-sans text-xs tracking-[0.12em] uppercase text-charcoal-300 block mb-2">
                      How did you find us?
                    </label>
                    <select
                      {...register('referral')}
                      className="form-input w-full px-4 py-3 rounded-sm font-sans text-sm appearance-none"
                    >
                      <option value="" className="bg-charcoal-800">Select one</option>
                      {REFERRAL_SOURCES.map((s) => (
                        <option key={s} value={s} className="bg-charcoal-800">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-charcoal-700">
          {step > 1 ? (
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex items-center gap-2 font-sans text-sm text-charcoal-300 hover:text-cream transition-colors duration-200"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={goNext}
              className="btn-primary inline-flex items-center gap-2 font-sans text-sm px-7 py-3.5 rounded-sm"
            >
              Continue
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              className="btn-primary inline-flex items-center gap-2 font-sans text-sm px-7 py-3.5 rounded-sm"
            >
              Submit Project Brief
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
