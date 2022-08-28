import styled from 'styled-components';

export const SignInAndSignUpContainer = styled.div`
	max-width: 850px;
	display: flex;
	flex-wrap: wrap;

	justify-content: space-between;
	margin: 30px auto;
	@media (max-width: 768px) {
		flex-direction: column;
		row-gap: 30px;
	}
`;
