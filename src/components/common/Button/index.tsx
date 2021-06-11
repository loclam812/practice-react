import React from 'react'

import './button.scss'

export default function Button (props: {
  children: any;
  classModifier?: string;
  handleClick?: any;
  isDisabled?: boolean;
  type?: any;
}) {
  const {
    children, classModifier = '', handleClick, isDisabled, type = 'button'
  } = props
  const className = `btn ${isDisabled ? '--disabled' : ''} ${classModifier}`

  return (
    <button
      type={type}
      className={className}
      disabled={isDisabled}
      onClick={handleClick}
    >
      { children }
    </button>
  )
}
