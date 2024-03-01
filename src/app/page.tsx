"use client"

import { CheckIcon, LockIcon, StarIcon } from "@chakra-ui/icons"
import { Box, Button, Flex, Heading, MenuItem, MenuList, SimpleGrid, Text, useDisclosure } from "@chakra-ui/react"
import Image from "next/image"

import FeatureCard from "@/app/_components/home/FeatureCard"
import LoginModal from "@/app/_components/modals/LoginModal"
import NavigationBar from "@/app/_components/NavigationBar"

export default function Home() {

    const loginModal = useDisclosure()

    return (
        <>
            <Box>

                <NavigationBar>
                    <MenuList>
                        <MenuItem onClick={ loginModal.onOpen }>Log in</MenuItem>
                    </MenuList>
                    <Flex>
                        <Button colorScheme="blue" onClick={ loginModal.onOpen }>Log in</Button>
                    </Flex>
                </NavigationBar>

                <Flex flexDirection={ ["column", null, "row"] } paddingX={ ["20px", null, "100px"] } paddingY="20px" minHeight="calc(100vh - 100px)">
                    <Flex flexDirection="column" alignItems={ ["center", null, "start"] } justifyContent="center">
                        <Heading size="2xl" textAlign={ ["center", null, "left"] }>
                            MSL <Heading size="2xl" as="span" color="blue.500">Chess</Heading> Tracker.
                        </Heading>

                        <Text fontSize="xl" paddingTop="10px" textAlign={ ["center", null, "left"] }>
                            Track scores, report results, and scout opponents.
                        </Text>

                        <Button colorScheme="blue" size="lg" marginTop={ ["30px", null, "70px"] } >
                            Get Started
                        </Button>
                    </Flex>

                    <Flex marginLeft={ ["none", null, "auto"] } paddingTop={ ["200px", null, "0"]} alignItems="center" justifyContent="center">
                        <Image src="/chess-pieces.svg" alt="Hero Image" width={ 300 } height={ 300 } />
                    </Flex>
                </Flex>

                <Flex flexDirection="column" backgroundColor="blue.100" paddingY="60px" alignItems="center" justifyContent="center" minHeight="100vh">
                    <Heading>Features</Heading>
                    <Box width="70px" height="5px" backgroundColor="blue.500" />

                    <SimpleGrid columns={ [1, null, 3] } row={ [3, null, 1] } spacing="30px" paddingX="60px" paddingY="120px">
                        <FeatureCard
                            icon={ CheckIcon }
                            title="Reliable"
                            description="Created with reliability and performance in-mind."
                        />
                        <FeatureCard
                            icon={ StarIcon }
                            title="Performant"
                            description="Leverages new and upcomming technology."
                        />
                        <FeatureCard
                            icon={ LockIcon }
                            title="Secure"
                            description="Uses reliable authentication providers, such as Google."
                        />
                    </SimpleGrid>
                </Flex>
            </Box>

            <LoginModal isOpen={ loginModal.isOpen } onClose={ loginModal.onClose } />
        </>
    )
}
