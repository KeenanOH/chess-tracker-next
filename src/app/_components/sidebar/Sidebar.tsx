import BrandText from "@/app/_components/typography/BrandText"
import React from "react"
import {
    Box,
    Divider,
    Drawer, DrawerBody,
    DrawerCloseButton,
    DrawerContent, DrawerFooter,
    DrawerHeader,
    Show
} from "@chakra-ui/react"
import SidebarItem from "@/app/_components/sidebar/SidebarItem"
import MdOutlineSpaceDashboardIcon from "@/app/_components/icons/MdOutlineSpaceDashboardIcon"
import IoSchoolOutlineIcon from "@/app/_components/icons/IoSchoolOutlineIcon"
import BsPersonIcon from "@/app/_components/icons/BsPersonIcon"
import IoTrophyOutlineIcon from "@/app/_components/icons/IoTrophyOutlineIcon"
import MdOutlineDashboardIcon from "@/app/_components/icons/MdOutlineDashboardIcon"
import SidebarUserDisplay from "@/app/_components/sidebar/SidebarUserDisplay"
import MdOutlineSettingsIcon from "@/app/_components/icons/MdOutlineSettingsIcon"
import CkQuestionOutlineIcon from "@/app/_components/icons/CkQuestionOutlineIcon"

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    return (
        <Drawer
            isOpen={ isOpen }
            placement='left'
            onClose={ onClose }
        >
            <DrawerContent backgroundColor="#107ECD" userSelect="none">
                <DrawerHeader>
                    <Show below="md">
                        <DrawerCloseButton color="white" />
                    </Show>
                    <BrandText />
                </DrawerHeader>

                <DrawerBody>
                    <Divider marginBottom="12px"/>

                    <SidebarItem icon={ <MdOutlineSpaceDashboardIcon /> } name="Dashboard" path="/" active={ true } />
                    <SidebarItem icon={ <IoSchoolOutlineIcon /> } name="Schools" path="/" active={ false } />
                    <SidebarItem icon={ <BsPersonIcon /> } name="Players" path="/" active={ false } />
                    <SidebarItem icon={ <IoTrophyOutlineIcon /> } name="Matches" path="/" active={ false } />
                    <SidebarItem icon={ <MdOutlineDashboardIcon /> } name="Boards" path="/" active={ false } />
                </DrawerBody>

                <DrawerFooter justifyContent="start">
                    <Box>
                        <Divider marginBottom="12px" />
                        <SidebarItem icon={ <CkQuestionOutlineIcon /> } name="Help Center" path="/" active={ false } />
                        <SidebarItem icon={ <MdOutlineSettingsIcon /> } name="Settings" path="/" active={ false } />
                        <Divider marginY="12px" />
                        <SidebarUserDisplay name="Keenan Nguyen" email="knguyen5259@stu.d214.org" />
                    </Box>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
