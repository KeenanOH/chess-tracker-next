import { Box, Divider } from "@chakra-ui/react"
import React from "react"

export default function SidebarFooter({ children }: { children: React.ReactNode }) {
    return (
        <Box>
            <Divider marginBottom="12px" />
            { children }
        </Box>
    )
}