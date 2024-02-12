import { Col, Row } from "react-bootstrap";
import products from "../products";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import axios from 'axios'
import { IProduct, IProducts } from "../interface";

const Homescreen: React.FC = () => {
  const [products, setProducts] = useState<IProducts>();
  useEffect(() => {
    fetchProduct()
  }, []);

const fetchProduct = async() =>{
const {data}= await axios.get("/api/products")
setProducts(data)
}

  return (
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
  );
};

export default Homescreen;
