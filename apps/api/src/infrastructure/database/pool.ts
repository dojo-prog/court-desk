import { ENV } from "@/config/env";
import { Pool, types } from "pg";

types.setTypeParser(1082, (value) => value);

export const pool = new Pool(ENV.DATABASE);
