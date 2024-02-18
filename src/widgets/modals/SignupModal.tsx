import {Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
type Props = {
    isOpen: boolean;
    onOpenChange: (value: boolean) => void;
}
const SignupModal = ({isOpen, onOpenChange}: Props) => {
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
                            <Input
                                autoFocus
                                label="Email"
                                placeholder="Enter your email"
                                variant="bordered"
                            />
                            <Input
                                label="Password"
                                placeholder="Enter your password"
                                variant="bordered"
                                type="password"
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="primary" onPress={onClose}>
                                Sign in
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default SignupModal;