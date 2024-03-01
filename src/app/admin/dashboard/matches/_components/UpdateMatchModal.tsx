import {  Select } from "@chakra-ui/react"
import { SingleDatepicker } from "chakra-dayzed-datepicker"
import { useState } from "react"

import ActionModal from "@/app/_components/modals/ActionModal"
import { ModalProps } from "@/app/types"
import { Match } from "@/lib/trpc/models/match"
import { School } from "@/lib/trpc/models/school"
import { trpc } from "@/lib/trpc/trpc"

export default function UpdateMatchModal({ isOpen, onClose, match, schools }: ModalProps & { match: Match, schools: School[] }) {

    const updateMatchMutation = trpc.updateMatch.useMutation()
    const [homeSchoolId, setHomeSchoolId] = useState(match.homeSchool.id)
    const [awaySchoolId, setAwaySchoolId] = useState(match.awaySchool.id)
    const [date, setDate] = useState<Date>()
    const [published, setPublished] = useState(match.published)

    return (
        <ActionModal
            action={ () => updateMatchMutation.mutateAsync({ id: match.id, homeSchoolId, awaySchoolId, date, published }) }
            isOpen={ isOpen }
            onClose={ onClose }
            header="Update Match"
            buttonText="Update"
            successMessage="Updated Match"
        >
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
        </ActionModal>
    )
}
