import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Loader2, ArrowLeft } from 'lucide-react'
import AuthModal from './AuthModal'
import type { ReactNode } from 'react'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const [showModal, setShowModal] = useState(true)
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-gh-accent-blue animate-spin" />
      </div>
    )
  }

  if (!user) {
    return (
      <>
        <div className="pointer-events-none select-none filter blur-sm opacity-40">
          {children}
        </div>
        {showModal ? (
          <AuthModal
            onClose={() => setShowModal(false)}
            message="Sign in to continue"
          />
        ) : (
          <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="text-center bg-gh-surface border border-gh-border rounded-2xl p-8 max-w-sm mx-4">
              <span className="text-4xl mb-3 block">🔒</span>
              <h3 className="text-lg font-semibold text-white mb-2">Sign in required</h3>
              <p className="text-sm text-gh-text-secondary mb-5">You need to sign in to access this feature.</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => navigate('/')}
                  className="px-5 py-2.5 bg-gh-border hover:bg-gh-border/80 text-gh-text-secondary font-medium rounded-lg transition text-sm flex items-center gap-1.5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition text-sm"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  }

  return <>{children}</>
}
