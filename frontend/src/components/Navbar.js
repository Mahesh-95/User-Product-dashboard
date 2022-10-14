import React, {useState, useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {Container, Nav, Navbar} from 'react-bootstrap'
import { logout } from '../features/user/userSlice'
import defaultImage from '../assets/img/default.jpg'


const NavMenu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [daysToGo, setDaysToGo] = useState(0)

  const {userData} = useSelector(state => state.user)

  useEffect(()=>{
    if(userData){
      let birthdate = new Date(userData.birthDate)
      birthdate.setFullYear(new Date().getFullYear())
      let days = Math.ceil((birthdate.getTime() - new Date().getTime())/ (1000 * 3600 * 24))
      setDaysToGo(() => {
        if(days> 0) {
          return days
        }else {
          return 0
        }
      })
    }
  }, [userData])

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }


  return (
    <Navbar fixed="top" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">M</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {userData?
            (
              <>
                <Nav.Link> <img src={userData.image? userData.image : defaultImage} width={"35px"} height={"35px"} style={{borderRadius: "50%", objectFit: "cover"}}/> </Nav.Link>
                <Nav.Link>{userData.name}</Nav.Link>
                <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                <Nav.Link className="birthdays">{daysToGo} Days to go</Nav.Link>
              </>
              ):(
              <>
              <Nav.Link href="/">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
              </>)
          }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavMenu