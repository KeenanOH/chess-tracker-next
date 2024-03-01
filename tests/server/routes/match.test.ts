import { TRPCError } from "@trpc/server"
import { describe, expect, it } from "vitest"

import { deletableMatch, match } from "../../lib/prisma/seed/matches"
import { schoolOne } from "../../lib/prisma/seed/schools"
import { adminUserCaller, unauthenticatedCaller, userCaller } from "../../lib/trpc"

describe("Match tests", () => {

    describe("createMatch tests", () => {

        it("should not let an unauthenticated caller create a match", () =>
            expect(unauthenticatedCaller.createMatch(match))
                .rejects
                .toThrow(TRPCError)
        )

        it("should not let an authenticated caller create a match", () =>
            expect(userCaller.createMatch(match))
                .rejects
                .toThrow(TRPCError)
        )

        it("should allow an admin caller to create a match", () =>
            expect(adminUserCaller.createMatch(match))
                .resolves
                .toBeDefined()
        )

    })

    describe("updateMatch tests", () => {

        it("should not let an unauthenticated caller update a match", () =>
            expect(unauthenticatedCaller.updateMatch(match))
                .rejects
                .toThrow(TRPCError)
        )

        it("should not let an authenticated caller update a match", () =>
            expect(userCaller.updateMatch(match))
                .rejects
                .toThrow(TRPCError)
        )

        it("should allow an admin caller to update a match", () =>
            expect(adminUserCaller.updateMatch(match))
                .resolves
                .not
                .toThrow()
        )

    })

    describe("deleteMatches tests", () => {

        it("should not let an unauthenticated caller delete matches", () =>
            expect(unauthenticatedCaller.deleteMatches({ ids: [deletableMatch.id] }))
                .rejects
                .toThrow(TRPCError)
        )

        it("should not let a user caller delete matches", () =>
            expect(unauthenticatedCaller.deleteMatches({ ids: [deletableMatch.id] }))
                .rejects
                .toThrow(TRPCError)
        )

        it("should allow an admin caller delete matches", () =>
            expect(adminUserCaller.deleteMatches({ ids: [deletableMatch.id] }))
                .resolves
                .not
                .toThrow(TRPCError)
        )

    })

    describe("getMatches tests", () => {

        it("should allow an unauthenticated caller to get matches", () =>
            expect(unauthenticatedCaller.getMatches())
                .resolves
                .toBeDefined()
        )

        it("should allow an unauthenticated caller to get matches with specified school id", () =>
            expect(unauthenticatedCaller.getMatches({ schoolId: schoolOne.id }))
                .resolves
                .toBeDefined()
        )

    })

    describe("getMatchesByDate tests", () => {

        it("should allow an unauthenticated caller to get matches by date", () =>
            expect(unauthenticatedCaller.getMatchesByDate())
                .resolves
                .toBeDefined()
        )

    })

})
