import React from "react"
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"

const PrimaryModal: React.FC<{
    isOpen: boolean,
    onClose: ()=>any,
    footerChildren?: any
    title?: any
    className?: string;
}> = (props) => {

    return <Modal isOpen={props.isOpen} className={props.className} >
        <ModalHeader>
            <div className="title-text">
                {props.title}
            </div>
            <div className="modal-close">
                <span className={"btn"}
                    onClick={props.onClose}
                >
                    <button>X</button>
                </span>
            </div>
        </ModalHeader>
        <ModalBody>
            {props.children}
        </ModalBody>
        <ModalFooter>
            {props.footerChildren ?? null}
        </ModalFooter>
    </Modal>

}

export {PrimaryModal}