import React, { ChangeEventHandler, FormEventHandler, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import type { AuthCredentials, UserEmail } from '@/api/schemas/User'
import AuthService from '@/services/auth'
import { getCookie, setCookie } from '@/utils/cookies'
import Link from 'next/link'
import { AxiosError } from 'axios'
import useNotification, { OpenProps } from '@/hooks/useNotification'
import NotificationModal from '@/components/widgets/NotificationModal'
import Button from '@/components/widgets/Button'
import errorMessages from '@/utils/api/errorMessages'

const auth = new AuthService()

const Signin = () => {

  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  const [alert, handleAlert] = useNotification()

  const [email, setEmail] = useState<UserEmail>("")

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

      const credentials = await auth.login(email)
      setCookie("login", credentials, DAYS)

      handleAlert.open(({
        type: "success",
        title: "Inicio de Sesión",
        message: `Se ha iniciado sesión exitosamente"`,
      }))

      router.push("/")

    } catch (error) {
      setLoading(false)

      const { NOT_FOUND_USER } = errorMessages

      const generalMessage: OpenProps = {
        type: "danger",
        title: "Error ❌",
        message: `Ha habido un error en el inicio de sesión, intentelo de nuevo`,
      }

      const notFoundMessage: OpenProps = {
        type: "warning",
        title: "Correo no registrado",
        message: `El correo ingresado no se encuentra registrado, intentelo de nuevo`,
      }

      let errorMessage = generalMessage

      console.log('error', error)

      if (error instanceof AxiosError) {
        const { message } = error.response?.data
        errorMessage = (message === NOT_FOUND_USER) ? notFoundMessage : generalMessage
      }
      
      handleAlert.open(errorMessage)
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    setEmail(target.value)
  }

  console.log('email', email)

  console.log('alert', alert)

  return (
    <main className="h-screen">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-14 w-auto"
            src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/plant.png"
            alt="Your Company"
          />
          <h2 className="mt-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Inicia sesión en tu cuenta
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Correo Electrónico
                </label>
                <div className="text-sm">
                  <Link href="/sign-up" className="font-semibold text-emerald-600 hover:text-emerald-500">
                    No tienes planta?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="@myplant.com"
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <Button type="submit" loading={loading}>
                Iniciar sesión
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
      <NotificationModal alertProps={[alert, handleAlert]} />
    </main>
  )
}

export default Signin