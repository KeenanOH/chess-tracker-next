import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal"
import { signIn } from "next-auth/react"

import ContinueWithGoogleButton from "../buttons/ContinueWithGoogleButton"

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Log in</ModalHeader>
                <ModalCloseButton />
                <ModalBody>To use MSL Chess Tracker, please continue in with google</ModalBody>
                <ModalFooter>
                    <ContinueWithGoogleButton onClick={ () => signIn("google", { callbackUrl: "/dashboard" }) } />
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
