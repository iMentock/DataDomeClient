import { Col, Row } from "react-bootstrap"

/**
 * Basic component responsible for displaying footer at bottom of screen
 */
const Hero = () => {
  return (
    <div className="footer">
      <Row>
        <Col xs={6}>CopyRight 2022 Virgil Martinez & DataDome</Col>

        <Col xs={6} />
      </Row>
    </div>
  )
}

export default Hero
