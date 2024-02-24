import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";
import {useTranslation} from "react-i18next";
import RegisterForm from "../forms/RegisterForm.tsx";
type Props = {
    isOpen: boolean;
    onOpenChange: (value: boolean) => void;
}
const SignupModal = ({isOpen, onOpenChange}: Props) => {
    const {t} = useTranslation()
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
                        <ModalHeader>{t('auth.register')}</ModalHeader>
                        <ModalBody>
                            <RegisterForm formId="registerForm" onSubmit={onClose} />
                        </ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="flat" onPress={onClose}>
                                {t('button.close')}
                            </Button>
                            <Button color="primary" type="submit" form="registerForm">
                                {t('auth.register')}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default SignupModal;