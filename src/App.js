
import './styles/index.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Products from './products';
import ProductDetails from './productdetails';
import Cart from './cart';
import { Navbar, Nav, Container } from 'react-bootstrap';
function App() {
  return (
    <div className="App">
      <Router>
        <div  >

          <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
            <Container>
              <Navbar.Brand as={Link} to="/products"><img src="/logo1.svg" width={50} height={50} />RChoice</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">Buy Products</Nav.Link>
                  <Nav.Link as={Link} to="/">Customer Services</Nav.Link>
                  <Nav.Link as={Link} to="/">Electronics</Nav.Link>
                  <Nav.Link as={Link} to="/">Men</Nav.Link>
                  <Nav.Link as={Link} to="/">Women</Nav.Link>
                </Nav>
                <Nav>
                  <Nav.Link href="#">Carts</Nav.Link>
                  <Nav.Link href="#">Signin</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/"
              element={<Products />} />
            <Route path="/productdetails/:id"
              element={<ProductDetails />} />
            <Route path="/cart/:id"
              element={<Cart />} />

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
