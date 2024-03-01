import { Box, Select, Text } from "@chakra-ui/react"
import { useState } from "react"

import ActionModal from "@/app/_components/modals/ActionModal"
import { ModalProps } from "@/app/types"
import { Board } from "@/lib/trpc/models/board"
import { Player } from "@/lib/trpc/models/player"
import { trpc } from "@/lib/trpc/trpc"

type BoardModalProps = {
    board: Board
    homePlayers: Player[]
    awayPlayers: Player[]
}

export default function BoardModal({ isOpen, onClose, board, homePlayers, awayPlayers }: ModalProps & BoardModalProps) {

    const updateBoard = trpc.board.update.useMutation()
    const [homePlayerId, setHomePlayerId] = useState<string>()
    const [awayPlayerId, setAwayPlayerId] = useState<string>()
    const [result, setResult] = useState<string>()

    async function onAction() {
        await updateBoard.mutateAsync({
            id: board.id,
            homePlayerId: homePlayerId === "" ? null : homePlayerId,
            awayPlayerId: awayPlayerId === "" ? null: awayPlayerId,
            result
        })
    }

    return (
        <ActionModal
            action={ () => onAction() }
            isOpen={ isOpen }
            onClose={ onClose }
            header="Update Board"
            buttonText="Update"
            successMessage="Updated board"
        >
            <Box>
                <Text fontWeight="bold">Home Player</Text>
                <Select defaultValue={ board.homePlayer?.id ?? "" } onChange={ e => setHomePlayerId(e.target.value) }>
                    <option value="">N/A</option>
                    { homePlayers.map(player =>
                        <option key={ player.id } value={ player.id }>{ player.firstName } { player.lastName }</option>
                    ) }
                </Select>
            </Box>

            <Box>
                <Text fontWeight="bold">Away Player</Text>
                <Select defaultValue={ board.awayPlayer?.id ?? "" } onChange={ e => setAwayPlayerId(e.target.value) }>
                    <option value="">N/A</option>
                    { awayPlayers.map(player =>
                        <option key={ player.id } value={ player.id }>{ player.firstName } { player.lastName }</option>
                    ) }
                </Select>
            </Box>

            <Box>
                <Text fontWeight="bold">Result</Text>
                <Select defaultValue={ board.result } placeholder="Result" onChange={ e => setResult(e.target.value) }>
                    <option value="home">Home</option>
                    <option value="away">Away</option>
                    <option value="draw">Draw</option>
                </Select>
            </Box>
        </ActionModal>
    )
}
