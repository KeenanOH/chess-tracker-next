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
import { Button, Flex, Select, useToast } from "@chakra-ui/react"
import { trpc } from "@/lib/trpc"
import { useRouter } from "next/navigation"
import { SingleDatepicker } from "chakra-dayzed-datepicker"

export default function CreateMatchModal({ isOpen, onClose, schools }: { isOpen: boolean, onClose: () => void, schools: School[] }) {

    const createMatchMutation = trpc.match.create.useMutation()
    const toast = useToast()
    const router = useRouter()

    const [date, setDate] = useState(new Date())
    const [homeSchoolId, setHomeSchoolId] = useState("")
    const [awaySchoolId, setAwaySchoolId] = useState("")

    function createMatch() {
        if (homeSchoolId === "" || awaySchoolId === "")
            return

        onClose()

        const promise = createMatchMutation.mutateAsync({ date: date.toISOString(), homeSchoolId, awaySchoolId })
            .then(() => router.refresh())

        toast.promise(promise, {
            success: { title: "Added match", description: "This match has been added to the database." },
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
                    <SingleDatepicker
                        name="Date"
                        date={date}
                        onDateChange={setDate}
                    />
                    <Select placeholder="Home School" onChange={ e => setHomeSchoolId(e.target.value) }>
                        { schools.map(school =>
                            <option key={ school.id } value={ school.id }>{ school.name }</option>
                        ) }
                    </Select>
                    <Select placeholder="Away School" onChange={ e => setAwaySchoolId(e.target.value) }>
                        { schools.map(school =>
                            <option key={ school.id } value={ school.id }>{ school.name }</option>
                        ) }
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost">
                        Close
                    </Button>
                    <Button onClick={ createMatch }>
                        Add
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
