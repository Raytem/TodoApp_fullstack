import React, { FC } from 'react'
import styles from './select.module.css'

interface Option {
  name: string,
  value: string
}

interface SelectProps {
  options: Array<Option>,
  sortHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  orderHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Select: FC<SelectProps> = ({options, sortHandler, orderHandler}) => {
  return (
    <div className={styles.selectWrapper}>
      <select className={styles.select} defaultValue='sort by' onChange={sortHandler}>
        <option value='sort by' disabled>Sort by</option>
        <option value=''>none</option>
        {
          options.map(opt => 
            <option key={opt.name} value={opt.value}>{opt.name}</option>
          )
        }
    </select>
    <input type="checkbox" onChange={orderHandler}/>
    </div>
  )
}
