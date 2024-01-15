import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface AppModalProps {
    showModal: boolean;
    setShowModal: (v: boolean) => void;
    postItem: IPosts | null;
    setPostItem: (v: IPosts | null) => void;
}

function AppModal(props: AppModalProps) {
    const { showModal, setShowModal, postItem, setPostItem } = props;
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [content, setContent] = useState<string>("");

    useEffect(() => {
        if (postItem && postItem.id) {
            setTitle(postItem.title);
            setAuthor(postItem.author);
            setContent(postItem.content);
        }
    }, [postItem]);

    const handleCloseModal = () => {
        setTitle("");
        setAuthor("");
        setContent("");
        setShowModal(false);
        setPostItem(null);
    };

    const handleSubmit = () => {
        if (!title) {
            toast.warning("Not empty title");
            return;
        }
        if (!author) {
            toast.warning("Not empty author");
            return;
        }
        if (!content) {
            toast.warning("Not empty content");
            return;
        }

        if (postItem && postItem.id) {
            fetch(`${process.env.URL_API}/posts/${postItem.id}`, {
                method: "PUT",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, author, content }),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res) {
                        toast.success("Edit succeed");
                        handleCloseModal();
                        mutate(`${process.env.URL_API}/posts`);
                    } else {
                        toast.error("Edit Failed");
                    }
                });
        } else {
            fetch(`${process.env.URL_API}/posts`, {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, author, content }),
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res) {
                        toast.success("Create succeed");
                        handleCloseModal();
                        mutate(`${process.env.URL_API}/posts`);
                    } else {
                        toast.error("Create Failed");
                    }
                });
        }
    };

    return (
        <>
            <Modal
                show={showModal}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {!postItem ? (
                            "Add new a post"
                        ) : (
                            <span>&#9999; Edit a post</span>
                        )}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder=""
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleSubmit()}
                    >
                        Save
                    </Button>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleCloseModal()}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AppModal;
