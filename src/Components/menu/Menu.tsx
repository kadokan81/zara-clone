import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface PropsMenuStyled {
	open: Boolean;
}

const MainMenu = styled.div<PropsMenuStyled>`
	position: absolute;
	top: 0;
	left: ${({ open }) => (open ? 0 : '-100%')};
	width: 300px;
	height: 100vh;
	z-index: 5;
	background: #a78484;
	padding: 150px 20px 10px 50px;
	transition: all 1s ease;

	.menu__list {
		display: flex;
		gap: 15px;
	}
`;

export interface MenuProps {
	openMenu: Boolean;
}

const Menu = ({ openMenu }: MenuProps) => {
	return (
		<MainMenu open={openMenu}>
			<div className='header__menu menu'>
				<nav className='menu__body'>
					<ul className='menu__list'>
						<li className='menu__item'>
							<Link to={'/'} className='menu__link'>
								women
							</Link>
						</li>
						<li className='menu__item'>
							<a href='/' className='menu__link'>
								man
							</a>
						</li>
						<li className='menu__item'>
							<a href='/' className='menu__link'>
								kids
							</a>
						</li>
					</ul>
				</nav>
			</div>
			<div className='sub_menu'>
				<ul className='sub_menu-list'>
					<li className='sub_menu-item'>
						<Link to={'/jeanse'}>Jeanse</Link>
					</li>
					<li className='sub_menu-item'>
						<Link to={'/jeanse'}>Jeanse</Link>
					</li>{' '}
					<li className='sub_menu-item'>
						<Link to={'/jeanse'}>Jeanse</Link>
					</li>{' '}
					<li className='sub_menu-item'>
						<Link to={'/jeanse'}>Jeanse</Link>
					</li>{' '}
					<li className='sub_menu-item'>
						<Link to={'/jeanse'}>Jeanse</Link>
					</li>
				</ul>
			</div>
		</MainMenu>
	);
};

export default Menu;
