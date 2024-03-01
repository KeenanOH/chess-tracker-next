import { TRPCError } from "@trpc/server"
import { describe, expect, it } from "vitest"

import { adminDeletablePlayer, deletablePlayer, schoolOnePlayer } from "../../lib/prisma/seed/players"
import {
    adminUserCaller,
    schoolOneUserCaller,
    schoolTwoUserCaller,
    unauthenticatedCaller,
    userCaller
} from "../../lib/trpc"

describe("Player tests", () => {

    describe("createPlayer tests", () => {

        it("should not let an unauthenticated caller create a player", () =>
            expect(unauthenticatedCaller.createPlayer(schoolOnePlayer))
                .rejects
                .toThrow(TRPCError)
        )

        it("should not let a rogue caller create a player", () =>
            expect(unauthenticatedCaller.createPlayer(schoolOnePlayer))
                .rejects
                .toThrow(TRPCError)
        )

        it("should let a school caller create a player", () =>
            expect(schoolOneUserCaller.createPlayer(schoolOnePlayer))
                .resolves
                .toBeDefined()
        )

    })

    describe("updatePlayer tests", () => {

        it("should not let an unauthenticated caller update a player", () =>
            expect(unauthenticatedCaller.updatePlayer(schoolOnePlayer))
                .rejects
                .toThrow(TRPCError)
        )

        it("should not let a rogue caller update a player", () =>
            expect(userCaller.updatePlayer(schoolOnePlayer))
                .rejects
                .toThrow(TRPCError)
        )

        it("should not let a school caller player another school's player", () =>
            expect(schoolTwoUserCaller.updatePlayer(schoolOnePlayer))
                .rejects
                .toThrow(TRPCError)
        )

        it("should let a school caller update their own player", () =>
            expect(schoolOneUserCaller.updatePlayer(schoolOnePlayer))
                .resolves
                .not
                .toThrow()
        )

        it("should let an admin caller update a player", () =>
            expect(adminUserCaller.updatePlayer(schoolOnePlayer))
                .resolves
                .not
                .toThrow()
        )

    })

    describe("deletePlayers tests", () => {

        it("should not let an unauthenticated caller delete players", () =>
            expect(unauthenticatedCaller.deletePlayers({ ids: [deletablePlayer.id] }))
                .rejects
                .toThrow(TRPCError)
        )

        it("should not let a rogue caller delete players", () =>
            expect(userCaller.deletePlayers({ ids: [deletablePlayer.id] }))
                .rejects
                .toThrow(TRPCError)
        )

        it("should let a school caller delete their own players", () =>
            expect(schoolOneUserCaller.deletePlayers({ ids: [deletablePlayer.id] }))
                .resolves
                .not
                .toThrow()
        )

        it("should let an admin delete players", () =>
            expect(schoolOneUserCaller.deletePlayers({ ids: [adminDeletablePlayer.id] }))
                .resolves
                .not
                .toThrow()
        )

    })

    describe("getPlayers tests", () => {

        it("should let an unauthenticated caller get players", () =>
            expect(unauthenticatedCaller.getPlayers())
                .resolves
                .toBeDefined()
        )

    })

    describe("getPlayer tests", () => {

        it("should let an unauthenticated caller get a player", () =>
            expect(unauthenticatedCaller.getPlayer({ id: schoolOnePlayer.id }))
                .resolves
                .toBeDefined()
        )

    })

})
