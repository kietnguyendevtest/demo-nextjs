"use client";
import { Container } from "react-bootstrap";

import useSWR from "swr";
import AppTable from "@/components/app.table";
import Link from "next/link";

// interface PostListProps {
//     posts: IPosts[] = [];
// }

function PostList() {
    const fetcher = (url: string) =>
        fetch(url, {
            method: "GET",
        }).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        `${process.env.URL_API}/posts`,
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
                <Link href="/" className="btn btn-outline-secondary btn-sm">
                    &#8672; Go home page
                </Link>
            </div>
            <br />
            <AppTable
                posts={data.data?.sort((a: any, b: any) => b.id - a.id)}
            />
        </Container>
    );
}

export default PostList;
