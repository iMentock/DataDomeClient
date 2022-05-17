import React, { useEffect, useState } from "react"
import { Row, Col } from "react-bootstrap"
import ShoeCard from "./ShoeCard"
const axios = require("axios")

/**
 * Shoe List component
 * Responsible for showing list of all shoes offered
 * - Gets list of shoes from 'module' API
 * - No authorization needed on front end or backend
 */
const ShoeList = () => {
  // Hooks
  const [shoeList, setShoeList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // On load check if the list is not populated, if not gather the list and display
  useEffect(() => {
    if (shoeList.length === 0) {
      getShoeList()
    } else {
      setIsLoading(false)
    }
  }, [shoeList])

  // Method gets shoes from 'module' API and sets in memory via hook
  const getShoeList = async () => {
    axios
      // .get("http://localhost:3001/shoes")
      .get("https://data-dome-module.herokuapp.com/shoes")
      .then((response) => {
        setShoeList(response.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  return (
    <>
      {/* if loading show status */}
      {isLoading ? (
        <div>
          <p>loading...</p>
        </div>
      ) : (
        <div className="shoeList">
          <Row>
            <h1>Browse Our Shop</h1>
          </Row>
          <Row xs={1} md={3}>
            {shoeList.map((shoe, index) => (
              <div key={index}>
                <ShoeCard shoe={shoe} />
              </div>
            ))}
          </Row>
        </div>
      )}
    </>
  )
}

export default ShoeList
