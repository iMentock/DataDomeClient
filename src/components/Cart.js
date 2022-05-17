import axios from "axios"
import React, { useState } from "react"
import { Button, Col, Offcanvas, Row } from "react-bootstrap"
import { useCart } from "react-use-cart"
import { useAuth0 } from "@auth0/auth0-react"

/**
 * Cart component
 * - used in navbar to quickly display number of items
 * - on click presents offCanvas cart display
 */
const Cart = () => {
  // Cart context
  const { removeItem, items, isEmpty, cartTotal, emptyCart } = useCart()
  // Hooks
  const [show, setShow] = useState(false)
  // Auth0
  const { getAccessTokenSilently } = useAuth0()

  // Handles showing/dismissal of auth prompt
  const handleShow = () => {
    setShow(!show)
  }

  // Make call to API to remove -- on success delete from in memory cart
  const removeItemFromCart = async (itemID) => {
    const accessToken = await getAccessTokenSilently()
    // removeItem(itemID)

    axios
      // .delete(`http://localhost:3001/cart/${itemID}`, {
      .delete(`https://data-dome-module.herokuapp.com/cart/${itemID}`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: {},
      })
      .then((response) => {
        console.log(response)
        removeItem(itemID)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // Mimics checkout -- calls to delete all in API -- on success empties in memory cart
  const handleCheckout = async () => {
    const accessToken = await getAccessTokenSilently()

    axios
      // .delete(`http://localhost:3001/cart/remove/all`, {
      .delete(`https://data-dome-module.herokuapp.com/cart/remove/all`, {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: {},
      })
      .then((response) => {
        console.log(response)
        emptyCart()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        Cart {items.length}
      </Button>
      <Offcanvas
        show={show}
        onHide={handleShow}
        className="me-2"
        placement="end"
        scroll={true}
      >
        <Offcanvas.Header closeButton>Cart</Offcanvas.Header>
        <Offcanvas.Body>
          {!isEmpty ? (
            <>
              <Row>
                <Col xs={12}>
                  <h4>Total: ${cartTotal}</h4>
                </Col>
              </Row>
              {items.map((item, index) => (
                <div className="cart-item" key={index}>
                  <Row>
                    <Col xs={12}>
                      <p>
                        <span className="cart-title">Shoe:</span> {item.name}
                      </p>
                      <p>
                        <span className="cart-title">Price:</span> ${item.price}
                      </p>
                      <p>
                        <span className="cart-title">Quantity:</span>{" "}
                        {item.quantity}
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={3} />
                    <Col xs={6}>
                      <Button
                        variant="danger"
                        onClick={() => removeItemFromCart(item.id)}
                      >
                        Delete
                      </Button>
                    </Col>
                    <Col xs={3} />
                  </Row>
                </div>
              ))}
              <Row>
                <Col xs={2} />
                <Col xs={8}>
                  <Button
                    style={{ width: "100%", marginTop: "13px" }}
                    size="lg"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                </Col>
                <Col xs={2} />
              </Row>
            </>
          ) : (
            <p>your cart is empty, grab some shoes!</p>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  )
}

export default Cart
