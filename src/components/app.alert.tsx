"use client";
import React from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface AppAlertProps {
    showAlert: boolean;
    setShowAlert: (v: boolean) => void;
    postId: number | null;
}

function AppAlert(props: AppAlertProps) {
    const { showAlert, setShowAlert, postId } = props;

    const handleClose = () => {
        setShowAlert(false);
    };

    const handleSave = () => {
        fetch(`${process.env.URL_API}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    toast.success("Delete succeed");
                    setShowAlert(false);
                    mutate(`${process.env.URL_API}/posts`);
                } else {
                    toast.error("Delete Failed");
                }
            });
    };

    return (
        <>
            <Modal
                show={showAlert}
                onHide={() => handleClose()}
                backdrop="static"
                keyboard={false}
                size="sm"
                centered
            >
                <Alert show={showAlert} variant="danger" className="m-0">
                    <Alert.Heading>&#8265;</Alert.Heading>
                    <p>
                        Are you sure delete <b>No.{postId}</b>?
                    </p>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button
                            onClick={() => handleSave()}
                            variant="success"
                            size="sm"
                        >
                            Yes
                        </Button>
                        &nbsp;
                        <Button
                            onClick={() => handleClose()}
                            variant="secondary"
                            size="sm"
                        >
                            No
                        </Button>
                    </div>
                </Alert>
            </Modal>
        </>
    );
}

export default AppAlert;
