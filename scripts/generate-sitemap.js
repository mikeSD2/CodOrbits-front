#!/usr/bin/env node

/**
 * This script can be used to manually generate the sitemap after a build
 * It's useful for debugging or if you need to regenerate the sitemap without rebuilding
 */

const { execSync } = require("child_process");

console.log("Generating sitemap...");

try {
    // Run the next-sitemap command
    execSync("npx next-sitemap", { stdio: "inherit" });
    console.log("Sitemap generated successfully!");
    console.log("You can find the sitemap files in the /public directory");
} catch (error) {
    console.error("Error generating sitemap:", error);
    process.exit(1);
}
