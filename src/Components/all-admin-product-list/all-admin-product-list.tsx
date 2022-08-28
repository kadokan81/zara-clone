// import React from 'react';

import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase.config';
import ProductEditDeleiteCart, {
	IproductFromServer,
} from '../product-edit-deleite-cart/product-edit-deleite-cart';

const AllAdminProductList = (): JSX.Element => {
	const [products, setProducts] = useState<[IproductFromServer] | any>();
	const [loading, setLoading] = useState(false);
	const [lastFetchedProducts, setLastFetchedProducts] = useState<any>(null);

	useEffect(() => {
		const fetchAllProducts = async () => {
			try {
				const productsRef = collection(db, 'products');

				//Create query
				const q = query(
					productsRef,
					// where('type', '==', params.categoryName),
					orderBy('timestamp', 'desc'),
					limit(3)
				);

				//Excute query
				const querySnap = await getDocs(q);
				const lastVisible: any = querySnap.docs[querySnap.docs.length - 1];
				if (lastVisible !== null) {
					setLastFetchedProducts(lastVisible);
				}

				const products: any = [];
				querySnap.forEach((doc) => {
					return products.push({
						id: doc.id,
						...doc.data(),
					});
				});
				setProducts(products);
				setLoading(false);
			} catch (error) {
				console.log('errro---->', error);
			}
		};

		fetchAllProducts();
	}, []);

	const onFetchMoreListings = async () => {
		try {
			const productsRef = collection(db, 'products');

			//Create query
			const q = query(
				productsRef,
				// where('offer', '==', true),
				// where('gender', '==', 'men'),
				// where('brend', '==', 'mango'),
				// where('category', '==', 'dress'),
				// where('brend', '==', 'mango'),
				// where('category', '==', 'tops'),
				orderBy('timestamp', 'desc'),
				startAfter(lastFetchedProducts),
				limit(3)
			);

			//Excute query
			const querySnap = await getDocs(q);

			const lastVisible = querySnap.docs[querySnap.docs.length - 1];

			setLastFetchedProducts(lastVisible);

			const products: any = [];
			querySnap.forEach((doc) => {
				return products.push({
					id: doc.id,
					...doc.data(),
				});
			});

			setProducts((prevState: [IproductFromServer]) => [
				...prevState,
				...products,
			]);
			setLoading(false);
		} catch (error) {
			console.log('errro---->', error);
		}
	};

	if (loading) {
		return <h2>Loading...</h2>;
	}
	return (
		<>
			<ul>
				{products?.map((productItem: IproductFromServer) => (
					<li key={productItem.id}>
						<ProductEditDeleiteCart product={productItem} />
					</li>
				))}
			</ul>
			{lastFetchedProducts && (
				<p className='loadMore' onClick={onFetchMoreListings}>
					Load More
				</p>
			)}
		</>
	);
};

export default AllAdminProductList;
