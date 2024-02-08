import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import React from "react"

export default function Breadcrumbs() {

    const pathName = usePathname()
    const split = pathName.split("/")
    const pathSplit = ["Home", ...split.slice(1, split.length)]

    return (
        <Breadcrumb>
            { pathSplit.map((path, index) =>
                <BreadcrumbItem key={ path } isCurrentPage={ index === pathSplit.length }>
                    <BreadcrumbLink href={ `/${pathSplit.slice(1, index + 1).join("/")}` } textTransform="capitalize">
                        { path }
                    </BreadcrumbLink>
                </BreadcrumbItem>
            ) }
        </Breadcrumb>
    )
}
