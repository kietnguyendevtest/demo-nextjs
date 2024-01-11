"use client";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "@/assets/css/header.scss";

function AppHeader() {
    return (
        <header className="header">
            <Navbar
                expand="lg"
                className="bg-body-tertiary"
                bg="dark"
                data-bs-theme="dark"
            >
                <Container>
                    <Link href="/" className="navbar-brand">
                        CRUD NextJS
                    </Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/about" className="nav-link">
                                About
                            </Link>
                            <Link href="/contact" className="nav-link">
                                Contact
                            </Link>
                            <Link href="/posts" className="nav-link">
                                Posts
                            </Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}

export default AppHeader;
