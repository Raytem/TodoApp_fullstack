// import React from 'react'
// import { ButtonTypeEnum } from '../../enums/ButtonTypeEnum'
// import { Button } from '../UI/button/Button'
// import { Modal } from '../UI/modal/Modal'

import { FC } from "react"
import { ButtonTypeEnum } from "../UI/button/ButtonTypeEnum"
import { Button } from "../UI/button/Button"
import { Modal } from "../UI/modal/Modal"

interface AlertProps {
    okHandler: () => Promise<void>,
    isVisible: boolean,
    body: string,
    setAlertVisibility: () => void,
}

export const Alert: FC<AlertProps> = ({body, okHandler, isVisible, setAlertVisibility}) => {
  return (
    <Modal title='Alert' isVisible={isVisible} setVisibility={setAlertVisibility} maxWidth='400px'>
        <h4 style={{textAlign: 'center'}}>{body}</h4>
        <div style={{display: 'flex', gap: '15px', marginTop: '30px'}}>
            <Button
                style={{width: '100%'}} 
                variant={ButtonTypeEnum.BLUE}
                onClick={() => {
                    okHandler();
                    setAlertVisibility();
                }}
            >
                Ok
            </Button>
            <Button 
                style={{width: '100%'}} 
                variant={ButtonTypeEnum.RED}
                onClick={setAlertVisibility}
            >
                Cancel
            </Button>
        </div>
    </Modal>
  )
}
