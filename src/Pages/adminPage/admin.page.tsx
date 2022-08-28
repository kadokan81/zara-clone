import { useState } from 'react';
import styled from 'styled-components';
import AllAdminProductList from '../../Components/all-admin-product-list/all-admin-product-list';
import NewProductForm from '../../Components/new-product-form/new-product-form';

const AdmineLaouot = styled.section`
	display: grid;
	grid-template-columns: repeat(12, 1fr);

	gap: 10px;
	padding: 20px;
	background-color: #cac2c2;
`;
const AdmineMenu = styled.div`
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row-start: 1;
	grid-row-end: -1;

	background: #ffffff;

	box-shadow: 0px 10px 13px rgba(17, 38, 146, 0.05);
	border-radius: 8px;
`;

const MainAdminElement = styled.div`
	grid-column-start: 3;
	grid-column-end: -1;
	grid-row-start: 3;
	grid-row-end: -1;

	background: #ffffff;
	/* CARDS */

	box-shadow: 0px 10px 13px rgba(17, 38, 146, 0.05);
	border-radius: 8px;
	padding: 20px;
`;
const AdmineMenuList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 20px;
	padding: 20px;
`;

interface AdminLinkProps {
	active?: Boolean;
}
const AdminLink = styled.li<AdminLinkProps>`
	padding: 8px 10px;
	background-color: ${(props) => (props.active ? 'blue' : 'white')};

	color: ${(props) => (props.active ? 'white' : 'black')};
	border-radius: 6px;
	font-size: 20px;
	cursor: pointer;
	transition: all 0.5s ease;
	display: flex;
	align-items: center;
	&:hover {
		transform: translate(0px, -5px);
		box-shadow: 10px 5px 5px #cac2c2;
	}
`;
const AdminPage = () => {
	const [pageAdmin, setPage] = useState('new-product');

	return (
		<AdmineLaouot>
			<AdmineMenu>
				<AdmineMenuList>
					<AdminLink
						onClick={() => setPage('new-product')}
						active={pageAdmin === 'new-product'}>
						Add New Product
					</AdminLink>
					<AdminLink
						onClick={() => setPage('user-data')}
						active={pageAdmin === 'user-data'}>
						Users Data
					</AdminLink>
					<AdminLink
						onClick={() => setPage('all-products')}
						active={pageAdmin === 'all-products'}>
						All Products
					</AdminLink>
					<AdminLink
						onClick={() => setPage('accounting')}
						active={pageAdmin === 'accounting'}>
						Accounting
					</AdminLink>
					<AdminLink
						onClick={() => setPage('statictic')}
						active={pageAdmin === 'statictic'}>
						Statictic
					</AdminLink>
				</AdmineMenuList>
			</AdmineMenu>

			<MainAdminElement>
				{pageAdmin === 'new-product' && <NewProductForm />}
				{pageAdmin === 'user-data' && <div>user-datauser-data</div>}
				{pageAdmin === 'all-products' && <AllAdminProductList />}
				{pageAdmin === 'accounting' && <div>accountingaccountingProduct</div>}
				{pageAdmin === 'statictic' && (
					<div> staticticstaticticstaticticaccountingaccountingProduct</div>
				)}
			</MainAdminElement>
		</AdmineLaouot>
	);
};

export default AdminPage;
