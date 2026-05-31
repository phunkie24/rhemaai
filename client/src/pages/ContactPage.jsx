import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { contactAPI } from '@utils/api'
import styles from './ContactPage.module.css'

const SERVICES = [
  { value: 'agentic-ai',          label: 'Agentic AI Engineering' },
  { value: 'generative-ai',       label: 'Generative AI & LLM Systems Design' },
  { value: 'ai-advisory',         label: 'AI Advisory & Governance' },
  { value: 'data-engineering',    label: 'Data Engineering & Platforms' },
  { value: 'data-science',        label: 'Data Science & Advanced Analytics' },
  { value: 'cloud-architecture',  label: 'Cloud Architecture' },
  { value: 'mlops',               label: 'MLOps & DataOps' },
  { value: 'software-engineering',label: 'Enterprise Software Engineering' },
  { value: 'fintech-blockchain',  label: 'FinTech & Blockchain' },
  { value: 'general',             label: 'General Enquiry' },
]

const BUDGETS = [
  { value: 'under-10k',    label: 'Under $10,000' },
  { value: '10k-50k',      label: '$10,000 - $50,000' },
  { value: '50k-100k',     label: '$50,000 - $100,000' },
  { value: 'above-100k',   label: '$100,000+' },
  { value: 'not-specified',label: 'Prefer not to say' },
]

export default function ContactPage() {
  const [submitStatus, setSubmitStatus] = useState('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { service: 'general', budget: 'not-specified' } })

  const onSubmit = async (data) => {
    try {
      setSubmitStatus('loading')
      await contactAPI.submit(data)
      setSubmitStatus('success')
      reset()
    } catch (err) {
      setSubmitStatus('error')
    }
  }

  return (
    <>
      <Helmet>
        <title>Book a Consultation | RhemaAI Solutions Ltd</title>
        <meta name="description" content="Book a free consultation with RhemaAI Solutions Ltd. Discuss your enterprise AI, cloud architecture, data engineering, or advanced analytics needs." />
      </Helmet>

      <div className={styles.page}>
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className={styles.leftInner}>
            <span className={styles.label}>Let's Talk</span>
            <h1 className={styles.title}>
              Start Your<br />
              <span className={styles.accent}>AI Transformation</span>
            </h1>
            <p className={styles.desc}>
              Book a free discovery consultation. We'll assess your needs, outline a
              solution architecture, and show you exactly how we can deliver measurable impact.
            </p>

            <a href="tel:+2349043138981" className={styles.phoneLink}>
              <span className={styles.phoneIcon}>PH</span>
              <span>
                <strong>Call RhemaAI Solutions Ltd</strong>
                <em>+234 904 313 8981</em>
              </span>
            </a>

            <div className={styles.infoCards}>
              {[
                { icon: '24', title: '24-Hour Response', desc: 'We respond to every enquiry within one business day.' },
                { icon: 'DC', title: 'Free Discovery Call', desc: 'No-commitment strategy session to map your AI roadmap.' },
                { icon: 'GL', title: 'Global Clients', desc: 'We serve enterprises across Africa, Europe, and North America.' },
                { icon: 'ND', title: 'NDA Available', desc: 'We sign NDAs before discussing sensitive project details.' },
              ].map((card) => (
                <div key={card.title} className={styles.infoCard}>
                  <span className={styles.infoIcon}>{card.icon}</span>
                  <div>
                    <div className={styles.infoTitle}>{card.title}</div>
                    <div className={styles.infoDesc}>{card.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <div className={styles.formCard}>
            {submitStatus === 'success' ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>OK</div>
                <h2>Request Received!</h2>
                <p>Thank you for reaching out. Our team will be in touch within 24 hours.</p>
                <button onClick={() => setSubmitStatus('idle')} className={styles.resetBtn}>
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <h2 className={styles.formTitle}>Book a Consultation</h2>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label>Full Name *</label>
                    <input
                      {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Minimum 2 characters' } })}
                      placeholder="Funke Yusuf"
                      className={errors.name ? styles.inputError : ''}
                    />
                    {errors.name && <span className={styles.errorMsg}>{errors.name.message}</span>}
                  </div>
                  <div className={styles.field}>
                    <label>Email Address *</label>
                    <input
                      type="email"
                      {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
                      placeholder="you@company.com"
                      className={errors.email ? styles.inputError : ''}
                    />
                    {errors.email && <span className={styles.errorMsg}>{errors.email.message}</span>}
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Company / Organisation</label>
                  <input
                    {...register('company')}
                    placeholder="Acme Enterprises Ltd"
                  />
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label>Service Area *</label>
                    <select {...register('service')}>
                      {SERVICES.map((s) => (
                        <option key={s.value} value={s.value}>{s.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label>Project Budget</label>
                    <select {...register('budget')}>
                      {BUDGETS.map((b) => (
                        <option key={b.value} value={b.value}>{b.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.field}>
                  <label>Project Brief *</label>
                  <textarea
                    {...register('message', {
                      required: 'Please describe your project',
                      minLength: { value: 10, message: 'Please provide more detail' },
                    })}
                    placeholder="Tell us about your project, current challenges, and what success looks like for you..."
                    rows={5}
                    className={errors.message ? styles.inputError : ''}
                  />
                  {errors.message && <span className={styles.errorMsg}>{errors.message.message}</span>}
                </div>

                {submitStatus === 'error' && (
                  <div className={styles.formError}>
                    Something went wrong. Please try again or email us directly at hello@rhemaai.tech
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSubmitting || submitStatus === 'loading'}
                >
                  {isSubmitting || submitStatus === 'loading'
                    ? 'Sending...'
                    : 'Send Consultation Request'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}
