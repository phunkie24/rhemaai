export const validContact = {
  name: 'Amaka Okafor',
  email: 'amaka@energycorp.ng',
  company: 'EnergyCore Nigeria',
  service: 'data-science',
  budget: '50k-100k',
  message: 'We need predictive maintenance models for our pipeline assets. Looking forward to a conversation.',
}

export const validInsight = {
  title: 'Test Insight Article',
  slug: 'test-insight-article',
  excerpt: 'A concise excerpt describing the content of this test article for verification purposes.',
  content: '## Introduction\n\nThis is the full content of the test insight article.',
  category: 'agentic-ai',
  tags: ['test', 'agentic-ai'],
  readTime: 5,
  published: true,
  publishedAt: new Date('2026-01-01'),
  author: { name: 'Test Author' },
}

export const unpublishedInsight = {
  title: 'Draft Insight Article',
  slug: 'draft-insight-article',
  excerpt: 'This article is not yet published.',
  content: '## Draft content here.',
  category: 'mlops',
  readTime: 3,
  published: false,
}
