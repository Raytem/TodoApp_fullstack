import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/UI/button/Button'
import { WhiteBlock } from '../components/UI/whiteBlock/WhiteBlock'
import '../css/emailVerified.css'
import { ButtonTypeEnum } from '../enums/ButtonTypeEnum'

export const EmailVerified = () => {
  const navigate = useNavigate();

  return (
    <div className='emailVerifiedDiv'>
      <WhiteBlock>
        <div className='emailSvg'></div>
        <p>Your email has been successfully verified</p>
        <Button onClick={() => navigate('/todos')} variant={ButtonTypeEnum.BLUE}>Go home</Button>
      </WhiteBlock>
    </div>
  )
}
