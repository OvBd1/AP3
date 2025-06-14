import { Outlet, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { tokenPayload } from '../interface/tokenPayload'
import { jwtDecode } from 'jwt-decode'

const navigation = [
  { name: 'Accueil', href: '/Home' },
  { name: 'Produits', href: '/Products' },
  { name: 'Panier', href: '/Cart' },
  { name: 'Profil', href: '/Profile' },
  { name: 'Admin', href: '/Admin' },
]

export default function MainLayout() {

  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const user = jwtDecode<tokenPayload>(token)
        setAdmin(user.auth)
      } catch (error) {
        console.error('Invalid token:', error)
        setAdmin(false)
      }
    }
  }, [])

  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const connected = localStorage.getItem('token') != null 
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/Home" className="-m-1.5 p-1.5">
              <img
                alt=""
                src="/images/gsb-logo.png"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              (!admin && item.name == "Admin") 
                ? '' 
                : <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                    {item.name}
                  </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {connected ? (
              <button
                onClick={handleLogout}
                className="text-sm/6 font-semibold text-gray-900"
              >
                Se déconnecter <span aria-hidden="true">&rarr;</span>
              </button>
            ) : (
              <a href="/login" className="text-sm/6 font-semibold text-gray-900">
                Se connecter <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <img
                  alt=""
                  src="/images/gsb-logo.png"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    (!admin && item.name == "Admin") 
                      ? '' 
                      :<a key={item.name} href={item.href} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                        {item.name}
                      </a>
                    ))}
                </div>
                <div className="py-6">
                  {connected ? (
                    <button
                      onClick={handleLogout}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Se déconnecter
                    </button>
                  ) : (
                    <a
                      href="/"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Se connecter
                    </a>
                  )}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
