import { User, UserEmail } from '@/api/schemas/User'
import AuthService from '@/services/auth'
import { setCookie } from '@/utils/cookies'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FormEventHandler, useEffect, useRef, useState } from 'react'

const auth = new AuthService()

const Signin = () => {

  const router = useRouter()
  
  const [email, setEmail] = useState<UserEmail>("")
  
  useEffect(() => {
    console.log('router', router)
  }, [])

  
  const handleSubmit: FormEventHandler<HTMLFormElement> = () => {
    auth.login(email)
    // setCookie("credentials", email)
  }

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
              Inicia sesión en tu cuenta
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">

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
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  Iniciar sesión
                </button>
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
    </main>
  )
}

export default Signin