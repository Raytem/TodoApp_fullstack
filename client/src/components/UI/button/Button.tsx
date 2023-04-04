import React, { FC } from 'react'
import styles from './button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

export const Button: FC<ButtonProps> = ({children, ...attributes}) => {
  return (
    <button className={styles.button} {...attributes}>{children}</button>
  )
}
