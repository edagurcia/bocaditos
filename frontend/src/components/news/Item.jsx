import styled from "styled-components";
import { formatRelative, subDays } from "date-fns";
import Avatar from "../shared/Avatar";
import noImage from "../../assets/noimage.png";

const Item = ({ item }) => {
	const { author, publishedAt, title, description, url, urlToImage } = item;

	return (
		<NewsItem>
			<ItemHeader>
				<Avatar>
					{author === null ? "A" : author.toUpperCase().charAt(1)}
				</Avatar>
				<Author>
					<h4>{author === null ? "Anónimo" : author}</h4>
					<span>
						{publishedAt !== null
							? formatRelative(subDays(new Date(publishedAt), 3), new Date())
							: new Date()}
					</span>
				</Author>
			</ItemHeader>
			<img
				src={urlToImage !== null ? urlToImage : noImage}
				alt={title !== null ? title : "Sin Titulo"}
			/>
			<h5>{title !== null ? title : "Sin Titulo"}</h5>
			<p>{description !== null ? description : "Sin Contenido"}</p>
			<a
				href={url !== null ? url : "#!"}
				target="_blank"
				rel="noopener noreferrer"
			>
				{url !== null ? "Ir a la noticia" : ""}
			</a>
		</NewsItem>
	);
};

const NewsItem = styled.div`
	width: 100%;
	padding: 0.5rem;
	display: flex;
	flex-direction: column;
	border: 1px solid #f2d1c9;
	border-radius: 10px;
	box-shadow: 3px 3px 5px 0px rgba(84, 82, 82, 0.75);
	-webkit-box-shadow: 3px 3px 5px 0px rgba(84, 82, 82, 0.75);
	-moz-box-shadow: 3px 3px 5px 0px rgba(84, 82, 82, 0.75);
	img {
		width: 100%;
		max-height: 8rem;
		border-radius: 10px;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	h5 {
		margin-bottom: 10px;
	}
	p {
		text-align: justify;
	}
	a {
		text-align: right;
		margin-top: 2rem;
		font-weight: 500;
	}
`;

const ItemHeader = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
`;

const Author = styled.div`
	margin-left: 15px;
	span {
		font-size: 12px;
	}
`;

export default Item;
