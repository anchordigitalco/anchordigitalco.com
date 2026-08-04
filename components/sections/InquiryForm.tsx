'use client'
import { forwardRef, InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ChevronDown } from 'lucide-react'
import PillButton from '@/components/PillButton'
import Reveal from '@/components/Reveal'

const DESCRIBES = [
  'Restaurant or cafe',
  'Clothing or streetwear brand',
  'Personal brand or creator',
  'Fitness or coaching',
  'Local business',
  'Other',
]
const TIMELINES = ['As soon as possible', 'Next 1 to 3 months', 'Later this year', 'Exploring']

interface FormData {
  name: string
  email: string
  company: string
  describes: string
  describesOther: string
  need: string
  timeline: string
  message: string
}

const fieldClass =
  'peer w-full border-b border-hairline bg-transparent pb-2.5 pt-6 text-body text-ink placeholder-transparent focus:border-ink focus:border-b-[1.5px] focus:outline-none transition-colors duration-300'
const labelClass =
  'pointer-events-none absolute left-0 top-6 text-body text-ink-muted transition-all duration-[250ms] ease-reveal ' +
  'peer-focus:top-0 peer-focus:text-label peer-focus:text-ink-muted ' +
  'peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-label peer-[:not(:placeholder-shown)]:text-ink-muted'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  required?: boolean
  error?: string
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  { id, label, required, error, ...rest },
  ref
) {
  return (
    <div className="relative">
      <input ref={ref} id={id} placeholder=" " className={fieldClass} {...rest} />
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span className="ml-1">*</span>}
      </label>
      {error && <p className="mt-1 text-label text-ink">{error}</p>}
    </div>
  )
})

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label: string
}

const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(function TextAreaField(
  { id, label, ...rest },
  ref
) {
  return (
    <div className="relative">
      <textarea ref={ref} id={id} placeholder=" " rows={3} className={`${fieldClass} resize-none`} {...rest} />
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
    </div>
  )
})

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  label: string
  required?: boolean
  options: string[]
  error?: string
}

const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(function SelectField(
  { id, label, required, options, error, ...rest },
  ref
) {
  return (
    <div className="relative">
      <select ref={ref} id={id} defaultValue="" className={`${fieldClass} appearance-none pr-6`} {...rest}>
        <option value="" disabled hidden>
          {' '}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {/* Selects always show a value (even the blank first option), so the
          label is permanently floated rather than toggling with content —
          there's no native ":placeholder-shown" equivalent for <select>. */}
      <label htmlFor={id} className="pointer-events-none absolute left-0 top-0 text-label text-ink-muted">
        {label}
        {required && <span className="ml-1">*</span>}
      </label>
      <ChevronDown size={14} className="pointer-events-none absolute right-0 top-7 text-ink-faint" />
      {error && <p className="mt-1 text-label text-ink">{error}</p>}
    </div>
  )
})

export default function InquiryForm() {
  const [submitFailed, setSubmitFailed] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>()

  const describesOther = watch('describes') === 'Other'

  const onSubmit = async (data: FormData) => {
    setSubmitFailed(false)
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => null)

    // A non-ok response or a network failure both mean the message never
    // reached us — only show success once the send is actually confirmed.
    if (!res || !res.ok) {
      setSubmitFailed(true)
      throw new Error('submit failed')
    }
  }

  if (isSubmitSuccessful) {
    return (
      <div className="py-4">
        <Reveal as="p" split="lines" immediate className="block text-lead font-normal text-ink">
          {['Got it, thank you.', "We'll reply soon."]}
        </Reveal>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      <TextField id="name" label="Full name" required {...register('name', { required: 'Please enter your name.' })} error={errors.name?.message} />
      <TextField
        id="email"
        type="email"
        label="Work email"
        required
        {...register('email', {
          required: 'Please enter your email.',
          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email.' },
        })}
        error={errors.email?.message}
      />
      <TextField id="company" label="Company" {...register('company')} />
      <SelectField
        id="describes"
        label="What best describes you?"
        required
        options={DESCRIBES}
        {...register('describes', { required: 'Please choose one.' })}
        error={errors.describes?.message}
      />
      {describesOther && (
        <TextField
          id="describesOther"
          label="Tell us more"
          required
          {...register('describesOther', { required: 'Please tell us a bit more.' })}
          error={errors.describesOther?.message}
        />
      )}
      <TextField
        id="need"
        label="What do you need?"
        required
        {...register('need', { required: 'Please tell us what you need.' })}
        error={errors.need?.message}
      />
      <SelectField id="timeline" label="Timeline" options={TIMELINES} {...register('timeline')} />
      <TextAreaField id="message" label="How can we help?" {...register('message')} />

      <div className="flex items-center gap-6 pt-2">
        <PillButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending…' : 'Send'}
        </PillButton>
      </div>

      {submitFailed && (
        <p className="text-small text-ink">
          Something went wrong sending that. Please try again, or email us directly at{' '}
          <a href="mailto:adam@anchordigitalco.com" className="underline underline-offset-2">
            adam@anchordigitalco.com
          </a>
          .
        </p>
      )}

      <p className="max-w-[46ch] text-label text-ink-muted">
        By submitting, you agree to be contacted about your project. See our privacy policy.
      </p>
    </form>
  )
}
