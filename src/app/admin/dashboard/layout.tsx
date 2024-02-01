"use client"

import React from "react"
import { Box, Flex } from "@chakra-ui/react"

import AdminSidebar from "@/app/admin/dashboard/_components/AdminSidebar"
import Breadcrumbs from "@/app/_components/Breadcrumbs"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <Flex flexDirection={ ["column", null, "row"] }>
            <AdminSidebar />
            <Box margin={ ["32px", null, "64px"] } width={ [null, null, "100%"] }>
                <Breadcrumbs />
                { children }
            </Box>
        </Flex>
    )
}
