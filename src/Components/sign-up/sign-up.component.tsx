import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

// import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import { SignUpContainer, SignUpTitle } from './sign-up.styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase.config';
import { toast } from 'react-toastify';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
	const navigate = useNavigate();
	const [userCredential, setCredential] = useState({
		displayName: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const { displayName, email, password, confirmPassword } = userCredential;

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("passwords don't match");
			return;
		}
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const user = userCredential.user;
			// console.log('user', user);
			// updateProfile(auth.currentUser, {
			// 	displayName: name,
			// });

			// const formDataCopy = { ...formData };
			// delete formDataCopy.password;
			// formDataCopy.timestamp = serverTimestamp();
			// await setDoc(doc(db, 'users', user.uid), userCredentials);
			// toast.success('You reach Success');
			// navigate('/');
			// Check for user
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			// If user, doesn't exist, create user
			if (!docSnap.exists()) {
				await setDoc(doc(db, 'users', user.uid), {
					name: displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
			}
			navigate('/');
		} catch (error) {
			console.log('error-auth', error);
			toast.error('Somthing went wrong');
		}
		// try {
		//   const { user } = await auth.createUserWithEmailAndPassword(
		//     email,
		//     password
		//   );
		//   await createUserProfileDocument(user, { displayName });
		//   this.setState({
		//     displayName: '',
		//     email: '',
		//     password: '',
		//     confirmPassword: ''
		//   });
		// } catch (error) {
		//   console.error(error);
		// }
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.currentTarget;

		setCredential({ ...userCredential, [name]: value });
	};

	return (
		<SignUpContainer>
			<SignUpTitle>I do not have a account</SignUpTitle>
			<span>Sign up with your email and password</span>
			<form className='sign-up-form' onSubmit={handleSubmit}>
				<FormInput
					type='text'
					name='displayName'
					value={displayName}
					onChange={handleChange}
					label='Display Name'
					required
				/>
				<FormInput
					type='email'
					name='email'
					value={email}
					onChange={handleChange}
					label='Email'
					required
				/>
				<FormInput
					type='password'
					name='password'
					value={password}
					onChange={handleChange}
					label='Password'
					required
				/>
				<FormInput
					type='password'
					name='confirmPassword'
					value={confirmPassword}
					onChange={handleChange}
					label='Confirm Password'
					required
				/>
				<CustomButton type='submit'>SIGN UP</CustomButton>
			</form>
		</SignUpContainer>
	);
};

export default SignUp;
