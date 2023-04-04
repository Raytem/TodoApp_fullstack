import React, { FC, useState } from 'react'
import styles from './input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<InputProps> = ({...props}) => {
    return (
        <div className={styles.searchSection}>
            <input className={styles.input} id='search' {...props}/>
            <label className={styles.lbl} htmlFor="search"></label>
        </div>
    )
}
