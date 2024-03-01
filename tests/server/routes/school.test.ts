import { TRPCError } from "@trpc/server"
import { describe, expect, it } from "vitest"

import { deletableSchool, schoolOne } from "../../lib/prisma/seed/schools"
import { adminUserCaller, unauthenticatedCaller, userCaller } from "../../lib/trpc"

describe("School tests", () => {

    describe("createSchool tests", () => {

        it("should not let an unauthenticated caller create a school", () =>
            expect(unauthenticatedCaller.createSchool(schoolOne))
                .rejects
                .toThrow(TRPCError)
        )

        it("should not let an authenticated caller create a school", () =>
            expect(userCaller.createSchool(schoolOne))
                .rejects
                .toThrow(TRPCError)
        )

        it("should let an admin caller to create a school", () =>
            expect(adminUserCaller.createSchool(schoolOne))
        )

    })

    describe("updateSchool tests", () => {

        it("should not let an unauthenticated caller update a school", () =>
            expect(unauthenticatedCaller.updateSchool(schoolOne))
                .rejects
                .toThrow(TRPCError)
        )

        it("should not let an authenticated caller update a school", () =>
            expect(userCaller.updateSchool(schoolOne))
                .rejects
                .toThrow(TRPCError)
        )

        it("should let an admin caller to update a school", () =>
            expect(adminUserCaller.updateSchool(schoolOne))
        )

    })

    describe("deleteSchools tests", () => {

        it("should not let an unauthenticated caller delete schools", () =>
            expect(unauthenticatedCaller.deleteSchools({ ids: [deletableSchool.id] }))
                .rejects
                .toThrow(TRPCError)
        )

        it("should not let an authenticated caller delete schools", () =>
            expect(userCaller.deleteSchools({ ids: [deletableSchool.id] }))
                .rejects
                .toThrow(TRPCError)
        )

        it("should let an admin caller delete schools", () =>
            expect(adminUserCaller.deleteSchools({ ids: [deletableSchool.id] }))
                .resolves
                .not
                .toThrow()
        )

    })

    describe("getSchools tests", () => {

        it("should let an unauthenticated caller get schools", () =>
            expect(unauthenticatedCaller.getSchools())
                .resolves
                .toBeDefined()
        )

    })

    describe("getSchool tests", () => {

        it("should let an unauthenticated caller get a school", () =>
            expect(unauthenticatedCaller.getSchool({ id: schoolOne.id }))
                .resolves
                .toBeDefined()
        )

    })

})
