import { PoolClient } from "pg";
import { mockReservations } from "./data";
import { buildInsertQueryParts } from "../../src/utils/query-builder/buildInsertQueryParts";
import { truncateTable } from "../utils/truncate-table";

export const seedreservations = async (client: PoolClient) => {
  try {
    console.log("Starting reservations seed...");

    await truncateTable("reservations", client);

    const { rows: courtRows } = await client.query(
      `
      SELECT id from courts
      LIMIT 1
      `,
    );

    const court_id = courtRows[0].id;

    const { rows: userRows } = await client.query(
      `
      SELECT id from users
      WHERE email = 'admin@dojo.com'
      `,
    );

    const created_by = userRows[0].id;

    console.log("Inserting rows...");
    for (const r of mockReservations) {
      const { customerFName, customerLName, ...rest } = r;

      const { rows } = await client.query(
        `
        SELECT id from customers 
        WHERE first_name = $1
          AND last_name = $2
        `,
        [r.customerFName, r.customerLName],
      );

      const customer_id = rows[0].id;

      const final = {
        ...rest,
        court_id,
        customer_id,
        created_by,
      };

      const { columnsStr, placeholdersStr, values } =
        buildInsertQueryParts(final);

      await client.query(
        `
        INSERT INTO reservations (${columnsStr})
        VALUES (${placeholdersStr})
        `,
        values,
      );

      console.log(`Inserted reservations by: ${r.customerFName}`);
    }

    console.log(
      `\nReservation seed successful! Inserted ${mockReservations.length} rows.\n`,
    );
  } catch (error) {
    console.error("Error seeding reservations");
    throw error;
  }
};
