import React, { useState } from "react"
import { Alert, Button, Card, Col, Modal, Spinner } from "react-bootstrap"
import { useAuth0 } from "@auth0/auth0-react"
import axios from "axios"
import { useCart } from "react-use-cart"

/**
 * Component is responsible for showing an individual shoe card from shoe list
 *
 * @param {shoe {_id, shoeName, shoePrice}} props
 */
const ShoeCard = (props) => {
  // Auth0
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect } =
    useAuth0()
  // Hooks
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showAlert, setShowAlert] = useState(false)

  // Cart context
  const { addItem } = useCart()

  /**
   * Method handles adding a shoe to the cart
   * - First makes call to 'module' API
   * - On success then adds to in memory cart
   * - Protected on both front end and back end with Auth0 JWT token(s)
   */
  const handleAddToCart = async () => {
    // if user is not authenticated prompt to login then proceed
    if (!isAuthenticated) {
      setShow(true)
    } else {
      setIsLoading(true)
      try {
        const accessToken = await getAccessTokenSilently()

        if (accessToken) {
          // Make call to add item to cart
          axios
            .post(
              // "http://localhost:3001/cart",
              "https://data-dome-module.herokuapp.com/cart",
              {
                shoe: {
                  id: props.shoe._id,
                  name: props.shoe.shoeName,
                  price: props.shoe.shoePrice,
                },
              },
              {
                headers: {
                  "content-type": "application/json",
                  Authorization: `Bearer ${accessToken}`,
                },
                data: {},
              }
            )
            .then((response) => {
              // If there is a good response add the item to the in memory cart (context) using passed in shoe
              const product = {
                id: props.shoe._id,
                name: props.shoe.shoeName,
                price: props.shoe.shoePrice,
              }
              addItem(product)
              setShowAlert(true)
            })
            .catch((err) => {
              // TODO error handling
              console.log(err)
              setError(err)
              setShowAlert(true)
            })
            .finally(() => {
              setIsLoading(false)
              setTimeout(() => {
                setShowAlert(false)
                setError(null)
              }, 1500)
            })
        }
      } catch (err) {
        // TODO error handling
        console.log("ERROR")
        console.log(err)
      }
    }
  }

  return (
    <Card className="shoeCard">
      <Card.Img variant="top" src={props.shoe.shoePicture} />
      <Alert
        show={showAlert}
        variant={error ? "danger" : "primary"}
        onClose={() => setShowAlert(false)}
        dismissible
      >
        {error
          ? "There was a problem adding to cart, please try again."
          : "Added to cart!"}
      </Alert>
      <Card.Title>{props.shoe.shoeName}</Card.Title>
      <Card.Text>${props.shoe.shoePrice}</Card.Text>
      <Col xs={6} style={{ margin: "auto" }}>
        <Button
          variant="primary"
          onClick={handleAddToCart}
          size="sm"
          disabled={isLoading}
        >
          {!isLoading ? "Add To Cart" : `${(<Spinner />)} Adding...`}
        </Button>
      </Col>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header>
          <Modal.Title>Please Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Login Required to Add To Cart</h4>
          <p>
            To protect us from Bots and provide a better shopping experience for
            our valued customers we require you to login in order to interact
            with our secure cart.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              loginWithRedirect()
            }}
          >
            Login
          </Button>
          <Button variant="danger" onClick={() => setShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  )
}

export default ShoeCard
