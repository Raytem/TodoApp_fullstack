import React, { FC, useEffect, useState } from 'react'
import styles from './modal.module.css'

interface ModalProps {
    isVisible: boolean,
    setVisible: () => void,
    children: React.ReactNode | React.ReactFragment
}

export const Modal: FC<ModalProps> = ({isVisible, children, setVisible}) => {

  return (
    <>
      {
        isVisible  &&
        <>
          <div className={styles.modalBack} onClick={setVisible}/>
          <div className={styles.modal}>
            {children}
          </div>
        </>
      }
    </>
  )
}
