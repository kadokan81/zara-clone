import React from 'react';

import {
	GroupContainer,
	FormInputContainer,
	FormInputLabel,
} from './form-input.styles';
interface FormInpitProps {
	[x: string]: any;
}

const FormInput = ({ handleChange, label, ...props }: FormInpitProps) => (
	<GroupContainer>
		<FormInputContainer onChange={handleChange} {...props} />
		{label ? (
			<FormInputLabel className={props.value.length ? 'shrink' : ''}>
				{label}
			</FormInputLabel>
		) : null}
	</GroupContainer>
);

export default FormInput;
