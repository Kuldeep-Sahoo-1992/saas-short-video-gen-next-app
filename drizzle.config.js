import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_Udt6P3GCcnaH@ep-tiny-darkness-a56p7oop-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
});
