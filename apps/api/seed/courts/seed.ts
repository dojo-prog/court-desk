import { PoolClient } from "pg";
import { mockCourts } from "./data";
import { buildInsertQueryParts } from "../../src/utils/query-builder/buildInsertQueryParts";
import { truncateTable } from "../utils/truncate-table";

export const seedCourts = async (client: PoolClient) => {
  try {
    console.log("Starting courts seed...");

    await truncateTable("courts", client);

    console.log("Inserting rows...");
    for (const c of mockCourts) {
      const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(c);

      await client.query(
        `
        INSERT INTO courts (${columnsStr})
        VALUES (${placeholdersStr})
        `,
        values,
      );

      console.log(`Inserted court: ${c.name}`);
    }

    console.log(
      `\nCourt seed successful! Inserted ${mockCourts.length} rows.\n`,
    );
  } catch (error) {
    console.error("Error seeding courts");
    throw error;
  }
};
