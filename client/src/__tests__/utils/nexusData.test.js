import { describe, expect, it } from 'vitest'
import {
  formatDesignCount,
  getNexusDomain,
  NEXUS_DOMAINS,
} from '../../data/nexusDomains'
import {
  ASSESSMENT_DIMENSIONS,
  ASSESSMENT_QUESTIONS,
} from '../../data/nexusAssessment'
import {
  calculateAssessment,
  getMaturityBand,
  validateAssessmentSection,
} from '../../utils/nexusAssessment'

describe('Nexus domain catalogue', () => {
  it('contains the twenty unique, route-safe application domains', () => {
    expect(NEXUS_DOMAINS).toHaveLength(20)
    expect(new Set(NEXUS_DOMAINS.map((domain) => domain.slug)).size).toBe(20)
    expect(NEXUS_DOMAINS.every((domain) => getNexusDomain(domain.slug) === domain)).toBe(true)
  })

  it('preserves the supplied Energy research-design distribution without presenting deployments', () => {
    const energy = getNexusDomain('energy')
    expect(energy.designCount).toBe(3839)
    expect(energy.percentage).toBe(76.8)
    expect(formatDesignCount(energy.designCount)).toBe('3,839')
    expect(energy.description.toLowerCase()).not.toContain('deployment')
    expect(energy.description.toLowerCase()).not.toContain('customer')
  })
})

describe('Nexus readiness scoring', () => {
  it('contains exactly four questions in each of twelve dimensions', () => {
    expect(ASSESSMENT_DIMENSIONS).toHaveLength(12)
    expect(ASSESSMENT_QUESTIONS).toHaveLength(48)
    for (const dimension of ASSESSMENT_DIMENSIONS) {
      expect(ASSESSMENT_QUESTIONS.filter((question) => question.dimension === dimension.slug)).toHaveLength(4)
    }
  })

  it.each([
    [0, 'Foundation Required'],
    [24, 'Foundation Required'],
    [25, 'Emerging'],
    [49, 'Emerging'],
    [50, 'Pilot Ready'],
    [69, 'Pilot Ready'],
    [70, 'Scale Ready'],
    [84, 'Scale Ready'],
    [85, 'Advanced'],
    [100, 'Advanced'],
  ])('maps score %i to %s', (score, band) => {
    expect(getMaturityBand(score).name).toBe(band)
  })

  it('calculates deterministic maximum results and validates incomplete sections', () => {
    const answers = Object.fromEntries(ASSESSMENT_QUESTIONS.map((question) => [
      question.id,
      question.type === 'scale' ? 5 : question.options.map((option) => option.value),
    ]))
    const results = calculateAssessment(answers)

    expect(results.overallScore).toBe(100)
    expect(results.band.name).toBe('Advanced')
    expect(results.dimensions).toHaveLength(12)
    expect(validateAssessmentSection(ASSESSMENT_DIMENSIONS[0].slug, answers)).toEqual([])
    expect(validateAssessmentSection(ASSESSMENT_DIMENSIONS[0].slug, {})).toHaveLength(4)
  })
})
