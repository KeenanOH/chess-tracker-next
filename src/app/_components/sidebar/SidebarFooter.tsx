import React from "react"
import { Box, Divider } from "@chakra-ui/react"

export default function SidebarFooter({ children }: { children: React.ReactNode }) {
    return (
        <Box>
            <Divider marginBottom="12px" />
            { children }
        </Box>
    )
}