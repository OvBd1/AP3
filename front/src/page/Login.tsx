import { useState } from 'react'
import { api } from '../utils/api' 
import { useNavigate } from 'react-router-dom'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    num_tel: '',
    date_naissance: '',
    mail: '',
    mdp: '',
  })

  const navigate = useNavigate() 

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    const endpoint = isLogin ? '/auth' : '/users'

    try {
      const requestData = isLogin
        ? { mail: formData.mail, mdp: formData.mdp } 
        : { ...formData } 

      const response = await api.post(endpoint, requestData) as { access_token: string }
      if (isLogin) {
        localStorage.setItem('token', response.access_token)
        console.log('Logged in successfully')
      } else {
        const loginResponse = await api.post('/auth', {
          mail: formData.mail,
          mdp: formData.mdp,
        }) as { access_token: string }

        localStorage.setItem('token', loginResponse.access_token)
        console.log('Signed up and logged in successfully')
        
      }
      navigate("/")
    } catch (error) {
      console.error('There was a problem with the request:', error)
    }
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="/images/gsb-logo.png"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="nom" className="block text-sm/6 font-medium text-gray-900">
                    Last Name
                  </label>
                  <div className="">
                    <input
                      id="nom"
                      name="nom"
                      type="text"
                      required
                      value={formData.nom}
                      onChange={handleChange}
                      className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="prenom" className="block text-sm/6 font-medium text-gray-900">
                    First Name
                  </label>
                  <div className="">
                    <input
                      id="prenom"
                      name="prenom"
                      type="text"
                      required
                      value={formData.prenom}
                      onChange={handleChange}
                      className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="num_tel" className="block text-sm/6 font-medium text-gray-900">
                    Phone Number
                  </label>
                  <div className="">
                    <input
                      id="num_tel"
                      name="num_tel"
                      type="tel"
                      required
                      value={formData.num_tel}
                      onChange={handleChange}
                      className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="date_naissance" className="block text-sm/6 font-medium text-gray-900">
                    Date of Birth
                  </label>
                  <div className="">
                    <input
                      id="date_naissance"
                      name="date_naissance"
                      type="date"
                      required
                      value={formData.date_naissance}
                      onChange={handleChange}
                      className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                    />
                  </div>
                </div>
              </>
            )}
            <div>
              <label htmlFor="mail" className="block text-sm/6 font-medium text-gray-900">
                Email address
              </label>
              <div className="">
                <input
                  id="mail"
                  name="mail"
                  type="email"
                  required
                  autoComplete="email"
                  value={formData.mail}
                  onChange={handleChange}
                  className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="mdp" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="">
                <input
                  id="mdp"
                  name="mdp"
                  type="password"
                  required
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  value={formData.mdp}
                  onChange={handleChange}
                  className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="text-sm px-4 bg-blue py-2.5 w-full text-white font-semibold tracking-wide hover:bg-slate-100 text-slate-900 rounded-md"
              >
                {isLogin ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            {isLogin ? 'Not a member? ' : 'Already a member? '}
            <a href="#" onClick={toggleForm} className="font-semibold text-indigo-600 hover:text-indigo-500">
              {isLogin ? 'Register now' : 'Login now'}
            </a>
          </p>
        </div>
      </div>
    </>
  )
}