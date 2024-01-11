"use client";
import useSWR, { Fetcher } from "swr";
import { Container, Card, Button } from "react-bootstrap";
import Link from "next/link";

function PostDetail({ params }: { params: { id: string } }) {
    const fetcher: Fetcher<IPosts, string> = (url: string) =>
        fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/api/posts/${params.id}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    if (isLoading) return <div>Loading...</div>;

    return (
        <Container>
            <div>
                <h1>Post Detail</h1>
                <Button variant="outline-secondary" size="sm">
                    <Link href="/posts">&#8672; Go back</Link>
                </Button>
            </div>

            <br />

            <Card border="info">
                <Card.Header>No.{data?.id}</Card.Header>
                <Card.Body>
                    <Card.Title>{data?.title}</Card.Title>
                    <Card.Text>{data?.content}</Card.Text>
                </Card.Body>
                <Card.Footer>Author - {data?.author}</Card.Footer>
            </Card>
        </Container>
    );
}

export default PostDetail;
