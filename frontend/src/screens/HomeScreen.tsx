import { Col, Row } from "react-bootstrap";
import products from "../products";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import { IProduct, IProducts } from "../interface";
import { useGetProductsQuery } from "../slices/productSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const Homescreen: React.FC = () => {
  const { data: products, isLoading, error }: any = useGetProductsQuery(
    "Products"
  );
  console.log(products);

  /* const [products, setProducts] = useState<IProducts>();
  useEffect(() => {
    fetchProduct()
  }, []);
 const fetchProduct = async() =>{
const {data}= await axios.get("/api/products")
setProducts(data)
} */

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest Product</h1>
          <Row>
            {products?.map((product: IProduct) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default Homescreen;
