import React, { ReactNode, ButtonHTMLAttributes} from 'react'
import Spinner from './Spinner'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean,
  noSpinner?: boolean,
  children: ReactNode | JSX.Element[] | JSX.Element,
}

const Button = (props: Props) => {

  const { loading = false, type = "button", noSpinner = false, className, children, ...buttonProps } = props

  const spinner = noSpinner ? "Cargando..." : <Spinner text size="small" />

  return (
    <button
      type={type}
      disabled={loading}
      className={`Button ${className}`}
      {...buttonProps}
    >
      {
        !loading ? children : spinner
      }
    </button>
  )
}
export default Button;