import styled from 'styled-components';

// {
// {
//     "id": "Wf4N9SbAJbORhHy5bF36",
//     "color": "GREY | 6050/807",
//     "description": "High-waist shorts featuring an adjustable elasticated waistband with drawstrings. Slogan detail on the front.",
//     "imgUrls": [
//         "https://firebasestorage.googleapis.com/v0/b/zara-29b40.appspot.com/o/images%2FZara%26shorts%26fimail-6050807802_1_1_1.jpeg-93a8b116-a3a6-40ca-96b8-b686214b4a04?alt=media&token=edf80652-8073-42ad-b478-070d67a93fbd",
//         "https://firebasestorage.googleapis.com/v0/b/zara-29b40.appspot.com/o/images%2FZara%26shorts%26fimail-shotrt.jpeg-44717753-c506-4879-b030-c88a898b24d1?alt=media&token=854b023f-7871-4b03-a76d-f9fc1b57f689",
//         "https://firebasestorage.googleapis.com/v0/b/zara-29b40.appspot.com/o/images%2FZara%26shorts%26fimail-6050807802_6_3_1.jpeg-96dd078f-d629-49e9-a7c4-f974ab3db84b?alt=media&token=16dedafa-c2c6-4735-b0eb-db68215baffc",
//         "https://firebasestorage.googleapis.com/v0/b/zara-29b40.appspot.com/o/images%2FZara%26shorts%26fimail-sustainability-extrainfo-label-1014_0.jpeg-084b7b81-e845-4a41-8fd4-4122fccf8554?alt=media&token=a05e0141-811f-4cf8-8a81-c051f6483a94"
//     ],
//     "mainFabric": "100% cotton",
//     "salePrice": 400,
//     "details": "98% cotton · 2% elastane",
//     "nameProduct": "SHORTS WITH SLOGAN",
//     "timestamp": {
//         "seconds": 1660985228,
//         "nanoseconds": 928000000
//     },
//     "gender": "fimail",
//     "brend": "Zara",
//     "avalableSizes": {
//         "s": 2,
//         "m": 2,
//         "l": -1
//     },
//     "initialPrice": 300,
//     "category": "shorts"
// }
export interface IproductFromServer {
	id: string;
	category: String;
	brend: String;
	avalableSizes: {
		s: number;
		l: number;
		m: number;
	};
	salePrice: String;
	imgUrls: [string];
	nameProduct: String;
	initialPrice: String;
}

interface ProductObject {
	product: IproductFromServer;
}

const ProductEditDeleiteCart = ({ product }: ProductObject): JSX.Element => {
	return (
		<ProductCartStyled>
			<img src={product.imgUrls[0]} alt='new' width={'100px'} />
			<div>
				<p>Brend: {product.brend.toLowerCase()}</p>
				<p>name: {product.nameProduct.toLowerCase()}</p>
				<p> Sale Price: {product.salePrice}</p>
				<p> Init Price: {product.initialPrice}</p>
			</div>
			<div>
				<p>{product.category}</p>

				<p>{product.salePrice}</p>
			</div>
			<div>
				<p> S:{product.avalableSizes.s}</p>
				<p> M:{product.avalableSizes.m}</p>
				<p> L:{product.avalableSizes.l}</p>
			</div>

			<div>
				<div>
					<button>EDIT</button>
				</div>
				<div>
					<button>DELETE</button>
				</div>
			</div>
		</ProductCartStyled>
	);
};

export default ProductEditDeleiteCart;

const ProductCartStyled = styled.div`
	min-width: 100%;
	padding: 10px;
	display: flex;
	justify-content: space-between;
	gap: 20px;

	p {
		margin-bottom: 8px;
	}
`;
