import React, { FC, useState } from 'react'
import styles from './input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<InputProps> = ({...props}) => {
    return (
        <input {...props} className={styles.input}/>
    )
}
