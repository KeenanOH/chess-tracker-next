import { Board } from "@/lib/trpc/models/board"

export default function BoardSummary({ board }: { board: Board }) {
    return (
        <div className="bg-primary bg-opacity-50 py-8 w-full border-2 border-primary rounded-xl text-center hover:cursor-pointer cursor-default hover:opacity-75 active:opacity-50">
            <p className="font-black text-3xl">{ board.number }</p>
            <div className="py-4">
                <p>{ `${board.homePlayer?.firstName} ${board.homePlayer?.lastName}` }</p>
                <p>vs.</p>
                <p>{ `${board.awayPlayer?.firstName} ${board.awayPlayer?.lastName}` }</p>
            </div>
            <p className="font-bold">{ board.result }</p>
        </div>
    )
}
