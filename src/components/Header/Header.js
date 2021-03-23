import React from 'react';
import { Button, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="container">
            <Navbar bg="transparent" expand="lg">
                <Link className="navLink navbar-brand" to="/home">Orbit Rider</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                    <Link className="navLink mb-3 mb-lg-0" to="/home">Home</Link>
                    <Link className="navLink mb-3 mb-lg-0" to="/Destination">Destination</Link>
                    <Link className="navLink mb-3 mb-lg-0" to="/blog">Blog</Link>
                    <Link className="navLink mb-3 mb-lg-0" to="/contact">Contact</Link>
                    </Nav>
                    <Button variant="danger">Search</Button>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;