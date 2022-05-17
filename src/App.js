import { Container } from "react-bootstrap"
import "./App.css"
import DdNavbar from "./components/DdNavbar"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import { CartProvider } from "react-use-cart"

/**
 * Main App component
 * - Organizes navbar and provides cart context to all children components
 */
function App() {
  return (
    <CartProvider>
      <div className="App">
        <Container>
          <DdNavbar />
          <Home />
        </Container>
      </div>
      <Footer />
    </CartProvider>
  )
}

export default App
