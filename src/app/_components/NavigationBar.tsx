import { Link } from "@chakra-ui/next-js"
import { ComponentWithAs, Flex, FlexProps, Heading, MenuListProps } from "@chakra-ui/react"
import React from "react"

import NavigationBarActions from "../NavigationBarActions"


export type NavigationBarChildren = [
    React.ReactElement<ComponentWithAs<"div", MenuListProps>>,
    React.ReactElement<ComponentWithAs<"div", FlexProps>>
]

export default function NavigationBar({ children }: { children?: NavigationBarChildren }) {
    return (
        <Flex height="100px" alignItems="center" marginX="50px">
            <Link
                href="/"
                _hover={ {
                    textDecoration: "none",
                    transform: "scale(1.05, 1.05)",
                    transitionDuration: "300ms"
                } }
                _active={ {
                    transform: "scale(1.10, 1.10)"
                } }
            >
                <Heading size="lg">
                    MSL <Heading size="lg" as="span" color="blue.500">Chess</Heading> Tracker
                </Heading>
            </Link>

            { children ? <NavigationBarActions>{ children }</NavigationBarActions> : null }
        </Flex>
    )
}
