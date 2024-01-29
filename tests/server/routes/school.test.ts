import { describe, it, expect } from "vitest"

import { adminUserCaller, unauthenticatedCaller, userCaller } from "../../lib/trpc"
import { TRPCError } from "@trpc/server"
import { deletableSchool, schoolOne } from "../../lib/prisma/seed"


describe("school.create tests", () => {

    it("should not let an unauthenticated user create a school", () =>
        expect(unauthenticatedCaller.school.create({ name: "School Name" }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should not let a non-admin create a school", () =>
        expect(userCaller.school.create({ name: "School Name" }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should let an admin create a school", () =>
        expect(adminUserCaller.school.create({ name: "School Name" }))
            .resolves
            .toBeDefined()
    )

})

describe("school.getAll tests", () => {

    it("should let anyone get all schools", () =>
        expect(unauthenticatedCaller.school.getAll())
            .resolves
            .toBeDefined()
    )

})

describe("school.get tests", () => {

    it("should let anyone get a specific school", () =>
        expect(unauthenticatedCaller.school.get({ id: schoolOne.id }))
            .resolves
            .toBeDefined()
    )

})

describe("school.update tests", () => {

    it("should not allow an unauthenticated user to update a school", () =>
        expect(unauthenticatedCaller.school.update({ id: schoolOne.id, name: schoolOne.name }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should not allow a user to update a school", () =>
        expect(userCaller.school.update({ id: schoolOne.id, name: schoolOne.name }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should allow an admin to update a school", () =>
        expect(adminUserCaller.school.update({ id: schoolOne.id, name: schoolOne.name }))
            .resolves
            .toBeDefined()
    )

})

describe("school.delete tests", () => {

    it("should not allow an unauthenticated user to delete a school", () =>
        expect(unauthenticatedCaller.school.delete({ id: deletableSchool.id }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should not allow a user to delete a school", () =>
        expect(userCaller.school.delete({ id: deletableSchool.id }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should allow an admin to delete a school", () =>
        expect(adminUserCaller.school.delete({ id: deletableSchool.id }))
            .resolves
            .toBeDefined()
    )

})
