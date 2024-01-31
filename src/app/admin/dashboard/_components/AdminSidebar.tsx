import Sidebar from "@/app/_components/sidebar/Sidebar"
import SidebarHeader from "@/app/_components/sidebar/SidebarHeader"
import BrandText from "@/app/_components/typography/BrandText"
import SidebarBody from "@/app/_components/sidebar/SidebarBody"
import SidebarItem from "@/app/_components/sidebar/SidebarItem"
import MdOutlineSpaceDashboardIcon from "@/app/_components/icons/MdOutlineSpaceDashboardIcon"
import IoSchoolOutlineIcon from "@/app/_components/icons/IoSchoolOutlineIcon"
import BsPersonIcon from "@/app/_components/icons/BsPersonIcon"
import IoTrophyOutlineIcon from "@/app/_components/icons/IoTrophyOutlineIcon"
import MdOutlineDashboardIcon from "@/app/_components/icons/MdOutlineDashboardIcon"
import SidebarFooter from "@/app/_components/sidebar/SidebarFooter"
import CkQuestionOutlineIcon from "@/app/_components/icons/CkQuestionOutlineIcon"
import MdOutlineSettingsIcon from "@/app/_components/icons/MdOutlineSettingsIcon"
import { Divider } from "@chakra-ui/react"
import SidebarUserDisplay from "@/app/_components/sidebar/SidebarUserDisplay"

export default function AdminSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <BrandText />
            </SidebarHeader>
            <SidebarBody>
                <SidebarItem icon={ <MdOutlineSpaceDashboardIcon /> } name="Dashboard" path="/admin/dashboard" />
                <SidebarItem icon={ <IoSchoolOutlineIcon /> } name="Schools" path="/admin/schools" />
                <SidebarItem icon={ <BsPersonIcon /> } name="Players" path="/admin/players" />
                <SidebarItem icon={ <IoTrophyOutlineIcon /> } name="Matches" path="/admin/matches" />
                <SidebarItem icon={ <MdOutlineDashboardIcon /> } name="Boards" path="/admin/boards" />
            </SidebarBody>
            <SidebarFooter>
                <SidebarItem icon={ <CkQuestionOutlineIcon /> } name="Help Center" path="/" />
                <SidebarItem icon={ <MdOutlineSettingsIcon /> } name="Settings" path="/" />
                <Divider marginY="12px" />
                <SidebarUserDisplay name="Keenan Nguyen" email="knguyen5259@stu.d214.org" />
            </SidebarFooter>
        </Sidebar>
    )
}
