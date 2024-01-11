"use client";
import Link from "next/link";
import { Button, Container } from "react-bootstrap";

function Contact() {
    return (
        <Container>
            <h1>Contact Page</h1>

            <Button variant="outline-secondary" size="sm">
                <Link href="/">&#8672; Go home page</Link>
            </Button>
        </Container>
    );
}

export default Contact;
