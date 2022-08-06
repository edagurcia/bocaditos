import styled from "styled-components";

const Pagination = ({ paginate, dataPerPage, totalData, currentPage }) => {
	const pageNumber = [];

	for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
		pageNumber.push(i);
	}

	return (
		<Paginator>
			{pageNumber.map((number) => (
				<li
					key={number}
					onClick={() => paginate(number)}
					className={number === currentPage ? "active" : ""}
				>
					{number}
				</li>
			))}
		</Paginator>
	);
};

const Paginator = styled.ul`
	width: 100%;
	height: 2rem;
	margin-top: 20px;
	margin-bottom: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	.active {
		border: 1px solid #7165bf;
		background: #7165bf;
		color: #f2d1c9;
	}
	li {
		width: 30px;
		height: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		list-style: none;
		padding: 0.5rem;
		margin-right: 15px;
		border: 1px solid #7165bf;
		border-radius: 50%;
		color: #7165bf;
		font-size: 15px;
		font-weight: bold;
		&:hover {
			border: 1px solid #f2d1c9;
			background: #f24444;
			color: #f2d1c9;
		}
	}
`;

export default Pagination;
