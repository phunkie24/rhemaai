import logo from '../../assets/branding/rhemaai-logo-gold-96.webp'
import logoRetina from '../../assets/branding/rhemaai-logo-gold-192.webp'

export default function BrandMark({ className = '', title = 'RhemaAI Solutions Ltd', loading = 'eager' }) {
  return (
    <img
      className={className}
      src={logo}
      srcSet={`${logoRetina} 2x`}
      width={40}
      height={40}
      alt={title}
      decoding="async"
      loading={loading}
    />
  )
}
