import { NEXUS_PRIMARY_PRICING } from '../data/nexusPricing'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  NexusHero,
  NexusPage,
  NexusSectionHeader,
} from '@components/Nexus/NexusComponents'
import {
  ASSESSMENT_DIMENSIONS,
  ASSESSMENT_QUESTIONS,
} from '../data/nexusAssessment'
import { NEXUS_BASE } from '../data/nexusContent'
import {
  calculateAssessment,
  validateAssessmentSection,
} from '../utils/nexusAssessment'
import { nexusAPI } from '../utils/api'
import { trackNexusEvent } from '../utils/nexusAnalytics'
import styles from '@components/Nexus/Nexus.module.css'

const STORAGE_KEY = 'nexus-readiness-session-v1'

export default function NexusAssessmentPage() {
  const [started, setStarted] = useState(false)
  const [sectionIndex, setSectionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [errors, setErrors] = useState([])
  const [results, setResults] = useState(null)
  const [emailForm, setEmailForm] = useState({ fullName: '', workEmail: '', company: '', consent: false, website: '' })
  const [emailStatus, setEmailStatus] = useState('idle')

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || 'null')
      if (saved?.answers && Number.isInteger(saved.sectionIndex)) {
        setAnswers(saved.answers)
        setSectionIndex(Math.min(saved.sectionIndex, ASSESSMENT_DIMENSIONS.length - 1))
      }
    } catch {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    if (!results) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, sectionIndex }))
    }
  }, [answers, results, sectionIndex])

  const section = ASSESSMENT_DIMENSIONS[sectionIndex]
  const questions = useMemo(
    () => ASSESSMENT_QUESTIONS.filter((question) => question.dimension === section.slug),
    [section.slug]
  )
  const progress = results ? 100 : Math.round((sectionIndex / ASSESSMENT_DIMENSIONS.length) * 100)

  const start = () => {
    setStarted(true)
    trackNexusEvent('nexus_assessment_started', { route: `${NEXUS_BASE}/readiness-assessment` })
  }

  const updateScale = (questionId, value) => {
    setAnswers((current) => ({ ...current, [questionId]: Number(value) }))
    setErrors((current) => current.filter((id) => id !== questionId))
  }

  const updateMulti = (questionId, value, checked) => {
    setAnswers((current) => {
      const selected = Array.isArray(current[questionId]) ? current[questionId] : []
      return {
        ...current,
        [questionId]: checked
          ? [...new Set([...selected, value])]
          : selected.filter((item) => item !== value),
      }
    })
    setErrors((current) => current.filter((id) => id !== questionId))
  }

  const next = () => {
    const missing = validateAssessmentSection(section.slug, answers)
    if (missing.length) {
      setErrors(missing)
      document.getElementById(`assessment-${missing[0]}`)?.focus()
      return
    }

    trackNexusEvent('nexus_assessment_section_completed', {
      route: `${NEXUS_BASE}/readiness-assessment`,
      section: section.slug,
    })

    if (sectionIndex === ASSESSMENT_DIMENSIONS.length - 1) {
      const calculated = calculateAssessment(answers)
      setResults(calculated)
      sessionStorage.removeItem(STORAGE_KEY)
      trackNexusEvent('nexus_assessment_completed', {
        route: `${NEXUS_BASE}/readiness-assessment`,
        band: calculated.band.name,
      })
      window.scrollTo({ top: 0 })
      return
    }

    setSectionIndex((current) => current + 1)
    setErrors([])
    window.scrollTo({ top: 0 })
  }

  const back = () => {
    setSectionIndex((current) => Math.max(0, current - 1))
    setErrors([])
  }

  const restart = () => {
    setAnswers({})
    setSectionIndex(0)
    setErrors([])
    setResults(null)
    setStarted(false)
    setEmailStatus('idle')
    sessionStorage.removeItem(STORAGE_KEY)
  }

  const emailResults = async (event) => {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(emailForm.workEmail) || !emailForm.consent) {
      setEmailStatus('validation')
      return
    }
    try {
      setEmailStatus('submitting')
      await nexusAPI.emailAssessment({
        ...emailForm,
        assessmentScore: results.overallScore,
        assessmentBand: results.band.name,
        dimensionScores: results.dimensions,
      })
      setEmailStatus('success')
    } catch {
      setEmailStatus('error')
    }
  }

  return (
    <NexusPage
      title="Agentic AI Readiness Assessment | Nexus AOS"
      description="Complete a deterministic 12-dimension Nexus AOS readiness assessment covering strategy, data, integration, security, governance, oversight and operations."
      keywords="AI readiness assessment, agentic AI maturity, Nexus AOS assessment, AI governance readiness"
      breadcrumbs={[{ label: 'Readiness Assessment', path: `${NEXUS_BASE}/readiness-assessment` }]}
      noFinalCta
      structuredData={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Nexus AOS Agentic AI Readiness Self-Assessment',
        provider: { '@type': 'Organization', name: 'RhemaAI Solutions Ltd' },
      }}
    >
      {!started && !results && (
        <>
          <NexusHero
            eyebrow="12-dimension self-assessment"
            title="Assess Whether Your Organisation Is Ready for a Governed Agentic Workflow"
            description={`Begin the online component of the Nexus AI Readiness Assessment (${NEXUS_PRIMARY_PRICING[0].displayPrice}). Answer 48 structured questions across business strategy, process, data, integration, AI maturity, security, governance, oversight, observability, infrastructure and organisational capability.`}
            aside={(
              <>
                <h2>Transparent scoring</h2>
                <ul>
                  <li>Five-point maturity scales</li>
                  <li>Foundation checklists</li>
                  <li>Dimension-level results</li>
                  <li>Deterministic maturity band</li>
                </ul>
              </>
            )}
          >
            <div className={styles.actions}>
              <button type="button" className={styles.primaryAction} onClick={start}>Start the Assessment</button>
              <Link to={`${NEXUS_BASE}/demo?interest=readiness-assessment`} className={styles.secondaryAction}>Purchase the Full Assessment</Link>
            </div>
          </NexusHero>
          <section className={styles.section}>
            <div className={styles.sectionInner}>
              <NexusSectionHeader
                eyebrow="Before you begin"
                title="A Planning Aid, Not a Certification"
                description="This online result is one input to the paid advisory engagement, which also includes discovery, an executive report and a findings session. It is not regulatory certification, professional advice or a guaranteed technical assessment. Do not enter confidential, medical, account, credential or operationally sensitive information."
              />
              <div className={styles.grid3}>
                <article className={styles.card}><h3>About 15–20 minutes</h3><p>Four concise questions per dimension.</p></article>
                <article className={styles.card}><h3>Session-only progress</h3><p>Answers are saved only in this browser tab’s session until results are calculated.</p></article>
                <article className={styles.card}><h3>No personal data required</h3><p>Email is optional and requested only after results if you want a copy.</p></article>
              </div>
            </div>
          </section>
        </>
      )}

      {started && !results && (
        <>
          <header className={styles.assessmentHeader}>
            <div>
              <span className={styles.sectionEyebrow}>Readiness assessment</span>
              <h1>{section.name}</h1>
              <p>Section {sectionIndex + 1} of {ASSESSMENT_DIMENSIONS.length}</p>
            </div>
            <strong>{progress}% complete</strong>
          </header>
          <div className={styles.progressTrack} aria-label={`${progress}% complete`}>
            <span style={{ width: `${progress}%` }} />
          </div>
          <section className={styles.assessmentSection}>
            <nav className={styles.assessmentSteps} aria-label="Assessment sections">
              {ASSESSMENT_DIMENSIONS.map((dimension, index) => (
                <button
                  key={dimension.slug}
                  type="button"
                  disabled={index > sectionIndex}
                  className={index === sectionIndex ? styles.assessmentStepActive : index < sectionIndex ? styles.assessmentStepDone : ''}
                  onClick={() => index < sectionIndex && setSectionIndex(index)}
                  aria-current={index === sectionIndex ? 'step' : undefined}
                >
                  <span>{index + 1}</span>{dimension.name}
                </button>
              ))}
            </nav>
            <div className={styles.questionPanel}>
              {errors.length > 0 && (
                <div className={styles.errorSummary} role="alert">
                  Answer every question in this section before continuing.
                </div>
              )}
              {questions.map((question, questionIndex) => (
                <fieldset
                  id={`assessment-${question.id}`}
                  tabIndex="-1"
                  className={`${styles.question} ${errors.includes(question.id) ? styles.questionError : ''}`}
                  key={question.id}
                >
                  <legend><span>Question {questionIndex + 1}</span>{question.prompt}</legend>
                  {question.type === 'scale' ? (
                    <div className={styles.scaleOptions}>
                      {question.options.map((option) => (
                        <label key={option.value}>
                          <input
                            type="radio"
                            name={question.id}
                            value={option.value}
                            checked={answers[question.id] === option.value}
                            onChange={() => updateScale(question.id, option.value)}
                          />
                          <strong>{option.value}</strong>
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.multiOptions}>
                      {question.options.map((option) => (
                        <label key={option.value}>
                          <input
                            type="checkbox"
                            checked={(answers[question.id] || []).includes(option.value)}
                            onChange={(event) => updateMulti(question.id, option.value, event.target.checked)}
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </fieldset>
              ))}
              <div className={styles.assessmentActions}>
                <button type="button" onClick={back} disabled={sectionIndex === 0}>Back</button>
                <span>Progress is stored in this browser session only.</span>
                <button type="button" className={styles.primaryAction} onClick={next}>
                  {sectionIndex === ASSESSMENT_DIMENSIONS.length - 1 ? 'Calculate Results' : 'Next Section'}
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {results && (
        <AssessmentResults
          results={results}
          emailForm={emailForm}
          setEmailForm={setEmailForm}
          emailStatus={emailStatus}
          emailResults={emailResults}
          restart={restart}
        />
      )}
    </NexusPage>
  )
}

function AssessmentResults({ results, emailForm, setEmailForm, emailStatus, emailResults, restart }) {
  return (
    <>
      <header className={styles.resultsHero}>
        <span className={styles.sectionEyebrow}>Your deterministic self-assessment</span>
        <div className={styles.scoreRing} aria-label={`Overall score ${results.overallScore} out of 100`}>
          <strong>{results.overallScore}</strong><span>/100</span>
        </div>
        <h1>{results.band.name}</h1>
        <p>{results.band.action}</p>
        <div className={styles.actions}>
          <Link to={`${NEXUS_BASE}/demo?interest=${results.overallScore >= 50 ? 'standard-pilot' : 'workflow-discovery'}`} className={styles.primaryAction}>Discuss the Recommended Next Step</Link>
          <button type="button" className={styles.secondaryAction} onClick={restart}>Restart Assessment</button>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Dimension results" title="Readiness by Operating Dimension" description="Every dimension contributes equally to the overall score." />
          <div className={styles.dimensionGrid}>
            {results.dimensions.map((dimension) => (
              <article key={dimension.slug}>
                <div><strong>{dimension.name}</strong><span>{dimension.score}/100</span></div>
                <div className={styles.dimensionBar}><span style={{ width: `${dimension.score}%` }} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInner}>
          <div className={styles.grid3}>
            <article className={styles.card}>
              <h3>Top three strengths</h3>
              <ol className={styles.rankedList}>{results.strengths.map((item) => <li key={item.slug}>{item.name} <strong>{item.score}</strong></li>)}</ol>
            </article>
            <article className={styles.card}>
              <h3>Top three gaps</h3>
              <ol className={styles.rankedList}>{results.gaps.map((item) => <li key={item.slug}>{item.name} <strong>{item.score}</strong></li>)}</ol>
            </article>
            <article className={styles.card}>
              <h3>Recommended engagement</h3>
              <p><strong>{results.band.engagement}</strong></p>
              <p>{results.band.action}</p>
            </article>
          </div>
          <div className={styles.notice}>
            <strong>Interpretation boundary</strong>
            This score is based only on the answers supplied in this browser session. It is not a certification, regulatory conclusion or guarantee of production readiness.
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Recommended next actions" title="Turn the Score into Evidence" />
          <div className={styles.grid3}>
            <article className={styles.card}><h3>1. Validate the weakest dimensions</h3><p>Confirm evidence with accountable business, architecture, security and governance owners.</p></article>
            <article className={styles.card}><h3>2. Choose one bounded workflow</h3><p>Define a measurable outcome, exceptions, tools, authority boundaries and a human owner.</p></article>
            <article className={styles.card}><h3>3. Design the evaluation pathway</h3><p>Agree baseline, policy checks, failure handling and stop or scale criteria before implementation.</p></article>
          </div>
          <div className={styles.relatedLinks}>
            <Link to={`${NEXUS_BASE}/solutions/agentic-data-engineering`}>Agentic Data Engineering</Link>
            <Link to={`${NEXUS_BASE}/solutions/energy`}>Energy</Link>
            <Link to={`${NEXUS_BASE}/solutions/supply-chain`}>Supply Chain</Link>
            <Link to={`${NEXUS_BASE}/pricing`}>Pilot Packages</Link>
          </div>
        </div>
      </section>

      <section className={styles.sectionDark}>
        <div className={styles.sectionInner}>
          <NexusSectionHeader eyebrow="Optional" title="Receive a Copy of This Summary" description="Only your score, maturity band and dimension scores are sent. Individual answers are not transmitted." />
          <form className={styles.resultEmailForm} onSubmit={emailResults} noValidate>
            <label><span>Name</span><input value={emailForm.fullName} onChange={(event) => setEmailForm({ ...emailForm, fullName: event.target.value })} /></label>
            <label><span>Work email *</span><input type="email" value={emailForm.workEmail} onChange={(event) => setEmailForm({ ...emailForm, workEmail: event.target.value })} required /></label>
            <label><span>Company</span><input value={emailForm.company} onChange={(event) => setEmailForm({ ...emailForm, company: event.target.value })} /></label>
            <label className={styles.consent}><input type="checkbox" checked={emailForm.consent} onChange={(event) => setEmailForm({ ...emailForm, consent: event.target.checked })} /><span>I consent to receiving this requested assessment summary. *</span></label>
            <input className={styles.honeypot} tabIndex="-1" autoComplete="off" value={emailForm.website} onChange={(event) => setEmailForm({ ...emailForm, website: event.target.value })} aria-hidden="true" />
            {emailStatus === 'validation' && <p className={styles.inlineError} role="alert">Enter a valid email and provide consent.</p>}
            {emailStatus === 'error' && <p className={styles.inlineError} role="alert">The summary could not be sent. Please try again.</p>}
            {emailStatus === 'success' ? <p className={styles.inlineSuccess} role="status">Your summary has been requested.</p> : (
              <button type="submit" className={styles.primaryAction} disabled={emailStatus === 'submitting'}>{emailStatus === 'submitting' ? 'Sending…' : 'Email My Summary'}</button>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
