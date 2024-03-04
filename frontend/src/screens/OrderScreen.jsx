import { Link, useParams } from "react-router-dom";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../slices/ordersApi";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Card, Col, Image, Button, ListGroup, Row } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [{ isPending }, payplaDispatch] = usePayPalScriptReducer();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);
  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success("Order is delivered");
    } catch (err) {
      alert(err.data.message || err.message);
    }
  };

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        payplaDispatch({
          type: "restOptions",
          value: {
            "client-id": "paypal.clientId",
            currency: "USD",
          },
        });
        payplaDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, payplaDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        alert("success");
      } catch (error) {
        alert(error?.data?.message || error.message);
      }
    });
  }

  async function onApproveTest(data, actions) {
    try {
      await payOrder({ orderId, details: { payer: {} } });
      refetch();
      toast.success("Order is paid");
    } catch (err) {
      alert(err?.data?.message || err.error);
    }
  }

  function onError(err) {
    alert(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error?.error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2> shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <strong>Email:</strong> {order.user.email}
              <p>
                <strong>Address</strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city}
                {""}
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2> Payment Method</h2>
              <p>
                <strong> Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item, index) => (
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item?.image} alt={item?.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item?.product}`}>{item?.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item?.qty} x ${item?.price} = ${item?.qty * item?.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant={"flush"}>
              <ListGroup.Item>
                <h2> Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        onClick={onApproveTest}
                        style={{ marginBottom: "10px" }}
                      >
                        {" "}
                        Test Pay Order
                      </Button>
                      <div>
                        {" "}
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverOrderHandler}
                    >
                      {" "}
                      Mark as Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default OrderScreen;
