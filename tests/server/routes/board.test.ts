import { TRPCError } from "@trpc/server"
import { describe, expect, it } from "vitest"

import { board } from "../../lib/prisma/seed/boards"
import { match } from "../../lib/prisma/seed/matches"
import { adminUserCaller, schoolOneUserCaller, unauthenticatedCaller, userCaller } from "../../lib/trpc"

describe("Board tests", () => {

    describe("updateBoard tests", () => {

        it("should not let an unauthenticated caller update a board", () =>
            expect(unauthenticatedCaller.updateBoard(board))
                .rejects
                .toThrow(TRPCError)
        )

        it("should not let an authenticated caller update a board when the school id's do not match", () =>
            expect(userCaller.updateBoard(board))
                .rejects
                .toThrow(TRPCError)
        )

        it("should let an authenticated caller update a board when the school id's match", () =>
            expect(schoolOneUserCaller.updateBoard(board))
                .resolves
                .not
                .toThrow()
        )

        it("should throw an error when updating a board that does not exist", () =>
            expect(schoolOneUserCaller.updateBoard({ id: "does not exist" }))
                .rejects
                .toThrow(TRPCError)
        )

        it("should let an admin caller update a board", () =>
            expect(adminUserCaller.updateBoard(board))
                .resolves
                .not
                .toThrow()
        )

    })

    describe("getBoards tests", () => {

        it("should let an unauthenticated caller get boards", () =>
            expect(unauthenticatedCaller.getBoards({ matchId: match.id }))
        )

    })

})
