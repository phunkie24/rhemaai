import { Helmet } from 'react-helmet-async'
import styles from './ContentPage.module.css'

const LEGAL_COPY = {
  privacy: {
    label: 'Privacy',
    title: 'Privacy Policy',
    description: 'How RhemaAI Solutions Ltd handles client, prospect and website information.',
    sections: [
      ['Information we collect', 'We collect contact details, project context and website analytics needed to respond to enquiries, operate our services and improve the website experience.'],
      ['How we use information', 'We use information to communicate with you, evaluate project fit, deliver contracted work, protect our systems and meet legal or compliance obligations.'],
      ['Data protection', 'Client materials are handled with restricted access, reasonable technical safeguards and confidentiality practices appropriate for enterprise consulting engagements.'],
      ['Your choices', 'You can request access, correction or deletion of personal information by contacting info@rhemaaisolutions.tech.'],
    ],
  },
  terms: {
    label: 'Terms',
    title: 'Terms of Service',
    description: 'The baseline terms for using this website and engaging with RhemaAI Solutions Ltd.',
    sections: [
      ['Website use', 'The content on this website is provided for general information and does not create a consulting, legal, financial or technical services agreement by itself.'],
      ['Engagements', 'Paid work is governed by a separate statement of work, master services agreement or written proposal accepted by both parties.'],
      ['Intellectual property', 'RhemaAI Solutions Ltd website content, design and materials are protected by applicable intellectual property rights unless otherwise stated.'],
      ['Limitation', 'We aim to keep information accurate, but the website is provided as-is and may change without notice.'],
    ],
  },
  cookies: {
    label: 'Cookies',
    title: 'Cookie Policy',
    description: 'How this website may use cookies and similar technologies.',
    sections: [
      ['Essential cookies', 'Some cookies may be required for core website behavior, form protection, security and session stability.'],
      ['Analytics', 'We may use privacy-conscious analytics to understand aggregate usage patterns and improve content, navigation and performance.'],
      ['Third-party services', 'Embedded or linked services may set their own cookies under their respective policies.'],
      ['Control', 'You can manage cookies through your browser settings. Blocking some cookies may affect parts of the website.'],
    ],
  },
}

export default function LegalPage({ type = 'privacy' }) {
  const copy = LEGAL_COPY[type] || LEGAL_COPY.privacy

  return (
    <div className={styles.page}>
      <Helmet>
        <title>{copy.title} | RhemaAI Solutions Ltd</title>
        <meta name="description" content={copy.description} />
      </Helmet>

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.label}>{copy.label}</span>
          <h1 className={styles.title}>{copy.title}</h1>
          <p className={styles.subtitle}>{copy.description}</p>
        </div>
      </section>

      <section className={styles.content}>
        {copy.sections.map(([heading, body]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <p>{body}</p>
          </section>
        ))}
        <p>
          For questions about this page, contact <a href="mailto:info@rhemaaisolutions.tech">info@rhemaaisolutions.tech</a>.
        </p>
      </section>
    </div>
  )
}
