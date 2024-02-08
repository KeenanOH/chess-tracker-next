import ActionModal from "@/app/_components/modals/ActionModal"
import { ModalProps } from "@/app/types"
import { trpc } from "@/lib/trpc/trpc"

export default function DeleteMatchModal({ isOpen, onClose, matchIds }: ModalProps & { matchIds: string[] }) {

    const deleteManyMatches = trpc.match.deleteMany.useMutation()

    return (
        <ActionModal
            action={ () => deleteManyMatches.mutateAsync({ matchIds }) }
            isOpen={ isOpen }
            onClose={ onClose }
            header="Delete Match(es)"
            buttonText="Delete"
            successMessage={ `Deleted ${matchIds.length} match(es)` }
        >
            You are about to delete { matchIds.length } match(es). Press delete to confirm.
        </ActionModal>
    )
}
