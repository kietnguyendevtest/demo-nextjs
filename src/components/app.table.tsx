import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import Link from "next/link";
import AppModal from "./app.modal";
import AppAlert from "./app.alert";

interface AppTableProps {
    posts: IPosts[];
}

function AppTable(props: AppTableProps) {
    const { posts } = props;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [postItem, setPostItem] = useState<IPosts | null>(null);
    const [postId, setPostId] = useState<number>(0);

    const handleAddnew = () => {
        setShowModal(true);
        setPostItem(null);
    };

    const handeleEdit = (item: IPosts) => {
        setShowModal(true);
        setPostItem(item);
    };

    const handeleDelete = (id: number) => {
        setPostId(id);
        setShowAlert(true);
    };

    return (
        <>
            <AppModal
                showModal={showModal}
                setShowModal={setShowModal}
                postItem={postItem}
                setPostItem={setPostItem}
            />

            <AppAlert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                postId={postId}
            />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th
                            style={{
                                width: "215px",
                                textAlign: "center",
                            }}
                        >
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleAddnew()}
                            >
                                Add new
                            </Button>
                        </th>
                        <th>No</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Content</th>
                    </tr>
                </thead>
                <tbody>
                    {posts?.map((item) => {
                        return (
                            <tr key={item.id}>
                                <td>
                                    <Link
                                        href={`/posts/${item.id}`}
                                        className="btn btn-info btn-sm mx-2"
                                    >
                                        View
                                    </Link>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="mx-2"
                                        onClick={() => handeleEdit(item)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="secondary"
                                        size="sm"
                                        className="mx-2"
                                        onClick={() => handeleDelete(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.author}</td>
                                <td>{item.content}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </>
    );
}

export default AppTable;
