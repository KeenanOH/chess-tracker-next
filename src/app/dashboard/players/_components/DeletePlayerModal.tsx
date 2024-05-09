import ActionModal from "@/app/_components/modals/ActionModal"
import { ModalProps } from "@/app/types"
import { trpc } from "@/lib/trpc/trpc"

export default function DeletePlayerModal({ isOpen, onClose, playerIds }: ModalProps & { playerIds: string[] }) {

    const deleteManyPlayers = trpc.deletePlayers.useMutation()

    return (
        <ActionModal
            action={ () => deleteManyPlayers.mutateAsync({ ids: playerIds })}
            isOpen={ isOpen }
            onClose={ onClose }
            header="Delete Player(s)"
            buttonText="Delete"
            successMessage={ `Deleted ${playerIds.length} player(s)` }
        >
            You are about to delete { playerIds.length } player(s). Press delete to confirm.
        </ActionModal>
    )
}

