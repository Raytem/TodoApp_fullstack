import React from 'react';
import '../css/homePage.css';
import { Button } from '../components/UI/button/Button';
import { ButtonTypeEnum } from '../enums/ButtonTypeEnum';
import { useNavigate } from 'react-router-dom';

export const HomePage = () => {

    const navigate = useNavigate();

    return (
        <div className="homePageDiv">

            <div className="homePageDiv-left">
                <h2 className='homePageDiv-title' >Start writing todo's Now</h2>

                <h4 className='homePageDiv-subTitle'>share tasks with other's</h4>

                <div className='homePageDiv-buttons'>
                    <Button 
                        variant={ButtonTypeEnum.BLUE}
                        onClick={() => navigate('/signup')}
                    >
                        Sign Up
                    </Button>
                    <Button 
                        variant={ButtonTypeEnum.BLUE}
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </Button>
                </div>
            </div>

            <div className="homePageDiv-right">
                <img src="../../public/todoPicture.png" alt="" />
            </div>

        </div>
    )
}
