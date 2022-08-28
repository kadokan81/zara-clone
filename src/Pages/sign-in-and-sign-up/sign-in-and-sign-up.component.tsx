import React from 'react';
import SignUp from '../../Components/sign-up/sign-up.component';
import SignIn from '../../Components/sign-in/sign-in.component';

import { SignInAndSignUpContainer } from './sign-in-and-sign-up.styles';

const SignInAndSignUpPage = () => (
	<SignInAndSignUpContainer>
		<SignIn />
		<SignUp />
	</SignInAndSignUpContainer>
);

export default SignInAndSignUpPage;
