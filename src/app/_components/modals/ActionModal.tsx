import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal"
import { Button, Flex, useToast } from "@chakra-ui/react"
import { useRouter } from "next/navigation"
import React from "react"

type ActionModalProps = {

    action: () => Promise<any>, // eslint-disable-line
    isOpen: boolean,
    onClose: () => void,
    header: string,
    children: React.ReactNode | React.ReactNode[],
    buttonText: string,
    successMessage: string
}

export default function ActionModal({ action, isOpen, onClose, header, successMessage, buttonText, children }: ActionModalProps) {

    const toast = useToast()
    const router = useRouter()

    function handleAction() {
        const promise = action()
            .then(() => {
                onClose()
                router.refresh()
            })

        toast.promise(promise, {
            success: { title: "Success", description: successMessage },
            error: (e: Error) => ({ title: "Error", description: e.message }),
            loading: { title: "Loading...", description: "Please wait" }
        })
    }

    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{ header }</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={ Flex } flexDirection="column" gap="16px">
                    { children }
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost">
                        Close
                    </Button>
                    <Button onClick={ handleAction }>
                        { buttonText }
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

}
