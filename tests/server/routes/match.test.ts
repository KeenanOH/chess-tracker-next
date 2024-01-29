import { describe, it, expect } from "vitest"
import { adminUserCaller, unauthenticatedCaller, userCaller } from "../../lib/trpc"
import { deletableMatch, match } from "../../lib/prisma/seed"
import { TRPCError } from "@trpc/server"

describe("match.create tests", () => {

    it("should not let an unauthenticated user create a match", () =>
        expect(unauthenticatedCaller.match.create(match))
            .rejects
            .toThrow(TRPCError)
    )

    it("should not let a user create a match", () =>
        expect(userCaller.match.create(match))
            .rejects
            .toThrow(TRPCError)
    )

    it("should allow an admin to create a match", () =>
        expect(adminUserCaller.match.create(match))
            .resolves
            .toBeDefined()
    )

})

describe("match.update tests", () => {

    it("should not let an unauthenticated user update a match", () =>
        expect(unauthenticatedCaller.match.update(match))
            .rejects
            .toThrow(TRPCError)
    )

    it("should not let a user update a match", () =>
        expect(userCaller.match.update(match))
            .rejects
            .toThrow(TRPCError)
    )

    it("should allow an admin to update a match", () =>
        expect(adminUserCaller.match.update(match))
            .resolves
            .toBeDefined()
    )

})

describe("match.delete tests", () => {

    it("should not let an unauthenticated user delete a match", () =>
        expect(unauthenticatedCaller.match.delete({ id: deletableMatch.id }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should not let a user delete a match", () =>
        expect(userCaller.match.delete({ id: deletableMatch.id }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should allow an admin to delete a match", () =>
        expect(adminUserCaller.match.delete({ id: deletableMatch.id }))
            .resolves
            .toBeDefined()
    )

})

describe("match.getAll tests", () => {

    it("should let anyone get all matches", () =>
        expect(unauthenticatedCaller.match.getAll())
            .resolves
            .toBeDefined()
    )

})

describe("match.get tests", () =>

    it("should let anyone get a specific match", () =>
        expect(unauthenticatedCaller.match.get({ id: match.id }))
            .resolves
            .toBeDefined()
    )

)
