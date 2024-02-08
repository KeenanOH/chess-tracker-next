import { Box, Divider } from "@chakra-ui/react"
import React from "react"

import SidebarItem from "@/app/_components/sidebar/SidebarItem"

export default function SidebarBody({ children }: { children: React.ReactElement<typeof SidebarItem>[] }) {
    return (
        <Box>
            <Divider marginY="12px"/>
            { children }
        </Box>
    )
}
