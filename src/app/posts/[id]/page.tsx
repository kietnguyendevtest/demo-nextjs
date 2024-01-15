"use client";
import useSWR, { Fetcher } from "swr";
import { Container, Card } from "react-bootstrap";
import Link from "next/link";

function PostDetail({ params }: { params: { id: string } }) {
    // const fetcher: Fetcher<IPosts, string> = (url: string) =>
    //     fetch(url).then((res) => res.json());

    const fetcher = (url: string) =>
        fetch(url, {
            method: "GET",
        }).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        `${process.env.URL_API}/posts/${params.id}`,
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
                <Link
                    href="/posts"
                    className="btn btn-outline-secondary btn-sm"
                >
                    &#8672; Go back
                </Link>
            </div>

            <br />

            <Card border="info">
                <Card.Header>No.{data?.data[0].id}</Card.Header>
                <Card.Body>
                    <Card.Title>{data?.data[0].title}</Card.Title>
                    <Card.Text>{data?.data[0].content}</Card.Text>
                </Card.Body>
                <Card.Footer>Author - {data?.data[0].author}</Card.Footer>
            </Card>
        </Container>
    );
}

export default PostDetail;
