import { getServerSession } from "next-auth"
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest"

import { createContext } from "@/server/context"

import { user } from "../lib/prisma/seed/users"

describe("Context Tests", () => {

    beforeAll(() => {
        const mocks = vi.hoisted(() => {
            return {
                getServerSession: vi.fn()
            }
        })

        vi.mock("next-auth", async () => {
            const originalModule = await vi.importActual<typeof import("next-auth")>("next-auth")

            return {
                ...originalModule,
                getServerSession: mocks.getServerSession
            }
        })

        vi.mocked(getServerSession)
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce({
                user: {
                    name: "Username",
                    email: user.email,
                    image: ""
                },
                expires: ""
            })
    })

    it("Should create a context where there is no user session", async () => {
        const context = await createContext()
        expect(context.user).toBeFalsy()
        expect(context.prisma).toBeDefined()
    })

    it("Should create a context where there is a user session", async () => {
        const context = await createContext()
        expect(context.user?.email).toBe(user.email)
        expect(context.prisma).toBeDefined()
    })

    afterAll( () => {
        vi.resetAllMocks()
    })

})
