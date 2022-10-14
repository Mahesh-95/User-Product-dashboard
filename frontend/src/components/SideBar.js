import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='sidebar'>
        <ul className='sidebar-menu'>
          <li> <Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/products">Products</Link></li>
        </ul>
    </div>
  )
}

export default SideBar