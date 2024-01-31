import React from "react"
import SidebarItem from "@/app/_components/sidebar/SidebarItem"
import { Box, Divider } from "@chakra-ui/react"

export default function SidebarBody({ children }: { children: React.ReactElement<typeof SidebarItem>[] }) {
    return (
        <Box>
            <Divider marginY="12px"/>
            { children }
        </Box>
    )
}
