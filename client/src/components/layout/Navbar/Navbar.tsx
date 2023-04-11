import React, { useRef, useState } from 'react'
import styles from './navbar.module.css'
import impStyles from '../../../css/container.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

export const Navbar = () => {

    const [isAuth, setIsAuth] = useState<boolean>(true);

    return (
        <div className={styles.navbar}>
            <div className={impStyles.container}>
                <div className={styles.navbar__inner}>
                    
                    <NavLink to='/home' className={classNames(styles.navbar_container, styles.todo_container, styles.navLink)}>
                        <div className={styles.todo_container__logo}></div>
                        <p className={styles.todo_container__title}>Todo's</p>
                    </NavLink>

                    <div className={styles.navbar_container} >
                        {
                            (isAuth) &&
                            <>
                                <NavLink  to='/todos' className={classNames(styles.navbar_container, styles.user_container, styles.navLink)}>
                                    <div className={styles.user_container__logo}></div>
                                    <p className={styles.user_container__userName}>Username</p>
                                </NavLink>
                                
                                <NavLink to='/home' onClick={() => setIsAuth(false)} className={classNames(styles.navbar_container, styles.logout_container, styles.navLink)}>
                                    <div  className={styles.logout_container__logo}></div>
                                </NavLink>
                            </>
                        }

                        {
                            (!isAuth) &&
                            <>
                                <NavLink to='/home' className={classNames(styles.navbar_container, styles.navLink)}>
                                    Home
                                </NavLink>

                                <NavLink to='/signup' className={classNames(styles.navbar_container, styles.navLink)}>
                                    Sign Up
                                </NavLink>

                                <NavLink to='/login' className={classNames(styles.navbar_container, styles.navLink)}>
                                    Login
                                </NavLink>
                            </>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}
