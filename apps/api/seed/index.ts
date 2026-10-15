import { pool } from "../src/infrastructure/database/pool";
import { seedCourts } from "./courts/seed";
import { seedCustomers } from "./customers/seed";
import { seedreservations } from "./reservations/seed";
import { seedUsers } from "./users/seed";

export const seed = async () => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await seedUsers(client);
    await seedCustomers(client);
    await seedCourts(client);
    await seedreservations(client);

    await client.query("COMMIT");

    console.log("\nSeeding Complete!\n");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Seed error:", error);
  }
};

seed();
