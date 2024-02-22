import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import CheckoutSteps from "./CheckoutSteps"
import { Col, Image, ListGroup, Row } from "react-bootstrap"
import Message from "../components/Message"

const PlaceOrderScreen = () => {
const navigate = useNavigate()
const cart = useSelector((state) => state.cart);


useEffect(() => {
if(!cart?.shippingAddress?.address){
	navigate("/shipping")
} else if (cart.paymentMethod){
	navigate("/payment")
}
}, [cart?.paymentMethod, cart?.shippingAddress,navigate])

	return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address</strong>
                {cart.shippingAddress.address},{cart.shippingAddress.city}
                {""}
                {cart.shippingAddress.postalCode},{""}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2> Payment Method</h2>
              <strong>Method: </strong>
							{cart.paymentMethod}
            </ListGroup.Item>
						<ListGroup.Item>
							<h2>Order Items</h2>
							{cart.cartItems.length === 0 ? (
								<Message>Your cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{cart.orderItems.map((item,index)=>{
										<ListGroup.Item>
											<Row>
												<Col md={1}>
													<Image src={item.image} alt={item.name} fluid rounded />
												</Col>
											</Row>
										</ListGroup.Item>
									})}
								</ListGroup>
							)}
						</ListGroup.Item>

          </ListGroup>
        </Col>
        <Col md={4}>Column</Col>
      </Row>
    </>
  );
}
export default PlaceOrderScreen