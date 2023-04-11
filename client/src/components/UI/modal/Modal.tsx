import React, { FC, useEffect, useState } from 'react'
import { WhiteBlock } from '../whiteBlock/WhiteBlock'
import { CSSTransition } from 'react-transition-group';

import styles from './modal.module.css'
import './modal.css'
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

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

        <CSSTransition
          in={isVisible}
          timeout={350}
          classNames='modalBack'
          unmountOnExit
        >
          <div className={styles.modalBack}></div>
        </CSSTransition>

        <CSSTransition
          in={isVisible}
          timeout={350}
          classNames='modalFront'
          unmountOnExit
        >
          <div className={classNames(styles.modalBack, styles.modalFrontWrapper)} onClick={setVisibility}>
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
        </CSSTransition>

    </>
  )

}
