import { Box, Heading, SimpleGrid } from "@chakra-ui/react"

import BsPersonIcon from "@/app/_components/icons/BsPersonIcon"
import IoSchoolOutlineIcon from "@/app/_components/icons/IoSchoolOutlineIcon"
import IoTrophyOutlineIcon from "@/app/_components/icons/IoTrophyOutlineIcon"
import MdOutlineDashboardIcon from "@/app/_components/icons/MdOutlineDashboardIcon"
import StatBox from "@/app/_components/stats/StatBox"
import { getCaller } from "@/server/caller"

export default async function AdminDashboard() {

    const { caller } = await getCaller()
    const stats = await caller.getTotalStats()

    return (
        <Box>
            <Heading size="xl" paddingBottom="16px">Dashboard</Heading>
            <SimpleGrid columns={ [1, null, null, 2, null, 4] } gap="12px">
                <StatBox icon={ <IoSchoolOutlineIcon /> } label="Schools" number={ stats.schools } />
                <StatBox icon={ <BsPersonIcon /> } label="Players" number={ stats.players } />
                <StatBox icon={ <IoTrophyOutlineIcon /> } label="Matches" number={ stats.matches } />
                <StatBox icon={ <MdOutlineDashboardIcon /> } label="Boards" number={ stats.boards } />
            </SimpleGrid>
        </Box>
    )
}
