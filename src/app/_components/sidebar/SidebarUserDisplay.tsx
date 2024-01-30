import { Avatar, Box, Flex, Text } from "@chakra-ui/react"

export default function SidebarUserDisplay({ imageUrl, name, email }: { imageUrl?: string, name: string, email: string }) {
    return (
        <Flex alignItems="center" gap="12px">
            <Avatar name="name" src={ imageUrl } size="sm" />
            <Box>
                <Text size="xs" color="white" fontWeight="medium" noOfLines={ 1 } textOverflow="ellipsis">{ name }</Text>
                <Text size="xs" color="white" noOfLines={ 1 } textOverflow="ellipsis">{ email }</Text>
            </Box>
        </Flex>
    )
}
