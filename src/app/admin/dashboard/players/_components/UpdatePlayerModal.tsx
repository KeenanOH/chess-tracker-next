import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal"
import { Button, Flex, Input, Select, useToast } from "@chakra-ui/react"

import { trpc } from "@/lib/trpc"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Player, School } from "@/app/types"

export default function UpdatePlayerModal({ isOpen, onClose, player, schools }: { isOpen: boolean, onClose: () => void, player: Player, schools: School[] }) {

    const updatePlayerMutation = trpc.player.update.useMutation()
    const router = useRouter()
    const toast = useToast()
    const [firstName, setFirstName] = useState(player.firstName)
    const [lastName, setLastName] = useState(player.lastName)
    const [schoolId, setSchoolId] = useState(player.school.id)

    function updatePlayer() {
        if (firstName === "" || lastName === "" || schoolId === "")
            return

        onClose()

        const promise = updatePlayerMutation.mutateAsync({ id: player.id, firstName, lastName, schoolId })
            .then(() => router.refresh())

        toast.promise(promise, {
            success: { title: "Updated player", description: "This player has been updated." },
            error: (e: Error) => ({ title: "An error has occurred", description: e.message }),
            loading: { title: "Loading...", description: "Please wait" }
        })
    }

    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update a Player</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={ Flex } flexDirection="column" gap="16px">
                    <Input defaultValue={ player.firstName } onChange={ e => setFirstName(e.target.value) } />
                    <Input defaultValue={ player.lastName } onChange={ e => setLastName(e.target.value) }/>
                    <Select defaultValue={ player.school.id } onChange={ e => setSchoolId(e.target.value) }>
                        { schools.map(school =>
                            <option key={ school.id } value={ school.id }>{ school.name }</option>
                        ) }
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost">
                        Close
                    </Button>
                    <Button onClick={ updatePlayer }>
                        Update
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
