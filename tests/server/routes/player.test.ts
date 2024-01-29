import { describe, it, expect } from "vitest"
import {
    adminUserCaller,
    schoolOneUserCaller,
    schoolTwoUserCaller,
    unauthenticatedCaller,
    userCaller
} from "../../lib/trpc"
import { TRPCError } from "@trpc/server"
import { adminDeletablePlayer, deletablePlayer, schoolOne, schoolOnePlayer } from "../../lib/prisma/seed"

describe("player.create tests", () => {

    it("should not let an unauthenticated user create a player", () =>
        expect(unauthenticatedCaller.player.create({ firstName: "First", lastName: "Last" }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should not let a rogue user create a player", () =>
        expect(userCaller.player.create({ firstName: "First", lastName: "Last" }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should let a school user create a player", () =>
        expect(schoolOneUserCaller.player.create({ firstName: "First", lastName: "Last" }))
            .resolves
            .toBeDefined()
    )

})

describe("player.update tests", () => {

    it("should not let an unauthenticated user update a player", () =>
        expect(unauthenticatedCaller.player.update(schoolOnePlayer))
            .rejects
            .toThrow(TRPCError)
    )

    it("should not let a rogue user update a player", () =>
        expect(userCaller.player.update(schoolOnePlayer))
            .rejects
            .toThrow(TRPCError)
    )

    it("should not let another school's user update a player", () =>
        expect(schoolTwoUserCaller.player.update(schoolOnePlayer))
            .rejects
            .toThrow(TRPCError)
    )

    it("should let an admin update a player", () =>
        expect(adminUserCaller.player.update(schoolOnePlayer))
            .resolves
            .toBeDefined()
    )

    it("should let a user update a player where school id's match", () =>
        expect(schoolOneUserCaller.player.update(schoolOnePlayer))
            .resolves
            .toBeDefined()
    )

})

describe("player.get", () => {

    it("should allow anyone to get a player", () =>
        expect(unauthenticatedCaller.player.get({ id: schoolOnePlayer.id }))
            .resolves
            .toBeDefined()
    )

})

describe("player.getAll", () => {

    it("should allow anyone to get a school's players", () =>
        expect(unauthenticatedCaller.player.getAll({ schoolId: schoolOne.id }))
            .resolves
            .toBeDefined()
    )

})

describe("player.delete tests", () => {

    it("should not let an unauthenticated user delete a player", () =>
        expect(unauthenticatedCaller.player.delete({ id: deletablePlayer.id }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should not let an authenticated user delete another school's player", () =>
        expect(userCaller.player.delete({ id: deletablePlayer.id }))
            .rejects
            .toThrow(TRPCError)
    )

    it("should let an admin delete a player", () =>
        expect(adminUserCaller.player.delete({ id: adminDeletablePlayer.id }))
            .resolves
            .toBeDefined()
    )

    it("should let a user delete a player where school id's match", () =>
        expect(schoolOneUserCaller.player.delete({ id: deletablePlayer.id }))
            .resolves
            .toBeDefined()
    )

})
