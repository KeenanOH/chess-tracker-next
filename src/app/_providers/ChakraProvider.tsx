"use client"

import React from "react"
import { ChakraProvider as CkProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
    fonts: {
        heading: "var(--font-rubik)",
        body: "var(--font-rubik)",
    },
    components: {
        Button: {
            defaultProps: {
                colorScheme: "blue",
            },
        },
    },
})

export default function ChakraProvider({ children }: { children: React.ReactNode }) {

    return (
        <CkProvider theme={ theme }>
            { children }
        </CkProvider>
    )
}
