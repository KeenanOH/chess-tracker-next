"use client"

import { Divider, useDisclosure } from "@chakra-ui/react"

import BsPersonIcon from "@/app/_components/icons/BsPersonIcon"
import CkQuestionOutlineIcon from "@/app/_components/icons/CkQuestionOutlineIcon"
import IoTrophyOutlineIcon from "@/app/_components/icons/IoTrophyOutlineIcon"
import MdOutlineSettingsIcon from "@/app/_components/icons/MdOutlineSettingsIcon"
import MdOutlineSpaceDashboardIcon from "@/app/_components/icons/MdOutlineSpaceDashboardIcon"
import SettingsModal from "@/app/_components/modals/SettingsModal"
import Sidebar from "@/app/_components/sidebar/Sidebar"
import SidebarBody from "@/app/_components/sidebar/SidebarBody"
import SidebarFooter from "@/app/_components/sidebar/SidebarFooter"
import SidebarHeader from "@/app/_components/sidebar/SidebarHeader"
import SidebarItem from "@/app/_components/sidebar/SidebarItem"
import SidebarUserDisplay from "@/app/_components/sidebar/SidebarUserDisplay"
import BrandText from "@/app/_components/typography/BrandText"

export default function DashboardSidebar() {

    const settingsModal = useDisclosure()

    return (
        <>
            <Sidebar>
                <SidebarHeader>
                    <BrandText />
                </SidebarHeader>
                <SidebarBody>
                    <SidebarItem icon={ <MdOutlineSpaceDashboardIcon /> } name="Dashboard" path="/dashboard" />
                    <SidebarItem icon={ <BsPersonIcon /> } name="Players" path="/dashboard/players" />
                    <SidebarItem icon={ <IoTrophyOutlineIcon /> } name="Matches" path="/dashboard/matches" />
                </SidebarBody>
                <SidebarFooter>
                    <SidebarItem icon={ <CkQuestionOutlineIcon /> } name="Help Center" path="/" />
                    <SidebarItem icon={ <MdOutlineSettingsIcon /> } name="Settings" onClick={ settingsModal.onOpen }/>
                    <Divider marginY="12px" />
                    <SidebarUserDisplay />
                </SidebarFooter>
            </Sidebar>

            <SettingsModal isOpen={ settingsModal.isOpen } onClose={ settingsModal.onClose } />
        </>
    )
}
