import { Helmet } from "react-helmet-async"

const Meta = ({title,description, keywords}) => {
	return <Helmet>
		<title>{title}</title>
		<meta name="keywords" content={keywords} />

	</Helmet>;
}


Meta.defaultProps = {
	title:"Welcome to Eshop",
	description: " We sell the best products for cheap",
	keywords: "electronics, buy electronics, cheap electronics"
}

export default Meta