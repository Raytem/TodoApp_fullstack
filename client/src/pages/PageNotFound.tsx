import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonTypeEnum } from '../components/UI/button/ButtonTypeEnum';
import { Button } from '../components/UI/button/Button';
import { WhiteBlock } from '../components/UI/whiteBlock/WhiteBlock';
import '../css/pageNotFound.css'

export const PageNotFound = () => {
    const navigate = useNavigate();

  return (
    <div className='pageNotFoundDiv'>
        <WhiteBlock style={{width: '400px'}}>
            <div className='notFoundImg'></div>
            <h3>Page Not Found</h3>
            <Button onClick={() => navigate('/home')} variant={ButtonTypeEnum.BLUE}>Go Home</Button>
        </WhiteBlock>
    </div>
  )
}
