import React, { FC, useEffect, useState } from 'react'
import { WhiteBlock } from '../whiteBlock/WhiteBlock'
import styles from './modal.module.css'

interface ModalProps {
    isVisible: boolean,
    title?: string
    maxWidth: string
    setVisibility: () => void,
    children: React.ReactNode | React.ReactFragment
}

export const Modal: FC<ModalProps> = ({isVisible, title, setVisibility, children, maxWidth}) => {

  return (
    <>
      {
        isVisible  &&
        <>
          <div className={styles.modalBack} onClick={setVisibility}>
            <div className={styles.modalFront} onClick={(e) => {e.stopPropagation()}} style={{maxWidth: maxWidth}}>
              <WhiteBlock style={{background: 'white', boxShadow: 'none'}}>
                <div className={styles.modalHead}>
                  <h3>{title}</h3>
                  <div className={styles.closeModal} onClick={setVisibility}></div>
                </div>
                {children}
              </WhiteBlock>
            </div>
          </div>
        </>
      }
    </>
  )

}
