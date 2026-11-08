import logo from '../../assets/branding/rhemaai-ribbon-96.png'
import logoRetina from '../../assets/branding/rhemaai-ribbon-192.png'

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
