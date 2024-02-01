import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal"
import { Button, Flex, Select, useToast } from "@chakra-ui/react"

import { trpc } from "@/lib/trpc"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Match, School } from "@/app/types"
import { SingleDatepicker } from "chakra-dayzed-datepicker"

export default function UpdatePlayerModal({ isOpen, onClose, match, schools }: { isOpen: boolean, onClose: () => void, match: Match, schools: School[] }) {

    const updateMatchMutation = trpc.match.update.useMutation()
    const router = useRouter()
    const toast = useToast()

    const [homeSchoolId, setHomeSchoolId] = useState<string>()
    const [awaySchoolId, setAwaySchoolId] = useState<string>()
    const [date, setDate] = useState<Date>()
    const [published, setPublished] = useState(match.published)

    function updateMatch() {
        onClose()

        const promise = updateMatchMutation.mutateAsync({ id: match.id, homeSchoolId, awaySchoolId, date, published })
            .then(() => router.refresh())

        toast.promise(promise, {
            success: { title: "Updated match", description: "This match has been updated." },
            error: (e: Error) => ({ title: "An error has occurred", description: e.message }),
            loading: { title: "Loading...", description: "Please wait" }
        })
    }

    return (
        <Modal isOpen={ isOpen } onClose={ onClose }>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Update a Match</ModalHeader>
                <ModalCloseButton />
                <ModalBody as={ Flex } flexDirection="column" gap="16px">
                    <SingleDatepicker
                        name="Date"
                        date={ match.date }
                        onDateChange={ setDate }
                    />
                    <Select defaultValue={ match.homeSchool.id } onChange={ e => setHomeSchoolId(e.target.value) }>
                        { schools.map(school =>
                            <option key={ school.id } value={ school.id }>{ school.name }</option>
                        ) }
                    </Select>
                    <Select defaultValue={ match.awaySchool.id } onChange={ e => setAwaySchoolId(e.target.value) }>
                        { schools.map(school =>
                            <option key={ school.id } value={ school.id }>{ school.name }</option>
                        ) }
                    </Select>
                    <Select defaultValue={ match.published ? "true" : "false" } onChange={ e => setPublished(e.target.value === "true")}>
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost">
                        Close
                    </Button>
                    <Button onClick={ updateMatch }>
                        Update
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
