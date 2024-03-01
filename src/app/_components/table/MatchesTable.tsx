import { Td } from "@chakra-ui/react"
import Link from "next/link"

import TableList from "@/app/_components/table/TableList"
import { Match } from "@/lib/trpc/models/match"

export default function MatchesTable({ matches }: { matches: Match[] }) {

    return (
        <TableList header="Matches">
            { matches.map(match =>
                <Td
                    key={ match.id }
                    className="select-none hover:opacity-75 hover:cursor-pointer active:opacity-50"
                >
                    <Link href={ `/dashboard/matches/${match.id}` }>
                        { match.homeSchool.name } vs. { match.awaySchool.name }
                    </Link>
                </Td>
            )}
        </TableList>
    )
}
