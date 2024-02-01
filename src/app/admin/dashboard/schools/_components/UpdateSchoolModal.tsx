import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal"
import { Button, Input, useToast } from "@chakra-ui/react"

import { trpc } from "@/lib/trpc"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { School } from "@/app/types"

export default function UpdateSchoolsModal({ isOpen, onClose, school }: { isOpen: boolean, onClose: () => void, school: School }) {

    const updateSchoolMutation = trpc.school.update.useMutation()
    const router = useRouter()
    const toast = useToast()
    const [name, setName] = useState("")

    function updateSchool() {
        if (name === "")
            return

        onClose()
        const promise = updateSchoolMutation.mutateAsync({ id: school.id, name: name })
            .then(() => router.refresh())

        toast.promise(promise, {
            success: { title: "Updated school", description: "This school has been updated." },
            error: (e: Error) => ({ title: "An error has occurred", description: e.message }),
            loading: { title: "Loading...", description: "Please wait" }
        })
    }

    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update a School</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input defaultValue={ school.name } onChange={ e => setName(e.target.value) }/>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost">
                        Close
                    </Button>
                    <Button onClick={ updateSchool }>
                        Update
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
