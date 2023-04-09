import styles from './whiteBlock.module.css'
import React, { FC } from 'react'

interface WhiteBlockProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export const WhiteBlock: FC<WhiteBlockProps> = ({...attrs}) => {
  return (
    <div {...attrs} className={styles.whiteBlock}></div>
  )
}
