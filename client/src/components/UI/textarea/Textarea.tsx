import classNames from 'classnames'
import React, { FC, useRef } from 'react'
import { TextAreaTypeEnum } from './TextAreaTypeEnum'
import styles from './textarea.module.css'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  type?: TextAreaTypeEnum
}

export const Textarea: FC<TextareaProps> = (props) => {
  const {type, ...rest} = props;

  return (
    <textarea
      className={
        props.type === TextAreaTypeEnum.BODY ? styles.textarea : classNames(styles.textarea, styles.textarea__title)
      } 
      onInput={(e) => {
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
      }}
      {...rest}
    />
  )
}
