import { Link } from "@chakra-ui/next-js"
import { Flex, Text } from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import React from "react"

export default function SidebarItem({ icon, name, path }: { icon: React.ReactNode, name: string, path: string }) {

    const pathName = usePathname()

    return (
        <Link href={ path } _hover={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
            <Flex
                gap="12px"
                width="240px"
                padding="10px"
                color="white"
                borderRadius="6px"
                background={ pathName === path ? "rgba(255, 255, 255, 0.10)" : undefined }
                transitionDuration="300ms"
                cursor="pointer"
                _hover={ { opacity: 0.75 } }
                _active={ { opacity: 0.5 } }
            >
                { icon }
                <Text size="2xl" fontWeight="bold">{ name }</Text>
            </Flex>
        </Link>
    )
}
