import React from "react"
import { Stat, StatLabel, StatNumber } from "@chakra-ui/stat"
import { Card, CardBody, Circle, Flex } from "@chakra-ui/react"

export default function StatBox({ icon, label, number, align }: { icon: React.ReactNode, label: string, number: string | number, align?: string }) {
    return (
        <Card padding="16px" align={ align }>
            <CardBody as={ Flex } alignItems="center">
                <Circle size="60px" backgroundColor="grey">
                    { icon }
                </Circle>
                <Stat marginStart="32px">
                    <StatLabel>{ label }</StatLabel>
                    <StatNumber>{ number }</StatNumber>
                </Stat>
            </CardBody>
        </Card>
    )
}
