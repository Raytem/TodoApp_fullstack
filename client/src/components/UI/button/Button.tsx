import classNames from 'classnames'
import React, { FC } from 'react'
import { ButtonTypeEnum } from '../../../enums/ButtonTypeEnum'
import styles from './button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  variant?: ButtonTypeEnum,
}

export const Button: FC<ButtonProps> = ({children, variant, ...attributes}) => {

  function getClass() {
    switch(variant) {
      case ButtonTypeEnum.BLUE:
        return classNames(styles.button, styles.button__blue);
      case ButtonTypeEnum.RED:
        return classNames(styles.button, styles.button__red);
      default:
        return styles.button;
    }
  }

  return (
    <button className={getClass()} {...attributes}>{children}</button>
  )
}
