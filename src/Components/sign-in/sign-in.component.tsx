import React, { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from 'firebase/auth';

import {
	SignInContainer,
	SignInTitle,
	ButtonsBarContainer,
} from './sign-in.styles';
import { auth, db } from '../../firebase.config';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export interface User {
	email: string;
	password: string;
}

const SignIn = () => {
	const [userCredentials, setUserCredentials] = useState<User>({
		email: '',
		password: '',
	});

	const { email, password } = userCredentials;

	const handleSubmit = async (event: React.SyntheticEvent) => {
		event.preventDefault();

		try {
			await signInWithEmailAndPassword(auth, email, password);

			toast.success('Wow so easy!');
			navigate('/');
		} catch (error) {
			console.log('error-auth', error);
			toast.error('Somthing went erong!!');
		}
	};
	const navigate = useNavigate();

	const signInWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			// Check for user
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			// If user, doesn't exist, create user
			if (!docSnap.exists()) {
				await setDoc(doc(db, 'users', user.uid), {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
				});
			}
			navigate('/');
		} catch (error) {
			toast.error('Could not authorize with Google');
		}
	};
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = event.target;

		setUserCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<SignInContainer>
			<SignInTitle>I already have an account</SignInTitle>
			<span>Sign in with your email and password</span>

			<form onSubmit={handleSubmit}>
				<FormInput
					name='email'
					type='email'
					handleChange={handleChange}
					value={email}
					label='email'
					required
				/>
				<FormInput
					name='password'
					type='password'
					value={password}
					handleChange={handleChange}
					label='password'
					required
				/>
				<ButtonsBarContainer>
					<CustomButton type='submit'> Sign in </CustomButton>
					<CustomButton type='button' onClick={signInWithGoogle}>
						Sign in with Google
					</CustomButton>
				</ButtonsBarContainer>
			</form>
		</SignInContainer>
	);
};

export default SignIn;
