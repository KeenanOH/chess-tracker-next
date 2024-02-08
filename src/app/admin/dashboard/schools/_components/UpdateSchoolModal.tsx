import { Input } from "@chakra-ui/react"
import { useState } from "react"

import ActionModal from "@/app/_components/modals/ActionModal"
import { ModalProps } from "@/app/types"
import { School } from "@/lib/trpc/models/school"
import { trpc } from "@/lib/trpc/trpc"

export default function UpdateSchoolModal({ isOpen, onClose, school }: ModalProps & { school: School }) {

    const updateSchool = trpc.school.update.useMutation()
    const [name, setName] = useState(school.name)

    return (
        <ActionModal
            action={ () => updateSchool.mutateAsync({ id: school.id, name })}
            isOpen={ isOpen }
            onClose={ onClose }
            header="Update School"
            buttonText="Update"
            successMessage="Updated School"
        >
            <Input defaultValue={ name } placeholder="Name" onChange={ e => setName(e.target.value) }/>
        </ActionModal>
    )
}
