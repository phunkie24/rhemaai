import {
  ASSESSMENT_DIMENSIONS,
  ASSESSMENT_QUESTIONS,
  MATURITY_BANDS,
} from '../data/nexusAssessment'

function questionScore(question, answer) {
  if (question.type === 'scale') {
    const value = Number(answer)
    return Number.isFinite(value) ? ((value - 1) / 4) * 100 : null
  }
  if (question.type === 'multi') {
    return Array.isArray(answer)
      ? (answer.length / question.options.length) * 100
      : null
  }
  return null
}

export function getMaturityBand(score) {
  const rounded = Math.max(0, Math.min(100, Math.round(Number(score) || 0)))
  return MATURITY_BANDS.find((band) => rounded >= band.min && rounded <= band.max)
}

export function calculateAssessment(answers = {}) {
  const dimensions = ASSESSMENT_DIMENSIONS.map((dimension) => {
    const questions = ASSESSMENT_QUESTIONS.filter((question) => question.dimension === dimension.slug)
    const scores = questions
      .map((question) => questionScore(question, answers[question.id]))
      .filter((score) => score !== null)
    const score = scores.length
      ? Math.round(scores.reduce((total, value) => total + value, 0) / scores.length)
      : 0
    return { ...dimension, score }
  })

  const overallScore = Math.round(
    dimensions.reduce((total, dimension) => total + dimension.score, 0) / dimensions.length
  )
  const ranked = [...dimensions].sort((a, b) => b.score - a.score || a.name.localeCompare(b.name))
  const strengths = ranked.slice(0, 3)
  const gaps = ranked.slice(-3).reverse()

  return {
    overallScore,
    band: getMaturityBand(overallScore),
    dimensions,
    strengths,
    gaps,
  }
}

export function validateAssessmentSection(dimensionSlug, answers = {}) {
  return ASSESSMENT_QUESTIONS
    .filter((question) => question.dimension === dimensionSlug)
    .filter((question) => {
      const answer = answers[question.id]
      return question.type === 'multi'
        ? !Array.isArray(answer) || answer.length === 0
        : answer == null || answer === ''
    })
    .map((question) => question.id)
}
