import classNames from 'classnames'
import React, { FC, useRef, useState } from 'react'
import { InputTypeEnum } from './InputTypeEnum'
import styles from './input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: InputTypeEnum
    isInvalid?: boolean
}

export const Input: FC<InputProps> = ({variant, isInvalid, ...rest}) => {

    function getClass() {
        switch(variant) {
          case InputTypeEnum.SEARCH:
            return classNames(styles.input, styles.input__search);
          case InputTypeEnum.PASSWORD:
            return classNames(styles.input, styles.input__password);
          default:
            return styles.input;
        }
    }

    const inputRef = useRef<HTMLInputElement>(null);
    const checkboxRef = useRef<HTMLInputElement>(null);

    function showPasswordHandler(e: React.ChangeEvent<HTMLInputElement>) {
        checkboxRef.current?.checked 
        ?
        inputRef.current?.setAttribute('type', 'text')
        :
        inputRef.current?.setAttribute('type', 'password')
    }

    return (
        <div className={styles.searchSection}>
            <input 
                className={classNames(
                    getClass(), 
                    isInvalid && styles.input_invalid
                )}
                ref={inputRef} 
                {...rest}
            />
            <label className={styles.lbl} htmlFor="search">
                <input ref={checkboxRef} type="checkbox" onChange={showPasswordHandler}/>
            </label>
        </div>
    )
}

