import { Box, Heading } from "@chakra-ui/react"

import SchoolsTable from "@/app/admin/dashboard/schools/_components/SchoolsTable"
import { getCaller } from "@/server/caller"

export default async function AdminDashboardSchools() {

    const { caller } = await getCaller()
    const schools = await caller.getSchools()

    return (
        <Box>
            <Heading size="xl" paddingBottom="16px">Schools</Heading>
            <SchoolsTable schools={ schools } />
        </Box>
    )
}
