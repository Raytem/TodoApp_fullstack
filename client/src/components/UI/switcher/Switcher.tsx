import styles from './switcher.module.css'
import React, { FC, useRef, useState } from 'react'

interface SwitcherProps extends React.HTMLAttributes<HTMLDivElement> {
  switchOptions: Array<string>,
  defaultOption: string,
  onChange: (e: React.MouseEvent<HTMLDivElement>) =>  void;
}

export const Switcher: FC<SwitcherProps> = ({switchOptions, defaultOption, onChange, ...attributes}) => {
  const switcherCaretRef = useRef<HTMLDivElement>(null);
  const switcherOptionRef = useRef<HTMLDivElement>(null);

  const caretWidth: number = 100 / switchOptions.length;

  const defaultOptionIdx: number = switchOptions.indexOf(defaultOption)
  const defaultLeft: number = defaultOptionIdx === -1 ? 0 : caretWidth * defaultOptionIdx;

  function changeSwitcherCaretPosition(e: React.MouseEvent<HTMLDivElement>) {
    const triggeredOption: string = e.currentTarget.innerHTML;
    const triggeredOptionIdx: number = switchOptions.indexOf(triggeredOption);

    let left: number = caretWidth * triggeredOptionIdx;
    switcherCaretRef.current!.style.left = `${left}%`;
  }

  return (
    <div className={styles.switcherBasis} {...attributes}>

      <div 
        className={styles.switcherCaret}
        style={{width: `${caretWidth}%`, left: `${defaultLeft}%`}}
        ref={switcherCaretRef}
      />

      {
        switchOptions.map((option) => 
          <div
            ref={switcherOptionRef}
            className={styles.switcherOption}
            onClick={(e) => {
              changeSwitcherCaretPosition(e);
              onChange(e);
            }}
            key={option}
          >
            {option}
          </div>
        )
      }

    </div>
  )
}
