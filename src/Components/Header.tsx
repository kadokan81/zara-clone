import styled from 'styled-components';
import { ZaraLogoSVG } from '../assets/ZaraLogoSVG';
import { BsBasket } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';

const HeaderStyled = styled.header`
	padding: 30px 20px 30px 20%;
	width: 100%;

	.menu__body {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.menu__link-logo {
		flex: 1 1 auto;
		max-width: 200px;
		position: relative;
		z-index: 20;
	}
	.menu__list {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		gap: 30px;
		height: 50px;
	}

	.menu__link {
		padding: 10px;
		border-radius: 200px;
		display: flex;
		align-items: center;
		justify-content: center;

		font-weight: 400;
		&:hover {
			background: #eee;
		}
	}

	.icon-elem {
	}
`;

const Header = () => {
	const navigate = useNavigate();

	const [currrentUser, setCurrentUser] = useState({
		name: '',
		email: '',
	});
	const onLogOutHadler = () => {
		signOut(auth)
			.then(() => {
				toast.success('Successfully logout');
				navigate('/login');
				// Sign-out successful.
			})
			.catch((error: any) => {
				toast.error(error.message);
				// An error happened.
			});
	};
	useEffect(() => {
		onAuthStateChanged(auth, (data) => {
			setCurrentUser({
				name: data?.displayName || '',
				email: data?.email || '',
			});
		});
	}, []);

	return (
		<HeaderStyled>
			<nav className='menu__body'>
				<Link to={'/'} className='menu__link-logo'>
					<ZaraLogoSVG />
				</Link>
				<ul className='menu__list'>
					<li className='menu__item'>
						{currrentUser.email ? (
							<button onClick={onLogOutHadler} className='menu__link'>
								LOG OUT
							</button>
						) : (
							<Link to={'/login'} className='menu__link'>
								LOG IN
							</Link>
						)}
					</li>
					<li className='menu__item'>
						<Link to={'/shopping-cart'} className='menu__link'>
							<BsBasket className='icon-elem' />
						</Link>
					</li>
				</ul>
			</nav>
		</HeaderStyled>
	);
};

export default Header;
