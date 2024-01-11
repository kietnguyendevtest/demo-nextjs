import { useState } from "react";
import { Button, Table } from "react-bootstrap";
import Link from "next/link";
import AppModal from "./app.modal";
import AppAlert from "./app.alert";

interface IProps {
    posts: IPosts[];
}

function AppTable(props: IProps) {
    const { posts } = props;
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [postItem, setPostItem] = useState<IPosts | null>(null);

    const handleAddnew = () => {
        setShowModal(true);
        setPostItem(null);
    };

    const handeleEdit = (item: IPosts) => {
        setShowModal(true);
        setPostItem(item);
    };

    const handeleDelete = (item: IPosts) => {
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
                postId={postItem && postItem.id}
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
                                    <Button
                                        variant="info"
                                        size="sm"
                                        className="mx-2"
                                    >
                                        <Link href={`/posts/${item.id}`}>
                                            View
                                        </Link>
                                    </Button>
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
                                        onClick={() => handeleDelete(item)}
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
