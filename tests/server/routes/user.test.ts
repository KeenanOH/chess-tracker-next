import { TRPCError } from "@trpc/server"
import { describe, expect, it } from "vitest"

import { schoolOne } from "../../lib/prisma/seed/schools"
import { unauthenticatedCaller, userCaller } from "../../lib/trpc"


describe("User Tests", () => {

    it("should not let an unauthenticated user update", () =>
        expect(unauthenticatedCaller.updateUser({ secretCode: schoolOne.secretCode }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should let a user update their school", () =>
        expect(userCaller.updateUser({ secretCode: schoolOne.secretCode }))
            .resolves
            .not
            .toThrow()
    )

    it("should not let a user use an school code", () =>
        expect(userCaller.updateUser({ secretCode: "not a valid code" }))
            .rejects
            .toThrow(TRPCError)
    )

})
