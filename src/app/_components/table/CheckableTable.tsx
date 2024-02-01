import React from "react"
import {
    Box,
    Card,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Button,
    Checkbox,
    useCheckboxGroup, Menu, MenuButton, MenuList, MenuItem
} from "@chakra-ui/react"
import { ChevronDownIcon } from "@chakra-ui/icons"

type CheckableTypeProps<T> = {
    headers: string[]
    data: T[]
    getRow: (data: T) => React.ReactNode | React.ReactNode[]
    menuActions: { name: string, callback: (data: T[]) => void }[]
}

export default function CheckableTable<T extends { id: string }>({ headers, data, getRow, menuActions }: CheckableTypeProps<T>) {

    const { getCheckboxProps, value, setValue } = useCheckboxGroup()

    return (
        <Box>
            <Flex marginBottom="16px" justifyContent="space-between">
                <Menu>
                    <MenuButton as={ Button } rightIcon={<ChevronDownIcon />} variant="outline">
                        Actions
                    </MenuButton>
                    <MenuList>
                        { menuActions.map(action =>
                            <MenuItem
                                key={ action.name }
                                onClick={ () => action.callback(data.filter(data => value.includes(data.id))) }
                            >
                                { action.name }
                            </MenuItem>
                        ) }
                    </MenuList>
                </Menu>
                {/*<Flex gap="16px">*/}
                {/*    <Button>Search</Button>*/}
                {/*    <Button>Reset</Button>*/}
            </Flex>
            {/*</Flex>*/}
            <TableContainer as={ Card } padding="16px">
                <Table>
                    <Thead>
                        <Tr>
                            <Th width="10px">
                                <Checkbox
                                    isChecked={ value.length === data.length }
                                    onChange={ () => {
                                        if (data.length === value.length)
                                            setValue([])
                                        else
                                            setValue(data.map(data => data.id))
                                    } }
                                />
                            </Th>
                            { headers.map(header =>
                                <Th key={ header }>{ header }</Th>
                            )}
                        </Tr>
                    </Thead>
                    <Tbody>
                        { data.map(data =>
                            <Tr key={ data.id }>
                                <Td>
                                    <Checkbox {...getCheckboxProps({ value: data.id })} />
                                </Td>
                                { getRow(data) }
                            </Tr>
                        ) }
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}
