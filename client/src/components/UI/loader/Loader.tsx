import React, { FC } from 'react'
import styles from '../loader/loader.module.css';
import classNames from 'classnames';
import { motion } from 'framer-motion';

interface LoaderProps {
  isButtonLoader?: boolean
}

export const Loader: FC<LoaderProps> = ({isButtonLoader}) => {

  return (
    <div className={classNames(
      styles.loader, 
      isButtonLoader && styles.button_loader)}
    />
  )
}
