import { useRouter } from "next/navigation"
import { Button, useToast } from "@chakra-ui/react"
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

export default function DeletePlayerModal({ isOpen, onClose, matchIds }: { isOpen: boolean, onClose: () => void, matchIds: string[] }) {
    const router = useRouter()
    const toast = useToast()
    const deleteManyMatches = trpc.match.deleteMany.useMutation()

    function deleteMatches() {
        onClose()
        const promise = deleteManyMatches.mutateAsync({ matchIds })
            .then(() => router.refresh())

        toast.promise(promise, {
            success: { title: "Deleted Match(es)", description: "These matches have been deleted." },
            error: (e: Error) => ({ title: "An error has occurred", description: e.message }),
            loading: { title: "Loading...", description: "Please wait" }
        })
    }

    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Delete Matches(s)</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    You are about to delete { matchIds.length } matches(s). Press delete to proceed.
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost">
                        Close
                    </Button>
                    <Button onClick={ deleteMatches }>
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
