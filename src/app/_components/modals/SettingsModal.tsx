import { Box, Input, Text } from "@chakra-ui/react"
import { useState } from "react"

import ActionModal from "@/app/_components/modals/ActionModal"
import { ModalProps } from "@/app/types"
import { trpc } from "@/lib/trpc/trpc"

export default function SettingsModal({ isOpen, onClose }: ModalProps) {

    const updateUser = trpc.user.update.useMutation()
    const [secretCode, setSecretCode] = useState("")

    return (
        <ActionModal
            action={ () => updateUser.mutateAsync({ secretCode }) }
            isOpen={ isOpen }
            onClose={ onClose }
            header="Settings"
            buttonText="Update"
            successMessage="Updated settings"
        >
            <Box>
                <Text fontWeight="bold">School Code</Text>
                <Input placeholder="School Code" onChange={ e => setSecretCode(e.target.value) }/>
            </Box>
        </ActionModal>
    )
}
