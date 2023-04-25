import React, { useRef, useState } from 'react'
import styles from './navbar.module.css'
import impStyles from '../../../css/container.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { getCurrentUser, getIsAuth } from '../../../store/slices/currentUserSlice';
import { useAppDispatch } from '../../../hooks/redux';
import { logout } from '../../../store/actionCreators/currentUserActions';

export const Navbar = () => {

	const currentUser = getCurrentUser();

	const dispatch = useAppDispatch();
	const navRef = useRef<HTMLDivElement>(null);

	let prevOffsetTop = 0;
	window.addEventListener('scroll', () => {
		const offsetTop = window.pageYOffset || document.documentElement.scrollTop;
		if (navRef.current) {
			if (offsetTop > navRef.current!.offsetHeight / 2) {
				if (prevOffsetTop > offsetTop) {
					navRef.current!.style.transform = 'translateY(0)';
				}
				if (prevOffsetTop < offsetTop) {
					navRef.current!.style.transform = 'translateY(-100%)';
				}
				prevOffsetTop = offsetTop;
			}
		}
		
	})

	const logoutHandler = () => {
		dispatch(logout());
	}

	return (
			<div ref={navRef} className={styles.navbar}>
					<div className={impStyles.container}>
							<div className={styles.navbar__inner}>
									
									<NavLink to='/home' className={classNames(styles.navbar_container, styles.todo_container, styles.navLink)}>
										<div className={styles.todo_container__logo}></div>
										<p className={styles.todo_container__title}>Todo's</p>
									</NavLink>

									<div className={styles.navbar_container} >
											{
												(getIsAuth()) &&
												<>
													<NavLink  to='/todos' className={classNames(styles.navbar_container, styles.user_container, styles.navLink)}>
														<div className={styles.user_container__logo}></div>
														<p className={styles.user_container__userName}>{currentUser.nickName}</p>
													</NavLink>
													
													<NavLink to='/home' onClick={logoutHandler} className={classNames(styles.navbar_container, styles.logout_container, styles.navLink)}>
														<div  className={styles.logout_container__logo}></div>
													</NavLink>
												</>
											}


											{
												(!getIsAuth()) &&
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
