import { Col, Row } from 'react-bootstrap';

import { useGetProductsQuery } from '../slices/productSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link, useParams } from 'react-router-dom';
import Paginate from './Paginate';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';
import { IProduct } from '../slices/cartSlice';
import Product from '../components/Product';

const Homescreen: React.FC = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber
  });



  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{JSON.stringify(error)}</Message>
      ) : (
        <>
          <Meta title="Eshop - Home" />
          <h1>Latest Product</h1>
          <Row>
            {data?.products?.map((product: IProduct) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default Homescreen;
