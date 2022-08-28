import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	startAfter,
	where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductEditDeleiteCart, {
	IproductFromServer,
} from '../Components/product-edit-deleite-cart/product-edit-deleite-cart';
import { db } from '../firebase.config';

const Main = () => {
	const [loading, setLoading] = useState(false);
	const [products, setProducts] = useState<[IproductFromServer] | any>();
	const [lastFetchedProducts, setLastFetchedProducts] = useState<any>(null);

	useEffect(() => {
		const fetchAllProducts = async () => {
			try {
				const productsRef = collection(db, 'products');

				//Create query
				const q = query(
					productsRef,
					// where('gender', '==', 'femail'),
					// where('brend', '==', 'mango'),
					// where('category', '==', 'tops'),
					// where('category', '==', 'jeans'),
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
		<div style={{ padding: '39px' }}>
			<h1>Main Page</h1>
			<ul>
				{products?.map((productItem: IproductFromServer) => (
					<li key={productItem.id}>
						<Link to={`/product/${productItem.id}`}>
							<img width={'200px'} src={productItem.imgUrls[0]} />
						</Link>
					</li>
				))}
			</ul>
			<br />
			<br />
			{lastFetchedProducts && (
				<p className='loadMore' onClick={onFetchMoreListings}>
					Load More
				</p>
			)}
		</div>
	);
};

export default Main;
