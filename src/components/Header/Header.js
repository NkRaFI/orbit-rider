import React, { useContext } from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LoggedInUserContext } from '../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(LoggedInUserContext);
    const handleSignOut = () => {
        const signedOUtUser = {
            isSignedIn: false,
            name: '',
            email: '',
            photo: '',
          }
        setLoggedInUser(signedOUtUser);
      }
    return (
        <div className="container">
            <Navbar bg="transparent" expand="lg">
                <Link className="navLink navbar-brand logo" to="/home">Orbit Rider</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Link className="navLink mb-3 mb-lg-0" to="/home">Home</Link>
                    <Link className="navLink mb-3 mb-lg-0" to="/Destination">Destination</Link>
                    <Link className="navLink mb-3 mb-lg-0" to="/blog">Blog</Link>
                    <Link className="navLink mb-3 mb-lg-0" to="/contact">Contact</Link>
                    </Nav>
                    {
                        loggedInUser?.name && <h5 className="userName">{loggedInUser.name}</h5>
                    }
                    {
                        loggedInUser?.name || loggedInUser.email
                        ? <Button onClick={handleSignOut} variant="danger">Log out</Button>
                        : <Link to="/login"><Button variant="danger">Login</Button></Link>
                    }
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;