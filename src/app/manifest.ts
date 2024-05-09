import { MetadataRoute } from "next"

const manifest: MetadataRoute.Manifest = {
    name: "Chess Tracker",
    short_name: "Chess Tracker",
    description: "An app to track chess matches.",
    start_url: "/",
    display: "fullscreen",
    background_color: "#F3F6FC",
    theme_color: "#F3F6FC"
}

export default manifest
