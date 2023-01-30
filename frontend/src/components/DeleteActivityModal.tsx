import React from "react";
import { Modal, Button } from "react-bootstrap";



interface DeleteActivityModalProps {
    isShow: boolean;
    onDelete?: () => void;
    onHide: () => void;
}

export default function DeleteActivityModal(    
    props: DeleteActivityModalProps
) {

return (
    <Modal show={props.isShow} onHide={props.onHide}>

        <Modal.Header>
            <Modal.Title>
                Delete Activity Confirmation
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
            Do you confirm to delete this activity? "
            <span className="text-primary"></span>"?

            <br />
            <i className="text-danger">
                This action cannot be reversed.
            </i>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary" onClick={props.onHide}>
            Cancel
            </Button>

            <Button variant="danger" onClick={props.onDelete}>
            Confirm Delete
            </Button>

        </Modal.Footer>

    </Modal>
);

}