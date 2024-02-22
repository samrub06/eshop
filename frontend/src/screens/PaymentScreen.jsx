import { useState, useEffect } from "react";
import { FormContainer } from "../components/FormContainer";
import CheckoutSteps from "./CheckoutSteps";
import { Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
	console.log(shippingAddress);
  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

	const submitHandler = (e) =>{
		console.log("object");
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
		navigate('/placeorder')
	}

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1> Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend"> Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="Paypal or Credit Card"
              id="Paypal"
              name="paymentMethod"
              value="Paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
