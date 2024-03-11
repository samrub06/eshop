import { Carousel, Image } from "react-bootstrap";
import { useGetTopProductsQuery } from "../slices/productSlice";
import Loader from "./Loader";
import Message from "./Message";
import "../styles/index.css";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const { data, isLoading, isError } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger">{isError}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {data?.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name}(${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default ProductCarousel;
