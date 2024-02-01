import { School } from "@/app/types"
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal"
import { useState } from "react"
import { Button, Flex, Input, Select, useToast } from "@chakra-ui/react"
import { trpc } from "@/lib/trpc"
import { useRouter } from "next/navigation"

export default function CreatePlayerModal({ isOpen, onClose, schools }: { isOpen: boolean, onClose: () => void, schools: School[] }) {

    const createPlayerMutation = trpc.player.create.useMutation()
    const toast = useToast()
    const router = useRouter()
    
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [schoolId, setSchoolId] = useState("")

    function createPlayer() {
        if (firstName === "" || lastName === "" || schoolId === "")
            return

        onClose()

        const promise = createPlayerMutation.mutateAsync({ firstName, lastName, schoolId })
            .then(() => router.refresh())

        toast.promise(promise, {
            success: { title: "Added player", description: "This player has been added to the database." },
            error: (e: Error) => ({ title: "An error has occurred", description: e.message }),
            loading: { title: "Loading...", description: "Please wait" }
        })
    }

    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Player</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={ Flex } flexDirection="column" gap="16px">
                    <Input placeholder="First Name" onChange={ e => setFirstName(e.target.value) } />
                    <Input placeholder="Last Name" onChange={ e => setLastName(e.target.value) }/>
                    <Select placeholder="School" onChange={ e => setSchoolId(e.target.value) }>
                        { schools.map(school =>
                            <option key={ school.id } value={ school.id }>{ school.name }</option>
                        ) }
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost">
                        Close
                    </Button>
                    <Button onClick={ createPlayer }>
                        Add
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
