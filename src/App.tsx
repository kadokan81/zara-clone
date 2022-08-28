import { useEffect, useState } from 'react';
import Menu from './Components/menu/Menu';
import Main from './Pages/Main';
import { AiOutlineMenuUnfold, AiOutlineClose } from 'react-icons/ai';
import { Routes, Route } from 'react-router-dom';

import styled from 'styled-components';
import ShoppingCart from './Pages/ShoppingCart';
import Header from './Components/Header';
import SignInAndSignUpPage from './Pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, db } from './firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { createGlobalStyle } from 'styled-components';
import { onAuthStateChanged } from 'firebase/auth';
import AdminPage from './Pages/adminPage/admin.page';
import ProductPage from './Pages/product-page/product-page';

const GlobalStyle = createGlobalStyle`
body {
	margin: 0;
	font-family: -apple-system, BlinkMacSystemFont, 'Franklin Gothic Medium',
		'Arial Narrow', Arial, sans-serif;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	position: relative;
}

code {
	font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
		monospace;
}

* {
	padding: 0px;
	margin: 0px;
	border: 0px;
}
*,
*:before,
*:after {
	box-sizing: border-box;
}
:focus,
:active {
	outline: none;
}
a:focus,
a:active {
	outline: none;
}
html,
body {
	height: 100%;
	font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
body {
	color: black;
	line-height: 1;

	text-rendering: optimizeLegibility;
	-ms-text-size-adjust: 100%;
	-moz-text-size-adjust: 100%;
	-webkit-text-size-adjust: 100%;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

button {
	cursor: pointer;
	color: inherit;
	background-color: inherit;
}
a {
	color: inherit;
}
a:link,
a:visited {
	text-decoration: none;
}
a:hover {
	text-decoration: none;
}
ul li {
	list-style: none;
}
img {
	vertical-align: top;
}
h1,
h2,
h3,
h4,
h5,
h6 {
	font-weight: inherit;
	font-size: inherit;
}

`;

const BurgerIcon = styled.div`
	position: absolute;
	top: 20px;
	left: 20px;
	z-index: 10;
	cursor: pointer;
`;

function App() {
	const [openMenu, setopenMenu] = useState(false);
	const [loading, setLoading] = useState(false);
	const [currrentUser, setCurrentUser] = useState({
		name: '',
		email: '',
		userRef: '',
		admin: false,
	});

	useEffect(() => {
		onAuthStateChanged(auth, async (data) => {
			if (data) {
				console.log('data------>', data);
				console.log(auth.currentUser);

				const docRef = doc(db, 'users', data?.uid);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const { name, email, userRef, admin } = docSnap.data();
					setCurrentUser({ name, email, userRef, admin });
					// console.log('currrentUser', currrentUser);
					// setListing(c);
					// setFormData({ ...docSnap.data(), address: docSnap.data().location });
					setLoading(false);
				} else {
					toast.error('Listing does not exist');
				}
			}
		});
	}, []);

	return (
		<div>
			<BurgerIcon onClick={() => setopenMenu(!openMenu)}>
				{openMenu ? <AiOutlineClose /> : <AiOutlineMenuUnfold />}
			</BurgerIcon>
			<Menu openMenu={openMenu} />
			<Header />
			{currrentUser.admin === true ? (
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/login' element={<SignInAndSignUpPage />} />
					<Route path='/shopping-cart' element={<ShoppingCart />} />
					<Route path='/admin' element={<AdminPage />} />
					<Route path='/product/:id' element={<ProductPage />} />
				</Routes>
			) : (
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/login' element={<SignInAndSignUpPage />} />
					<Route path='/shopping-cart' element={<ShoppingCart />} />
					<Route path='/product/:id' element={<ProductPage />} />
				</Routes>
			)}

			<ToastContainer />
			<GlobalStyle />
		</div>
	);
}

export default App;
