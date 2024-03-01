import ActionModal from "@/app/_components/modals/ActionModal"
import { ModalProps } from "@/app/types"
import { trpc } from "@/lib/trpc/trpc"

export default function DeleteSchoolModal({ isOpen, onClose, schoolIds }: ModalProps & { schoolIds: string[] }) {

    const deleteSchool = trpc.deleteSchools.useMutation()

    return (
        <ActionModal
            action={ () => deleteSchool.mutateAsync({ schoolIds })}
            isOpen={ isOpen }
            onClose={ onClose }
            header="Delete School(s)"
            buttonText="Delete"
            successMessage={ `Deleted ${schoolIds.length} school(s)`}
        >
            You are about to delete { schoolIds.length } school(s). Press delete to confirm.
        </ActionModal>
    )
}
