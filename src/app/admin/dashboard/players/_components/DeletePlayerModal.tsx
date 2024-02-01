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

export default function DeletePlayerModal({ isOpen, onClose, playerIds }: { isOpen: boolean, onClose: () => void, playerIds: string[] }) {
    const router = useRouter()
    const toast = useToast()
    const deleteManyPlayers = trpc.player.deleteMany.useMutation()

    function deletePlayers() {
        onClose()
        const promise = deleteManyPlayers.mutateAsync({ playerIds })
            .then(() => router.refresh())

        toast.promise(promise, {
            success: { title: "Deleted Player(s)", description: "These players have been deleted." },
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
                    You are about to delete { playerIds.length } player(s). Press delete to proceed.
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost">
                        Close
                    </Button>
                    <Button onClick={ deletePlayers }>
                        Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
