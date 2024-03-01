import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react"

import BsPersonIcon from "@/app/_components/icons/BsPersonIcon"
import IoTrophyOutlineIcon from "@/app/_components/icons/IoTrophyOutlineIcon"
import MdOutlineDashboardIcon from "@/app/_components/icons/MdOutlineDashboardIcon"
import StatBox from "@/app/_components/stats/StatBox"
import { getCaller } from "@/server/caller"

export default async function Dashboard() {

    const { caller, user } = await getCaller()
    const stats = user?.schoolId && await caller.getSchoolStats({ schoolId: user.schoolId })

    return (
        <Box>
            <Heading size="xl" paddingBottom="16px">Dashboard</Heading>
            { stats &&
                <SimpleGrid columns={ [1, null, null, 2, null, 4] } gap="12px">
                    <StatBox icon={ <BsPersonIcon /> } label="Players" number={ stats.players } />
                    <StatBox icon={ <IoTrophyOutlineIcon /> } label="Matches" number={ stats.matches } />
                    <StatBox icon={ <MdOutlineDashboardIcon /> } label="Boards" number={ stats.boards } />
                </SimpleGrid>
            }
            { !stats &&
                <Text>Please enter your school&apos;s access code in settings to start using the dashboard.</Text>
            }
        </Box>
    )
}
