import React from "react"
import ShoeList from "../components/ShoeList"
import Hero from "../components/Hero"

/**
 * Home --"Page" level component
 * organizes landing page
 */
const Home = () => {
  return (
    <div>
      <Hero />
      <ShoeList />
    </div>
  )
}

export default Home
