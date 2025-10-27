import React from "react";
import { Modal, Button } from "react-bootstrap";

interface ConfirmModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    show,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure you want to proceed?",
    confirmText = "Yes",
    cancelText = "Cancel",
}) => {
    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    {cancelText}
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    {confirmText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default React.memo(ConfirmModal);
