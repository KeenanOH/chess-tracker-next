import { prisma } from "./lib/prisma/client"
import {
    adminDeletablePlayer,
    adminUser, board, deletableBoard, deletableMatch, deletablePlayer, deletableSchool, match,
    schoolOne,
    schoolOnePlayer,
    schoolOneUser,
    schoolTwo,
    schoolTwoPlayer,
    schoolTwoUser,
    user
} from "./lib/prisma/seed"

await prisma.school.upsert({
    update: schoolOne,
    create: schoolOne,
    where: {
        id: schoolOne.id
    }
})

await prisma.school.upsert({
    update: schoolTwo,
    create: schoolTwo,
    where: {
        id: schoolTwo.id
    }
})

await prisma.school.upsert({
    update: deletableSchool,
    create: deletableSchool,
    where: {
        id: deletableSchool.id
    }
})

await prisma.user.upsert({
    update: user,
    create: user,
    where: {
        id: user.id
    }
})

await prisma.user.upsert({
    update: schoolOneUser,
    create: schoolOneUser,
    where: {
        id: schoolOneUser.id
    }
})

await prisma.user.upsert({
    update: schoolTwoUser,
    create: schoolTwoUser,
    where: {
        id: schoolTwoUser.id
    }
})

await prisma.user.upsert({
    update: adminUser,
    create: adminUser,
    where: {
        id: adminUser.id
    }
})

await prisma.player.upsert({
    update: schoolOnePlayer,
    create: schoolOnePlayer,
    where: {
        id: schoolOnePlayer.id
    }
})

await prisma.player.upsert({
    update: schoolTwoPlayer,
    create: schoolTwoPlayer,
    where: {
        id: schoolTwoPlayer.id
    }
})

await prisma.player.upsert({
    update: deletablePlayer,
    create: deletablePlayer,
    where: {
        id: deletablePlayer.id
    }
})

await prisma.player.upsert({
    update: adminDeletablePlayer,
    create: adminDeletablePlayer,
    where: {
        id: adminDeletablePlayer.id
    }
})

await prisma.match.upsert({
    update: match,
    create: match,
    where: {
        id: match.id
    }
})

await prisma.match.upsert({
    update: deletableMatch,
    create: deletableMatch,
    where: {
        id: deletableMatch.id
    }
})

await prisma.board.upsert({
    update: board,
    create: board,
    where: {
        id: board.id
    }
})

await prisma.board.upsert({
    update: deletableBoard,
    create: deletableBoard,
    where: {
        id: deletableBoard.id
    }
})

