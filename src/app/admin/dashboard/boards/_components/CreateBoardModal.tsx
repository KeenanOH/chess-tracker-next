import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper, Select
} from "@chakra-ui/react"
import { useState } from "react"

import ActionModal from "@/app/_components/modals/ActionModal"
import { ModalProps } from "@/app/types"
import { Match } from "@/lib/trpc/models/match"
import { trpc } from "@/lib/trpc/trpc"

export default function CreateBoardModal({ isOpen, onClose, matches }: ModalProps & { matches: Match[] }) {

    const createBoard = trpc.board.create.useMutation()
    const [number, setNumber] = useState(1)
    const [matchId, setMatchId] = useState("")

    return (
        <ActionModal
            action={ () => createBoard.mutateAsync({ matchId, number })}
            isOpen={ isOpen }
            onClose={ onClose }
            header="Create Board"
            buttonText="Create"
            successMessage="Created board"
        >
            <NumberInput defaultValue={ 1 } min={ 1 } max={ 8 } onChange={ e => setNumber(Number(e)) }>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
            <Select placeholder="Match" onChange={ e => setMatchId(e.target.value) }>
                { matches.map(match =>
                    <option key={ match.id } value={ match.id }>{ match.homeSchool.name } vs. { match.awaySchool.name }</option>
                ) }
            </Select>
        </ActionModal>
    )
}
