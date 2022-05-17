import React from "react"
import { useAuth0 } from "@auth0/auth0-react"
import { Navbar, Button } from "react-bootstrap"
import Cart from "./Cart"

/**
 * Navbar component
 * allows user to:
 * + see cart
 * + login
 * + logout
 * - Will be shown at all times
 * - Shows user's name and logged in status
 */
const DdNavbar = () => {
  // Auth0
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

  return (
    <Navbar expand="md">
      <Navbar.Brand>DD Sneakers</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          {isAuthenticated ? (
            <div>
              <Cart />
              <span>
                Signed in as: {user.name}
                <Button
                  variant="link"
                  onClick={() => logout({ returnTo: window.location.origin })}
                  style={{ marginLeft: "12px" }}
                >
                  Logout
                </Button>
              </span>
            </div>
          ) : (
            <Button
              variant="link"
              onClick={() => {
                loginWithRedirect()
              }}
              style={{ marginLeft: "12px" }}
            >
              Login
            </Button>
          )}
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default DdNavbar
