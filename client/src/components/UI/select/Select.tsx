import React, { FC } from 'react'
import styles from './filter.module.css'

interface Option {
  name: string,
  value: string
}

interface SelectProps {
  options: Array<Option>,
  sortHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select: FC<SelectProps> = ({options, sortHandler}) => {
  return (
    <select defaultValue='sort by' onChange={sortHandler} className={styles.filter}>
        <option value='sort by' disabled>Sort by</option>
        <option value=''>none</option>
        {
          options.map(opt => 
            <option key={opt.value} value={opt.value}>{opt.name}</option>
          )
        }
    </select>
  )
}
