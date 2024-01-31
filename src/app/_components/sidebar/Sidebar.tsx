import React from "react"
import { Box, CloseButton, Flex, Hide, IconButton, Show, Slide, useDisclosure } from "@chakra-ui/react"

import SidebarBody from "@/app/_components/sidebar/SidebarBody"
import SidebarFooter from "@/app/_components/sidebar/SidebarFooter"
import SidebarHeader from "@/app/_components/sidebar/SidebarHeader"
import { HamburgerIcon } from "@chakra-ui/icons"

type SidebarChildren = [React.ReactElement<typeof SidebarHeader>, React.ReactElement<typeof SidebarBody>, React.ReactElement<typeof SidebarFooter>]

function SidebarContent({ children, onClose }: { children: SidebarChildren, onClose?: () => void }) {
    return (
        <Flex
            backgroundColor="#107ECD"
            flexDirection="column"
            justifyContent="space-between"
            userSelect="none"
            width="320px"
            height="100vh"
            padding="32px"
            position="sticky"
            top="0"
        >
            <Box>
                <Flex
                    justifyContent="space-between"
                >
                    { children[0] }
                    <Show below="md">
                        <CloseButton color="white" onClick={ onClose }/>
                    </Show>
                </Flex>
                { children[1] }
            </Box>
            { children[2] }
        </Flex>
    )
}

export default function Sidebar({ children }: { children: SidebarChildren }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Show below="md">
                <IconButton
                    aria-label="Open sidebar button"
                    icon={ <HamburgerIcon /> }
                    onClick={ onOpen }
                    marginStart="16px"
                    marginTop="16px"
                    width="32px"
                />
                <Slide in={ isOpen } direction="left">
                    <SidebarContent onClose={ onClose }>
                        { children }
                    </SidebarContent>
                </Slide>
            </Show>

            <Hide below="md">
                <SidebarContent>
                    { children }
                </SidebarContent>
            </Hide>
        </>
    )
}
