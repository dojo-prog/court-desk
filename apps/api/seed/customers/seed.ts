import { PoolClient } from "pg";
import { mockCustomers } from "./data";
import { buildInsertQueryParts } from "../../src/utils/query-builder/buildInsertQueryParts";
import { truncateTable } from "../utils/truncate-table";

export const seedCustomers = async (client: PoolClient) => {
  try {
    console.log("Starting customers seed...");

    await truncateTable("customers", client);

    console.log("Inserting rows...");
    for (const c of mockCustomers) {
      const { columnsStr, placeholdersStr, values } = buildInsertQueryParts(c);

      await client.query(
        `
        INSERT INTO customers (${columnsStr})
        VALUES (${placeholdersStr})
        `,
        values,
      );

      console.log(`Inserted customer: ${c.first_name} ${c.last_name}`);
    }

    console.log(
      `\nCustomer seed successful! Inserted ${mockCustomers.length} rows.\n`,
    );
  } catch (error) {
    console.error("Error seeding customers");
    throw error;
  }
};
