import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Navbar, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { handleLogout } from '../reducers/loginReducer'

const Header = () => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)
  console.log('login', login)

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>Blog Application</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to='/'>
            Blogs
          </Nav.Link>
          <Nav.Link as={Link} to='/users'>
            Users
          </Nav.Link>
        </Nav>
        <Nav>
          {login
            ? (<>
              <Navbar.Text style={{ color: 'white' }}>
                {login.name} logged in
              </Navbar.Text>
              <Button
                style={{ marginLeft: 15 }}
                variant="outline-info"
                onClick={() => dispatch(handleLogout())}
              >logout</Button>
            </>)
            : (<>
              <Nav.Link as={Link} to='/login' >
                Login
              </Nav.Link>
              <Nav.Link href='#'>Create Account</Nav.Link>
            </>)
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header