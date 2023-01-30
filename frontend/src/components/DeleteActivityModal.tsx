import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "../css/schedule.module.scss";


interface DeleteActivityModalProps {
    isShow: boolean;
    onDelete?: () => void;
    onHide?: () => void;
    activityNameToBeDeleted?: string;
}

export default function DeleteActivityModal(
    props: DeleteActivityModalProps
) {

    return (<>
        <Modal show={props.isShow} onHide={props.onHide} className={styles.deleteModalContainer} >

            <div className={styles.details}>
                <div className={styles.bodyPart}>
                    <Modal.Body>
                        <div className={styles.fontSize}>確認刪除
                            <span className="text-primary">""{props.activityNameToBeDeleted}"" ?</span>
                        </div>
                        <br />
                        <i className="text-danger">
                            **請注意刪除後紀錄不能復原
                        </i>
                    </Modal.Body>
                </div>
                <div className={styles.buttonPart}>
                    {/* <Modal.Footer> */}
                    <Button variant="secondary" onClick={props.onHide} className={styles.cancelButton}>
                        Cancel
                    </Button>

                    <Button variant="danger" onClick={()=>{props.onDelete!()}} className={styles.confirmButton} >
                        Confirm Delete
                    </Button>

                    {/* </Modal.Footer> */}
                </div>
            </div>
        </Modal>
    </>
    );

}