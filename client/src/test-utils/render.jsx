import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

export function renderWithProviders(ui, { route = '/', ...options } = {}) {
  function Wrapper({ children }) {
    return (
      <HelmetProvider>
        <MemoryRouter
          initialEntries={[route]}
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          {children}
        </MemoryRouter>
      </HelmetProvider>
    )
  }
  return render(ui, { wrapper: Wrapper, ...options })
}

export * from '@testing-library/react'
export { renderWithProviders as render }
