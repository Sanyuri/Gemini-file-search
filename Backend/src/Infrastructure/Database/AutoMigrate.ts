import { execSync } from "child_process";

export function autoMigrate() {
    try {
        console.log("Starting database migration...");
        execSync('npx prisma migrate deploy', {
            stdio: 'inherit',
        });
        console.log("Database migration completed.");
    } catch (error) {
        console.error("Error during database migration:", error);
        process.exit(1);
    }
}