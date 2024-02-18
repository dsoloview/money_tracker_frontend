import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import LoginForm from "../forms/LoginForm.tsx";
type Props = {
    isOpen: boolean;
    onOpenChange: (value: boolean) => void;
}

const LoginModal = ({isOpen, onOpenChange}: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            motionProps={
                {
                    initial: {opacity: 0, y: -20},
                    animate: {opacity: 1, y: 0},
                    exit: {opacity: 0, y: -20},
                }
            }
        >
            <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                    <LoginForm formId="loginForm" onSubmit={onClose} />
                    </ModalBody>
                    <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                Close
            </Button>
            <Button type="submit" form="loginForm" color="primary">
                Submit
            </Button>
        </ModalFooter>
                    </>
                )}

            </ModalContent>
        </Modal>
    );
}

export default LoginModal;