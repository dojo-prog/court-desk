import { PoolClient } from "pg";

export const truncateTable = async (tableName: string, client: PoolClient) => {
  console.log(`\nTruncating ${tableName} table...`);
  await client.query(
    `
    TRUNCATE TABLE ${tableName} CASCADE;
    `,
  );
  console.log("Truncate successful\n");
};
