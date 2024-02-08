import { Box, Heading, SimpleGrid } from "@chakra-ui/react"

import IoSchoolOutlineIcon from "@/app/_components/icons/IoSchoolOutlineIcon"
import MdOutlineDashboardIcon from "@/app/_components/icons/MdOutlineDashboardIcon"
import StatBox from "@/app/_components/stats/StatBox"

export default function AdminDashboard() {

    return (
        <Box>
            <Heading size="xl" paddingBottom="16px">Dashboard</Heading>
            <SimpleGrid columns={ [1, null, null, 2, null, 4] } gap="12px">
                <StatBox icon={ <IoSchoolOutlineIcon /> } label="Schools" number={ 45 } />
                <StatBox icon={ <IoSchoolOutlineIcon /> } label="Schools" number={ 45 } />
                <StatBox icon={ <IoSchoolOutlineIcon /> } label="Schools" number={ 132 } />
                <StatBox icon={ <MdOutlineDashboardIcon /> } label="Boards" number={ 256 } />
            </SimpleGrid>
        </Box>
    )
}
