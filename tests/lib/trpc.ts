import { createCaller } from "@/server/caller"

import { prisma } from "./prisma/client"
import { adminUser, schoolOneUser, schoolTwoUser, user } from "./prisma/seed"

export const unauthenticatedCaller = createCaller({
    prisma,
    user: null
})

export const userCaller = createCaller({
    prisma,
    user: {
        id: user.id,
        name: null,
        email: null,
        emailVerified: null,
        image: null,
        schoolId: null,
        admin: false
    }
})

export const schoolOneUserCaller = createCaller({
    prisma,
    user: {
        id: schoolOneUser.id,
        name: null,
        email: null,
        emailVerified: null,
        image: null,
        schoolId: schoolOneUser.schoolId,
        admin: false
    }
})

export const schoolTwoUserCaller = createCaller({
    prisma,
    user: {
        id: schoolTwoUser.id,
        name: null,
        email: null,
        emailVerified: null,
        image: null,
        schoolId: schoolTwoUser.schoolId,
        admin: false
    }
})

export const adminUserCaller = createCaller({
    prisma,
    user: {
        id: adminUser.id,
        name: null,
        email: null,
        emailVerified: null,
        image: null,
        schoolId: null,
        admin: true
    }
})
