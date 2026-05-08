import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
import { Footer } from "../Footer/Footer"
import { useState } from "react"

export const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#fdf2f8]">

      {!isModalOpen && (
        <Navbar setIsModalOpen={setIsModalOpen} />
      )}

      <Outlet context={{ setIsModalOpen }} />

      <Footer />
    </div>
  )
}