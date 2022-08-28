import React, { useState } from 'react';
import styled from 'styled-components';

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage';
import { db } from '../../firebase.config';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export interface IProduct {
	brend: String;
	category: String;
	gender: String;
	avalableSizes: { s?: number; m?: number; l?: number };
	initialPrice: Number;
	salePrice: Number;
	images: any;

	//////////
	mainFabric?: string;
	details?: string;
	nameProduct?: string;
	color?: string;
	description?: string;
	id?: string;
}

const NewProductForm = () => {
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState<IProduct>({
		brend: '',
		category: '',
		gender: '',
		avalableSizes: {
			s: 0,
			m: 0,
			l: 0,
		},
		initialPrice: NaN,
		salePrice: NaN,
		images: {},
	});

	const { images } = formData;
	const createNewProductItem = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		// Store image in firebase
		const storeImage = async (image: any) => {
			setLoading(true);
			return new Promise((resolve, reject) => {
				const storage = getStorage();
				const fileName = `${formData.brend}&${formData.category}&${
					formData.gender
				}-${image.name}-${uuidv4()}`;

				const storageRef = ref(storage, 'images/' + fileName);

				const uploadTask = uploadBytesResumable(storageRef, image);

				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload is ' + progress + '% done');
						switch (snapshot.state) {
							case 'paused':
								console.log('Upload is paused');
								break;
							case 'running':
								console.log('Upload is running');
								break;
							default:
								break;
						}
					},
					(error) => {
						reject(error);
					},
					() => {
						// Handle successful uploads on complete
						// For instance, get the download URL: https://firebasestorage.googleapis.com/...
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							resolve(downloadURL);
						});
					}
				);
			});
		};

		const imgUrls = await Promise.all(
			[...images].map((image) => storeImage(image))
		).catch(() => {
			setLoading(false);

			toast.error('Images not uploaded');
			return;
		});

		const formDataCopy = {
			...formData,
			imgUrls,
			timestamp: serverTimestamp(),
		};
		delete formDataCopy.images;
		await addDoc(collection(db, 'products'), formDataCopy);
		setLoading(false);
		toast.success('Listing saved');
	};

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.id === 'size-s') {
			setFormData((prevState) => ({
				...prevState,
				avalableSizes: {
					...prevState.avalableSizes,
					s: +e.target.value,
				},
			}));
			return;
		}
		if (e.target.id === 'size-m') {
			setFormData((prevState) => ({
				...prevState,
				avalableSizes: {
					...prevState.avalableSizes,
					m: +e.target.value,
				},
			}));
			return;
		}
		if (e.target.id === 'size-l') {
			setFormData((prevState) => ({
				...prevState,
				avalableSizes: {
					...prevState.avalableSizes,
					l: +e.target.value,
				},
			}));
			return;
		}
		if (e.target.type === 'number') {
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: +e.target.value,
			}));
			return;
		}
		if (e.target.files) {
			setFormData((prevState) => ({
				...prevState,
				images: e.target.files,
			}));

			return;
		}
		if (!e.target.files) {
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: e.target.value,
			}));
		}
	};
	const onSelectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	if (loading) {
		return <h2>Loading...</h2>;
	}
	return (
		<ProductForm onSubmit={createNewProductItem}>
			<ProductFormLine>
				<ProductFormLabel htmlFor='brend'>Brend</ProductFormLabel>

				<ProductFormInput
					placeholder='brend'
					type='text'
					id='brend'
					name='brend'
					onChange={onChangeHandler}
				/>
			</ProductFormLine>
			<ProductFormLine>
				<ProductFormLabel htmlFor='mainFabric'>mainFabric</ProductFormLabel>
				<ProductFormInput
					placeholder='mainFabric'
					type='text'
					id='mainFabric'
					name='mainFabric'
					onChange={onChangeHandler}
				/>
			</ProductFormLine>
			<ProductFormLine>
				<ProductFormLabel htmlFor='details'>Details</ProductFormLabel>
				<ProductFormInput
					placeholder='details'
					type='text'
					id='details'
					name='details'
					onChange={onChangeHandler}
				/>
			</ProductFormLine>
			<ProductFormLine>
				<ProductFormLabel htmlFor='nameProduct'>Name Product</ProductFormLabel>
				<ProductFormInput
					placeholder='nameProduct'
					type='text'
					id='nameProduct'
					name='nameProduct'
					onChange={onChangeHandler}
				/>
			</ProductFormLine>
			<ProductFormLine>
				<ProductFormLabel htmlFor='color'>Color</ProductFormLabel>
				<ProductFormInput
					placeholder='color'
					type='text'
					id='color'
					name='color'
					onChange={onChangeHandler}
				/>
			</ProductFormLine>
			<ProductFormLine>
				<ProductFormLabel htmlFor='description'>description</ProductFormLabel>
				<ProductFormInput
					placeholder='description'
					type='text'
					id='description'
					name='description'
					onChange={onChangeHandler}
				/>
			</ProductFormLine>
			<ProductFormLine>
				<ProductFormLabel htmlFor='category'>Category</ProductFormLabel>
				<ProductFormSelect
					name='category'
					id='category'
					onChange={onSelectSelect}>
					<option value='dress'>dress</option>
					<option value='blaser'>Blaser</option>
					<option value='tops'>Tops</option>
					<option value='jeans'>Jeans</option>
					<option value='shorts'>Shorts</option>
				</ProductFormSelect>
			</ProductFormLine>
			<ProductFormLine>
				<ProductFormLabel htmlFor='gender'>gender</ProductFormLabel>
				<ProductFormSelect name='gender' id='gender' onSelect={onSelectSelect}>
					<option disabled>Shose one</option>
					<option value='femail'>Femail</option>
					<option value='men'>Man</option>
					<option value='kids'>Kids</option>
				</ProductFormSelect>
			</ProductFormLine>
			<ProductFormLine>
				<ProductFormLabel htmlFor='size-s'>Size S</ProductFormLabel>
				<ProductFormInput
					placeholder='size-s'
					type='number'
					id='size-s'
					name='size-s'
					onChange={onChangeHandler}
				/>
			</ProductFormLine>
			<ProductFormLine>
				<ProductFormLabel htmlFor='size-m'>Size M</ProductFormLabel>
				<ProductFormInput
					placeholder='size-m'
					type='number'
					id='size-m'
					name='size-m'
					onChange={onChangeHandler}
				/>
			</ProductFormLine>
			<ProductFormLine>
				<ProductFormLabel htmlFor='size-l'>Size L</ProductFormLabel>
				<ProductFormInput
					placeholder='size-l'
					type='number'
					id='size-l'
					name='size-l'
					onChange={onChangeHandler}
				/>
			</ProductFormLine>
			<ProductFormLine>
				<ProductFormLabel htmlFor='initial-price'>
					Initial Price
				</ProductFormLabel>
				<ProductFormInput
					placeholder='initial-price'
					type='number'
					id='initialPrice'
					name='initial-price'
					onChange={onChangeHandler}
				/>
			</ProductFormLine>
			<ProductFormLine>
				<ProductFormLabel htmlFor='sale-price'>Sale Price</ProductFormLabel>
				<ProductFormInput
					placeholder='sale-price'
					type='number'
					id='salePrice'
					name='sale-price'
					onChange={onChangeHandler}
				/>
			</ProductFormLine>
			<ProductFormLine>
				<ProductFormLabel htmlFor='photo'>Photo</ProductFormLabel>
				<ProductFormInput
					placeholder='photo'
					type='file'
					id='images'
					name='photo'
					max='6'
					accept='.jpg,.png,.jpeg,.webp'
					multiple
					onChange={onChangeHandler}
				/>
			</ProductFormLine>
			<SubmitButton type='submit'>CREATE</SubmitButton>
		</ProductForm>
	);
};

export default NewProductForm;

const SubmitButton = styled.button`
	width: 100%;
	background: gray;
	color: white;
	font-size: 20px;
	border-radius: 6px;
	padding: 10px 20px;
	box-sizing: 6px;
	transition: all 0.3s ease;
	&:hover {
		background: black;
	}
`;

const ProductForm = styled.form`
	width: 80%;

	display: flex;
	flex-direction: column;
	gap: 20px;
`;
const ProductFormLine = styled.div`
	display: flex;
	align-items: center;
	gap: 20px;
	background-color: #fff;
	padding: 10px;
	border: 1px solid gray;
	border-radius: 8px;
`;
const ProductFormLabel = styled.label`
	font-size: 20px;
	flex: 1 1 15%;
`;

interface IProductFormInput {
	placeholder?: string;

	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const ProductFormInput = styled.input<IProductFormInput>`
	font-size: 20px;
	padding: 5px 10px;
	border: 1px solid gray;
	width: 100%;
`;

interface IProductFormSelect {
	onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const ProductFormSelect = styled.select<IProductFormSelect>`
	width: 100%;
	font-size: 20px;
	border: 1px solid gray;
	padding: 5px 10px 5px 0px;
`;
