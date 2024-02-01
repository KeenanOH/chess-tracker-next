import { trpc } from "@/lib/trpc"
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal"
import { Button, useToast } from "@chakra-ui/react"
import { useRouter } from "next/navigation"

export default function DeleteSchoolModal({ isOpen, onClose, schoolIds }: { isOpen: boolean, onClose: () => void, schoolIds: string[] }) {

    const router = useRouter()
    const toast = useToast()
    const deleteManySchools = trpc.school.deleteMany.useMutation()

    function deleteSchool() {
        onClose()
        const promise = deleteManySchools.mutateAsync({ schoolIds })
            .then(() => router.refresh())

        toast.promise(promise, {
            success: { title: "Deleted School(s)", description: "These schools have been deleted." },
            error: (e: Error) => ({ title: "An error has occurred", description: e.message }),
            loading: { title: "Loading...", description: "Please wait" }
        })
    }
    
    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete School(s)</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    You are about to delete { schoolIds.length } school(s). Press delete to proceed.
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost">
                        Close
                    </Button>
                    <Button onClick={ deleteSchool }>
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
