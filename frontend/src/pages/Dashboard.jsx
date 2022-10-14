import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  const {userData} = useSelector(state => state.user)

  useEffect(() => {
    if(!userData){
    navigate('/')
    }
  }, [])

  return (
    <div className='content'>
      <h1>Welcome to the Dashboard</h1>
    </div>
  )
}

export default Dashboard