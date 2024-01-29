import { describe, it, expect } from "vitest"

import { unauthenticatedCaller, userCaller } from "../../lib/trpc"
import { schoolOne } from "../../lib/prisma/seed"
import { TRPCError } from "@trpc/server"


describe("User Tests", () => {

    it("should not let an unauthenticated user update", () =>
        expect(unauthenticatedCaller.user.update({ schoolCode: schoolOne.secretCode }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should let a user update their school", () =>
        expect(userCaller.user.update({ schoolCode: schoolOne.secretCode }))
            .resolves
            .toBeDefined()
    )

    it("should not let a user use an school code", () =>
        expect(userCaller.user.update({ schoolCode: "not a valid code" }))
            .rejects
            .toThrow(TRPCError)
    )

})
