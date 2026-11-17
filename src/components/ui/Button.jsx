import { Link } from 'react-router-dom'
import './ui.css'

function Button({
  children,
  to,
  href,
  variant = 'solid',
  className = '',
  type = 'button',
  ...props
}) {
  const classes = `button button--${variant}${className ? ` ${className}` : ''}`

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button
