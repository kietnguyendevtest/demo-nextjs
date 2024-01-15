"use client";
import Link from "next/link";
import { Container } from "react-bootstrap";

function Contact() {
    return (
        <Container>
            <h1>Contact Page</h1>

            <Link href="/" className="btn btn-outline-secondary btn-sm">
                &#8672; Go home page
            </Link>
        </Container>
    );
}

export default Contact;
