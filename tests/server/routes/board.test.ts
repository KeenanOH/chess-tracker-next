import { TRPCError } from "@trpc/server"
import { describe, expect, it } from "vitest"

import { board, deletableBoard, match } from "../../lib/prisma/seed"
import { adminUserCaller, schoolOneUserCaller, unauthenticatedCaller, userCaller } from "../../lib/trpc"

describe("board.create tests", () => {

    it("should not allow an unauthenticated user to create a board", () =>
        expect(unauthenticatedCaller.board.create(board))
            .rejects
            .toThrow(TRPCError)
    )

    it("should not allow a user to create a board", () =>
        expect(userCaller.board.create(board))
            .rejects
            .toThrow(TRPCError)
    )

    it("should allow an admin to create a board", () =>
        expect(adminUserCaller.board.create(board))
            .resolves
            .toBeDefined()
    )

})

describe("board.delete tests", () => {

    it("should not allow an unauthenticated user to delete a board", () =>
        expect(unauthenticatedCaller.board.delete({ id: deletableBoard.id }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should not allow a user to delete a board", () =>
        expect(userCaller.board.delete({ id: deletableBoard.id }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should allow an admin to delete a board", () =>
        expect(adminUserCaller.board.delete({ id: deletableBoard.id }))
            .resolves
            .toBeDefined()
    )

})

describe("board.getAll tests", () => {

    it("should allow anyone to get all boards", () =>
        expect(unauthenticatedCaller.board.getAll({ matchId: match.id }))
            .resolves
            .toBeDefined()
    )

})

describe("board.get tests", () => {

    it("should allow anyone to get boards", () =>
        expect(unauthenticatedCaller.board.get({ id: board.id }))
            .resolves
            .toBeDefined()
    )

})

describe("board.update tests", () => {

    it("should not allow an unauthenticated user to update a board", () =>
        expect(unauthenticatedCaller.board.update(board))
            .rejects
            .toThrow(TRPCError)
    )

    it("should not allow an rogue user to update a board", () =>
        expect(userCaller.board.update(board))
            .rejects
            .toThrow(TRPCError)
    )

    it("should let a user update a board where school id's match", () =>
        expect(schoolOneUserCaller.board.update(board))
            .resolves
            .toBeDefined()
    )

    it("should let an admin update a board", () =>
        expect(adminUserCaller.board.update(board))
            .resolves
            .toBeDefined()
    )

})
