import { useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {
  NexusHero,
  NexusPage,
  NexusSectionHeader,
} from '@components/Nexus/NexusComponents'
import { NEXUS_BASE } from '../data/nexusContent'
import {
  getNexusInterest,
  NEXUS_BUDGET_OPTIONS,
  NEXUS_INTEREST_OPTIONS,
} from '../data/nexusPricing'
import { nexusAPI } from '../utils/api'
import { trackNexusEvent } from '../utils/nexusAnalytics'
import styles from '@components/Nexus/Nexus.module.css'

const DEMO_COVERAGE = [
  'Agent orchestration',
  'Workflow planning',
  'Human approvals',
  'Enterprise-data access',
  'Policy enforcement',
  'Observability',
  'Exception handling',
  'Domain-specific agents',
  'Deployment architecture',
]

const ERROR_ORDER = ['fullName', 'workEmail', 'company', 'primaryUseCase', 'consent']

export default function NexusDemoPage() {
  const [searchParams] = useSearchParams()
  const [status, setStatus] = useState('idle')
  const started = useRef(false)
  const interest = getNexusInterest(searchParams.get('interest') || searchParams.get('engagement'))
  const domain = searchParams.get('domain') || ''

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      interest,
      indicativeBudget: 'not-defined',
      industry: domain,
      organisationSize: 'not-specified',
      aiMaturity: 'not-specified',
      cloudEnvironment: 'not-specified',
      deploymentOption: 'unsure',
      timeline: 'exploring',
      consent: false,
      website: '',
    },
  })

  const handleStart = () => {
    if (started.current) return
    started.current = true
    trackNexusEvent('nexus_demo_started', { route: `${NEXUS_BASE}/demo`, domain: domain || 'unspecified' })
  }

  const onSubmit = async (data) => {
    try {
      setStatus('submitting')
      await nexusAPI.requestDemo(data)
      setStatus('success')
      trackNexusEvent('nexus_demo_submitted', { route: `${NEXUS_BASE}/demo`, domain: domain || 'unspecified' })
      reset()
    } catch {
      setStatus('error')
      trackNexusEvent('nexus_demo_failed', { route: `${NEXUS_BASE}/demo`, domain: domain || 'unspecified' })
    }
  }

  const orderedErrors = ERROR_ORDER.filter((field) => errors[field])

  return (
    <NexusPage
      title="Nexus AOS Demo | RhemaAI Solutions Ltd"
      description="Request a tailored enterprise Nexus AOS demonstration covering agent orchestration, human approvals, policy, data integration, observability and deployment."
      keywords="Nexus AOS demo, enterprise AI agent demo, agent orchestration demonstration, CADABA"
      breadcrumbs={[{ label: 'Request Demo', path: `${NEXUS_BASE}/demo` }]}
      noFinalCta
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Nexus AOS Demonstration',
        provider: { '@type': 'Organization', name: 'RhemaAI Solutions Ltd' },
        description: 'Tailored enterprise demonstration of governed agentic workflows and Nexus AOS architecture.',
      }}
    >
      <NexusHero
        eyebrow="Tailored enterprise demonstration"
        title="See How Nexus AOS Can Orchestrate Your Enterprise Workflow"
        description="The demonstration will be tailored to your use case, systems, governance requirements, operating responsibilities and preferred deployment environment."
        aside={(
          <>
            <h2>What the session may cover</h2>
            <ul>{DEMO_COVERAGE.slice(0, 5).map((item) => <li key={item}>{item}</li>)}</ul>
          </>
        )}
      />

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader
            eyebrow="What to expect"
            title="A Demonstration Grounded in Your Operating Context"
            description="We use the information below to focus the session. Do not submit credentials, regulated records or confidential production data."
          />
          <div className={styles.demoLayout}>
            <aside className={styles.demoAside}>
              <h2>Demonstration coverage</h2>
              <ul>{DEMO_COVERAGE.map((item) => <li key={item}>{item}</li>)}</ul>
              <div className={styles.notice}>
                <strong>Privacy</strong>
                Submission data is used to respond to this Nexus request. It is not included in analytics events. Review our <Link to="/privacy">Privacy Policy</Link>.
              </div>
            </aside>

            <div className={styles.formCard}>
              {status === 'success' ? (
                <div className={styles.successState} role="status">
                  <span>Request received</span>
                  <h2>We’ll review the workflow before arranging the next step.</h2>
                  <p>Your request has been stored securely and sent to the RhemaAI business-contact destination. Please do not send credentials or confidential production data by email.</p>
                  <div className={styles.actions}>
                    <Link to={`${NEXUS_BASE}/architecture`} className={styles.primaryAction}>Explore architecture</Link>
                    <button type="button" className={styles.formReset} onClick={() => setStatus('idle')}>Submit another request</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} onFocus={handleStart} noValidate>
                  <div className={styles.formHeading}>
                    <span className={styles.sectionEyebrow}>Demo request</span>
                    <h2>Tell us about the workflow</h2>
                    <p>Fields marked * are required. Other context is optional.</p>
                  </div>

                  {orderedErrors.length > 0 && (
                    <div className={styles.errorSummary} role="alert" tabIndex="-1">
                      <strong>Please correct {orderedErrors.length} required field{orderedErrors.length === 1 ? '' : 's'}:</strong>
                      <ul>{orderedErrors.map((field) => <li key={field}><a href={`#demo-${field}`}>{errors[field].message}</a></li>)}</ul>
                    </div>
                  )}

                  <div className={styles.formGrid}>
                    <Field label="Full name *" error={errors.fullName}>
                      <input id="demo-fullName" autoComplete="name" {...register('fullName', { required: 'Full name is required.', minLength: { value: 2, message: 'Enter at least two characters.' } })} />
                    </Field>
                    <Field label="Work email *" error={errors.workEmail}>
                      <input id="demo-workEmail" type="email" autoComplete="email" {...register('workEmail', { required: 'Work email is required.', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid work email.' } })} />
                    </Field>
                    <Field label="Company *" error={errors.company}>
                      <input id="demo-company" autoComplete="organization" {...register('company', { required: 'Company is required.', minLength: { value: 2, message: 'Enter a valid company name.' } })} />
                    </Field>
                    <Field label="Job title">
                      <input id="demo-jobTitle" autoComplete="organization-title" {...register('jobTitle')} />
                    </Field>
                    <Field label="Country">
                      <input id="demo-country" autoComplete="country-name" {...register('country')} />
                    </Field>
                    <Field label="Organisation size">
                      <select id="demo-organisationSize" {...register('organisationSize')}>
                        <option value="not-specified">Prefer not to specify</option>
                        <option value="1-49">1–49</option><option value="50-249">50–249</option><option value="250-999">250–999</option><option value="1000-4999">1,000–4,999</option><option value="5000+">5,000+</option>
                      </select>
                    </Field>
                    <Field label="Industry or domain">
                      <input id="demo-industry" {...register('industry')} placeholder="e.g. Energy, financial services, data engineering" />
                    </Field>
                    <Field label="Current AI maturity">
                      <select id="demo-aiMaturity" {...register('aiMaturity')}>
                        <option value="not-specified">Prefer not to specify</option><option value="exploring">Exploring</option><option value="prototyping">Prototyping</option><option value="piloting">Piloting</option><option value="operational">Operational</option><option value="scaling">Scaling</option>
                      </select>
                    </Field>
                    <Field label="Existing cloud environment">
                      <select id="demo-cloudEnvironment" {...register('cloudEnvironment')}>
                        <option value="not-specified">Prefer not to specify</option><option value="azure">Microsoft Azure</option><option value="aws">AWS</option><option value="gcp">Google Cloud</option><option value="multi-cloud">Multi-cloud</option><option value="private-cloud">Private cloud</option><option value="hybrid">Hybrid</option><option value="on-premises">On-premises</option>
                      </select>
                    </Field>
                    <Field label="Desired deployment option">
                      <select id="demo-deploymentOption" {...register('deploymentOption')}>
                        <option value="unsure">Not yet decided</option><option value="azure">Microsoft Azure</option><option value="customer-kubernetes">Customer-managed Kubernetes</option><option value="private-cloud">Private cloud</option><option value="hybrid">Hybrid</option><option value="dedicated">Dedicated enterprise deployment</option>
                      </select>
                    </Field>
                    <Field label="Expected timeline">
                      <select id="demo-timeline" {...register('timeline')}>
                        <option value="exploring">Exploring</option><option value="0-3-months">0–3 months</option><option value="3-6-months">3–6 months</option><option value="6-12-months">6–12 months</option><option value="12-plus-months">12+ months</option>
                      </select>
                    </Field>
                    <Field label="What are you interested in?">
                      <select id="demo-interest" {...register('interest')}>
                        {NEXUS_INTEREST_OPTIONS.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
                      </select>
                    </Field>
                    <Field label="Indicative project budget">
                      <select id="demo-indicativeBudget" {...register('indicativeBudget')}>
                        {NEXUS_BUDGET_OPTIONS.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                      </select>
                    </Field>
                  </div>

                  <Field label="Primary use case *" error={errors.primaryUseCase} full>
                    <textarea id="demo-primaryUseCase" rows="5" {...register('primaryUseCase', { required: 'Primary use case is required.', minLength: { value: 20, message: 'Describe the use case in at least 20 characters.' } })} placeholder="Describe the workflow, accountable team and outcome—without confidential data." />
                  </Field>
                  <Field label="Required integrations" full>
                    <textarea id="demo-requiredIntegrations" rows="3" {...register('requiredIntegrations')} placeholder="Integration categories or systems; do not include credentials." />
                  </Field>
                  <Field label="Additional context" full>
                    <textarea id="demo-additionalContext" rows="4" {...register('additionalContext')} />
                  </Field>

                  <div className={styles.honeypot} aria-hidden="true">
                    <label htmlFor="demo-website">Website</label>
                    <input id="demo-website" tabIndex="-1" autoComplete="off" {...register('website')} />
                  </div>

                  <label className={`${styles.consent} ${errors.consent ? styles.fieldError : ''}`}>
                    <input id="demo-consent" type="checkbox" {...register('consent', { required: 'Consent is required.' })} />
                    <span>I consent to RhemaAI Solutions Ltd using this information to respond to my Nexus AOS request. *</span>
                  </label>
                  {errors.consent && <span className={styles.errorText}>{errors.consent.message}</span>}

                  {status === 'error' && (
                    <div className={styles.errorSummary} role="alert">
                      We could not submit the request. Try again or email info@rhemaaisolutions.tech.
                    </div>
                  )}

                  <button type="submit" className={styles.submitButton} disabled={isSubmitting || status === 'submitting'}>
                    {isSubmitting || status === 'submitting' ? 'Submitting securely…' : 'Request a Tailored Demo'}
                  </button>
                  <p className={styles.formLegal}>By submitting, you also agree to the site <Link to="/terms">Terms of Service</Link>. Do not include sensitive personal or operational information.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </NexusPage>
  )
}

function Field({ label, error, children, full = false }) {
  return (
    <label className={`${styles.formField} ${full ? styles.formFieldFull : ''} ${error ? styles.fieldError : ''}`}>
      <span>{label}</span>
      {children}
      {error && <em className={styles.errorText}>{error.message}</em>}
    </label>
  )
}
