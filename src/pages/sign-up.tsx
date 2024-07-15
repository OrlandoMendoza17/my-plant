import React, { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react'
import { AuthCredentials, UserEmail } from '@/api/schemas/User'
import Button from '@/components/widgets/Button'
import NotificationModal from '@/components/widgets/NotificationModal'
import useNotification, { OpenProps } from '@/hooks/useNotification'
import AuthService from '@/services/auth'
import errorMessages from '@/utils/api/errorMessages'
import { getCookie, setCookie } from '@/utils/cookies'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PlantService from '@/services/plants'

const auth = new AuthService()

const { DUPLICATED_EMAIL_NOT_ALLOWED } = errorMessages

const SignUp = () => {

  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  const [alert, handleAlert] = useNotification()

  const [state, setState] = useState({
    name: "",
    email: "",
  })

  useEffect(() => {
    const credentials = getCookie<AuthCredentials>("login")
    if (!credentials) {

      sessionStorage.clear()
      localStorage.clear()
      document.cookie = ""

    } else {
      router.push("/")
    }
  }, [])


  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      const DAYS = 10

      const credentials = await auth.create(state)
      const { user } = credentials
      const plant = new PlantService()
      
      await plant.create({
        currentPhase: 1,
        ants: false,
        bees: false,
        userId: user.userId,
        state: 'GOOD',
      })
      
      handleAlert.open(({
        type: "success",
        title: "Creación de Planta",
        message: `Se ha creado tu planta exitosamente"`,
      }))

      setCookie("login", credentials, DAYS)

      router.push("/")

    } catch (error: unknown) {
      setLoading(false)

      const duplicatedEmail: OpenProps = {
        type: "warning",
        title: "Correo Duplicado",
        message: `No es posible crear un nuevo usuario con un email ya registrado"`,
      }

      const generalError: OpenProps = {
        type: "danger",
        title: "Error ❌",
        message: `Ha habido un error en la creción del nuevo usuario, intentelo de nuevo"`,
      }

      let errorType = generalError

      console.log('error', error)

      if (error instanceof AxiosError) {
        const { message } = error.response?.data
        errorType = (message === DUPLICATED_EMAIL_NOT_ALLOWED) ? duplicatedEmail : generalError
      }

      handleAlert.open((errorType))
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setState({
      ...state,
      [name]: value
    })
  }

  const { name, email } = state
  console.log('state', state)

  return (
    <main className="h-screen">
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-14 w-auto"
              src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/plant.png"
              alt="Your Company"
            />
            <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Crea tu planta
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Correo Electrónico
                  </label>
                  <div className="text-sm">
                    <Link href="/sign-in" className="font-semibold text-emerald-600 hover:text-emerald-500">
                      Ya tienes tu planta?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    type="email"
                    autoComplete="email"
                    placeholder="@myplant.com"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <Button type="submit" loading={loading}>
                  Crear planta
                </Button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Siembra y cuida{' '}
              <span className="font-semibold leading-6 text-emerald-600">
                tu planta 🌱
              </span>
            </p>
          </div>
        </div>
      </>
      <NotificationModal alertProps={[alert, handleAlert]} />
    </main>
  )
}

export default SignUp