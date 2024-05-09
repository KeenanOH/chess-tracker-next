import "./globals.css"

import { Metadata, Viewport } from "next"
import { Rubik } from "next/font/google"
import React from "react"

import ChakraProvider from "@/app/_providers/ChakraProvider"
import NextAuthProvider from "@/app/_providers/NextAuthProvider"
import TRPCProvider from "@/app/_providers/TRPCProvider"

const rubik = Rubik({
    subsets: ["latin"],
    variable: "--font-rubik",
})

const APP_NAME = "Chess Tracker"
const APP_DEFAULT_TITLE = "Chess Tracker"
const APP_TITLE_TEMPLATE = "Chess Tracker"
const APP_DESCRIPTION = "An app to track chess matches."

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: APP_DEFAULT_TITLE,
        // startUpImage: [],
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: "website",
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: "summary",
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
}

export const viewport: Viewport = {
    themeColor: "#F3F6FC",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={ rubik.className + " bg-[#F3F6FC]" }>
                <main>
                    <TRPCProvider>
                        <NextAuthProvider>
                            <ChakraProvider>
                                { children }
                            </ChakraProvider>
                        </NextAuthProvider>
                    </TRPCProvider>
                </main>
            </body>
        </html>
    )
}
