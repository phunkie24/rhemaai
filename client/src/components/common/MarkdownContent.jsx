import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import sql from 'react-syntax-highlighter/dist/esm/languages/prism/sql'
import styles from '@pages/ContentPage.module.css'

SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('js', javascript)
SyntaxHighlighter.registerLanguage('jsx', javascript)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('ts', typescript)
SyntaxHighlighter.registerLanguage('tsx', typescript)
SyntaxHighlighter.registerLanguage('python', python)
SyntaxHighlighter.registerLanguage('py', python)
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('shell', bash)
SyntaxHighlighter.registerLanguage('sh', bash)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('yaml', yaml)
SyntaxHighlighter.registerLanguage('yml', yaml)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('html', markup)
SyntaxHighlighter.registerLanguage('xml', markup)
SyntaxHighlighter.registerLanguage('sql', sql)

function safeHref(value = '') {
  const href = value.trim()
  if (
    href.startsWith('/') ||
    href.startsWith('#') ||
    href.startsWith('https://') ||
    href.startsWith('http://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) return href
  return '#'
}

function safeAssetSrc(value = '') {
  const src = value.trim()
  if (
    src.startsWith('/') ||
    src.startsWith('https://') ||
    src.startsWith('http://') ||
    src.startsWith('data:image/')
  ) return src
  return ''
}

function normalizeMarkdown(value = '') {
  return String(value)
    .replace(/\r\n/g, '\n')
    .replace(/\\r\\n|\\n|\\r/g, '\n')
    .replace(/([^\n])\s+(#{1,6}\s+)/g, '$1\n\n$2')
    .replace(/([^\n])\s+([-*+]\s+(?:\*\*|[A-Z0-9]))/g, '$1\n$2')
    .replace(/([^\n])\s+(\d+\.\s+(?:\*\*|[A-Z0-9]))/g, '$1\n$2')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const MD_COMPONENTS = {
  pre({ children }) {
    return <>{children}</>
  },
  code({ className, children, node }) {
    const value = String(children).replace(/\n$/, '')
    const match = /language-([^\s]+)/.exec(className || '')
    const isBlock = node?.position?.start?.line !== node?.position?.end?.line

    if (match) {
      return (
        <SyntaxHighlighter
          language={match[1]}
          style={vscDarkPlus}
          customStyle={{
            margin: '28px 0',
            borderRadius: '10px',
            fontSize: '14px',
            lineHeight: '1.65',
          }}
          showLineNumbers
          wrapLongLines
        >
          {value}
        </SyntaxHighlighter>
      )
    }

    if (isBlock || value.includes('\n')) {
      return (
        <pre className={styles.codeBlock}>
          <code>{value}</code>
        </pre>
      )
    }

    return <code className={styles.inlineCode}>{children}</code>
  },
  img({ src, alt }) {
    const safeSrc = safeAssetSrc(src)
    if (!safeSrc) return null

    return (
      <figure className={styles.figure}>
        <img src={safeSrc} alt={alt || ''} className={styles.articleImage} loading="lazy" />
        {alt && <figcaption className={styles.figcaption}>{alt}</figcaption>}
      </figure>
    )
  },
  a({ href, children }) {
    const safe = safeHref(href)
    const isExternal = safe.startsWith('http')

    return (
      <a
        href={safe}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    )
  },
  table({ children }) {
    return (
      <div className={styles.tableWrap}>
        <table className={styles.table}>{children}</table>
      </div>
    )
  },
  th({ children }) {
    return <th className={styles.th}>{children}</th>
  },
  td({ children }) {
    return <td className={styles.td}>{children}</td>
  },
  blockquote({ children }) {
    return <blockquote className={styles.blockquote}>{children}</blockquote>
  },
  h1({ children }) {
    return <h2 className={styles.articleH2}>{children}</h2>
  },
  h2({ children }) {
    return <h2 className={styles.articleH2}>{children}</h2>
  },
  h3({ children }) {
    return <h3 className={styles.articleH3}>{children}</h3>
  },
  h4({ children }) {
    return <h4 className={styles.articleH4}>{children}</h4>
  },
  h5({ children }) {
    return <h4 className={styles.articleH4}>{children}</h4>
  },
  h6({ children }) {
    return <h4 className={styles.articleH4}>{children}</h4>
  },
  hr() {
    return <hr className={styles.hr} />
  },
}

export default function MarkdownContent({ children }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={MD_COMPONENTS}>
      {normalizeMarkdown(children)}
    </ReactMarkdown>
  )
}
