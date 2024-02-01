
export type School = { id: string, name: string }
export type Player = { id: string, firstName: string, lastName: string, school: School }
export type Match = { id: string, date: Date, homeSchool: School, awaySchool: School, published: boolean }