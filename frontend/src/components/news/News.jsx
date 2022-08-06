import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { device } from "../../helpers/breakPoints";
import Item from "./Item";
import Spinner from "../shared/Spinner";
import Pagination from "../shared/Pagination";

const News = () => {
	const [news, setNews] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [dataPerPage] = useState(1);

	const URL = `https://newsapi.org/v2/everything?q=comida&language=es&pageSize=5&apiKey=${
		import.meta.env.VITE_NEWS_API_KEY
	}`;

	useEffect(() => {
		const getNews = async () => {
			setIsLoading(true);
			const res = await axios(URL);
			setIsLoading(false);
			setNews(res.data.articles);
		};

		getNews();

		return () => {
			setIsLoading(false);
		};
	}, []);

	const indexOfLastData = currentPage * dataPerPage;
	const indexOfFirstData = indexOfLastData - dataPerPage;
	const actualData = news.slice(indexOfFirstData, indexOfLastData);
	const totalData = news.length;
	const paginate = (num) => setCurrentPage(num);

	if (isLoading) return <Spinner />;

	return (
		<SideContainer>
			{actualData.length === 0 ? (
				<Spinner />
			) : (
				actualData.map((item, index) => <Item key={index} item={item} />)
			)}
			<Pagination
				paginate={paginate}
				dataPerPage={dataPerPage}
				totalData={totalData}
				currentPage={currentPage}
			/>
		</SideContainer>
	);
};

const SideContainer = styled.div`
	display: none;
	@media ${device.laptop} {
		width: 100%;
		position: sticky;
		display: flex;
		padding: 1rem;
		flex: 2;
		flex-direction: column;
		justify-content: center;
	}
`;

export default News;
