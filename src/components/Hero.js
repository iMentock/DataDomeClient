import { Col, Image, Row } from "react-bootstrap"
import Logo from "../images/DdSneakersLogo.png"

/**
 * Basic component responsible for displaying hero section with logo
 */
const Hero = () => {
  return (
    <div className="hero">
      <Row>
        <Col xs={2} />
        <Col xs={8}>
          <Image src={Logo} />
        </Col>
        <Col xs={2} />
      </Row>
    </div>
  )
}

export default Hero
