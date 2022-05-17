import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { Auth0Provider } from "@auth0/auth0-react"

// Auth0Provider provides authentication context throughout App
ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    redirectUri={window.location.origin}
    audience="https://test-api"
    scope="read:current_user"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
)
