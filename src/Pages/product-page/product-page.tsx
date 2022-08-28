import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IproductFromServer } from '../../Components/product-edit-deleite-cart/product-edit-deleite-cart';
import { db } from '../../firebase.config';

const ProductPage = () => {
	const [loading, setLoading] = useState(false);
	const [product, setProduct] = useState<IproductFromServer | any>();
	const params = useParams();

	// console.log(params);
	const { id = '' } = params;

	useEffect(() => {
		const fetchProduct = async () => {
			setLoading(true);
			const docRef = doc(db, 'products', id);
			// const docRef = doc(db, 'products', params.id);

			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				// console.log('docSnap?.data()------>', docSnap?.data());

				//@ts-nocheck
				setProduct(docSnap.data());

				setLoading(false);
			}
		};
		fetchProduct();
	}, [params]);

	if (loading) {
		return <h1>Loading</h1>;
	}
	return (
		<div style={{ padding: '39px' }}>
			{product && <img src={product.imgUrls[0]} alt='short' width={'200px'} />}
			<h1> Name:{product ? product.nameProduct : 'No name'}</h1>
			<h1> Brend:{product ? product.brend : 'No brend'}</h1>
		</div>
	);
};

export default ProductPage;
