import { createTRPCReact } from "@trpc/react-query"

import { AppRouter } from "@/server/appRouter"

export const trpc = createTRPCReact<AppRouter>()
