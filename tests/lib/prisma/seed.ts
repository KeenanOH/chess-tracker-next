
export const schoolOne = {
    id: "clry10bq0000208jo76ne8m4e",
    name: "School One",
    secretCode: "clry7e6zc000008l1bsma0a7y"
}

export const schoolTwo = {
    id: "clry10m9e000308jo1ph9eclb",
    name: "School Two"
}

export const deletableSchool = {
    id: "clrzc5vlx000109l3665889ac",
    name: "Delete"
}

export const user = {
    id: "clry0uuji000108jocmdfanoz",
    email: "user@email.com"
}

export const schoolOneUser = {
    id: "clry11v7k000408jobm5n0p8d",
    schoolId: schoolOne.id
}

export const schoolTwoUser = {
    id: "clry12fut000508jo5tx94d4i",
    schoolId: schoolTwo.id
}

export const adminUser = {
    id: "clry13crm000608jo1qzyem8h",
    admin: true
}

export const schoolOnePlayer = {
    id: "clry14c4l000708jockw83au0",
    firstName: "First",
    lastName: "One",
    schoolId: schoolOne.id
}

export const schoolTwoPlayer = {
    id: "clry153ea000808jo4j5u3nds",
    firstName: "Two",
    lastName: "Second",
    schoolId: schoolTwo.id
}

export const deletablePlayer = {
    id: "clrzc2ukk000009l326qd2oqp",
    firstName: "Delete",
    lastName: "ME",
    schoolId: schoolOne.id
}

export const adminDeletablePlayer = {
    id: "clrzc8zs0000209l34efa3a38",
    firstName: "Delete",
    lastName: "ME",
    schoolId: schoolOne.id
}

export const match = {
    id: "clry166eh000908jo0t503cka",
    date: new Date(),
    homeSchoolId: schoolOne.id,
    awaySchoolId: schoolTwo.id
}

export const deletableMatch = {
    id: "clrzd7as4000008jo51ng1hcb",
    date: new Date(),
    homeSchoolId: schoolOne.id,
    awaySchoolId: schoolTwo.id
}

export const board = {
    id: "clry174rs000a08jo0xoohaqg",
    matchId: match.id,
    homePlayerId: schoolOnePlayer.id,
    awayPlayerId: schoolTwoPlayer.id,
    number: 7
}

export const deletableBoard = {
    id: "clrze01vg000008jo3ygy3oe3",
    matchId: match.id,
    homePlayerId: schoolOnePlayer.id,
    awayPlayerId: schoolTwoPlayer.id,
    number: 4
}
