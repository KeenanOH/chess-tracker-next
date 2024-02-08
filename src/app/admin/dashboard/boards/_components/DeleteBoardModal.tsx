import ActionModal from "@/app/_components/modals/ActionModal"
import { ModalProps } from "@/app/types"
import { trpc } from "@/lib/trpc/trpc"

export default function DeleteBoardModal({ isOpen, onClose, boardIds }: ModalProps & { boardIds: string[] }) {

    const deleteManyBoards = trpc.board.deleteMany.useMutation()

    return (
        <ActionModal
            action={ () => deleteManyBoards.mutateAsync({ boardIds })}
            isOpen={ isOpen }
            onClose={ onClose }
            header="Delete Board(s)"
            buttonText="Delete"
            successMessage={ `Deleted ${boardIds.length} boards` }
        >
            You are about to delete { boardIds.length } board(s). Press delete to confirm.
        </ActionModal>
    )
}
