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

export default function AddSchoolsModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    
    const createSchool = trpc.school.create.useMutation()
    const router = useRouter()
    const toast = useToast()
    const [name, setName] = useState("")

    function addSchool() {
        if (name === "")
            return

        onClose()
        const promise = createSchool.mutateAsync({ name: name })
            .then(() => router.refresh())

        toast.promise(promise, {
            success: { title: "Added school", description: "This school has been added to the database." },
            error: (e: Error) => ({ title: "An error has occurred", description: e.message }),
            loading: { title: "Loading...", description: "Please wait" }
        })
    }

    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add a School</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input placeholder="Name" onChange={ e => setName(e.target.value) }/>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost">
                        Close
                    </Button>
                    <Button onClick={ addSchool }>
                        Add
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
