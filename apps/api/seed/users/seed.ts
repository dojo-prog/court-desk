import bcrypt from "bcryptjs";
import { PoolClient } from "pg";
import { mockUsers } from "./data";
import { buildInsertQueryParts } from "../../src/utils/query-builder/buildInsertQueryParts";
import { truncateTable } from "../utils/truncate-table";

export const seedUsers = async (client: PoolClient) => {
  try {
    console.log("Starting users seed...");

    await truncateTable("users", client);

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash("testPass", salt);

    console.log("Inserting rows...");
    for (const u of mockUsers) {
      const { columnsStr, placeholdersStr, values } = buildInsertQueryParts({
        ...u,
        password_hash,
      });

      await client.query(
        `
        INSERT INTO users (${columnsStr})
        VALUES (${placeholdersStr})
        `,
        values,
      );

      console.log(`Inserted user: ${u.first_name} ${u.last_name}`);
    }

    console.log(`\nUser seed successful! Inserted ${mockUsers.length} rows.\n`);
  } catch (error) {
    console.error("Error seeding users");
    throw error;
  }
};
