import { Avatar, Box, Flex, Text } from "@chakra-ui/react"
import { useSession } from "next-auth/react"

export default function SidebarUserDisplay() {

    const { data } = useSession()

    if (!data)
        return null

    return (
        <Flex alignItems="center" gap="12px">
            <Avatar name={ data.user?.name ?? "" } src={ data.user?.image ?? undefined } size="sm" />
            <Box>
                <Text size="xs" color="white" fontWeight="medium" noOfLines={ 1 } textOverflow="ellipsis">{ data.user?.name }</Text>
                <Text size="xs" color="white" noOfLines={ 1 } textOverflow="ellipsis">{ data.user?.email }</Text>
            </Box>
        </Flex>
    )
}
