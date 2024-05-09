import { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Chess Tracker",
        short_name: "Chess Tracker",
        description: "An app to track chess matches.",
        start_url: "/",
        display: "fullscreen",
        background_color: "#F3F6FC",
        theme_color: "#F3F6FC"
    }
}
