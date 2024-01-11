"use client";
import { Button, Container } from "react-bootstrap";

import useSWR from "swr";
import AppTable from "@/components/app.table";
import Link from "next/link";

// interface PostListProps {
//     posts: IPosts[] = [];
// }

function PostList() {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());
    const { data, error, isLoading } = useSWR(
        "https://nmkiet-api-fake-json-server.vercel.app/api/posts",
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
                <h1>Post List</h1>
                <Button variant="outline-secondary" size="sm">
                    <Link href="/">&#8672; Go home page</Link>
                </Button>
            </div>
            <br />
            <AppTable posts={data?.sort((a: any, b: any) => b.id - a.id)} />
        </Container>
    );
}

export default PostList;
