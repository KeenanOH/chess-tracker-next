"use client"


import Sidebar from "@/app/_components/sidebar/Sidebar"
import { Button, useDisclosure } from "@chakra-ui/react"

export default function AdminDashboard() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Sidebar isOpen={ isOpen } onClose={ onClose }/>
            <div>
                <Button onClick={ onOpen }>Open</Button>
            </div>
        </>
    )
}
