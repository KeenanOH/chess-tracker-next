import { Box, Flex } from "@chakra-ui/react"
import { redirect } from "next/navigation"
import React from "react"

import Breadcrumbs from "@/app/_components/Breadcrumbs"
import DashboardSidebar from "@/app/dashboard/_components/DashboardSidebar"
import { getUser } from "@/server/caller"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {

    const user = await getUser()

    if (!user)
        redirect("/api/auth/signin?callbackUrl=%2Fdashboard")

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
