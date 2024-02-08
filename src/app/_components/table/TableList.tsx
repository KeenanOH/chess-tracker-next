import { Card, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import React from "react"

export default function TableList({ header, children }: { header: string, children: React.ReactElement<typeof Td>[] }) {
    return (
        <TableContainer as={ Card } padding="16px">
            <Table>
                <Thead>
                    <Tr>
                        <Th>{ header }</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    { children.map(child =>
                        <Tr key={ child.key }>
                            { child }
                        </Tr>
                    ) }
                </Tbody>
            </Table>
        </TableContainer>
    )
}
