import {Link as NavLink} from 'react-router'
export function Link ({ href, children, ...restOfProps }) {

  return (
    <NavLink href={href} {...restOfProps} >
      {children}
    </NavLink>
  )
}