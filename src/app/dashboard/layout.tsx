"use client"

import { Box, Flex } from "@chakra-ui/react"
import React from "react"

import Breadcrumbs from "@/app/_components/Breadcrumbs"
import DashboardSidebar from "@/app/dashboard/_components/DashboardSidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <Flex flexDirection={ ["column", null, "row"] }>
            <DashboardSidebar />
            <Box margin={ ["32px", null, "64px"] } width={ [null, null, "100%"] }>
                <Breadcrumbs />
                { children }
            </Box>
        </Flex>
    )
}
