import { pool } from "./pool";

const initDb = async () => {
  await pool.query(
    `
    -- =========================================================
    -- Users 
    -- =========================================================

    CREATE TABLE IF NOT EXISTS users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      first_name text NOT NULL,
      last_name text NOT NULL,
      email text NOT NULL, 
      password_hash text NOT NULL, 
      role text NOT NULL DEFAULT 'staff',
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now(),

      CONSTRAINT user_role_valid
        CHECK ( role IN (
          'staff', 
          'admin'
        )) 
    );

    CREATE UNIQUE INDEX IF NOT EXISTS user_name_unique
      ON users (LOWER(first_name), LOWER(last_name));

    CREATE UNIQUE INDEX IF NOT EXISTS user_email_unique
      ON users (LOWER(email));

    -- =========================================================
    -- Customers
    -- =========================================================

    CREATE TABLE IF NOT EXISTS customers (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      first_name text NOT NULL,
      last_name text NOT NULL,
      email text,
      phone text, 
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz,

      CONSTRAINT customer_name_unique
        UNIQUE (first_name, last_name)
    );

    -- =========================================================
    -- Courts
    -- =========================================================

    CREATE TABLE IF NOT EXISTS courts (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL, 
      status text NOT NULL DEFAULT 'active',
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz,

      CONSTRAINT court_status_valid
        CHECK (status IN (
          'active',
          'maintenance',
          'inactive'
        ))
    );

    CREATE UNIQUE INDEX IF NOT EXISTS court_name_unique
      ON courts (LOWER(name));

    -- =========================================================
    -- Reservations 
    -- =========================================================

    CREATE EXTENSION IF NOT EXISTS btree_gist;

    CREATE TABLE IF NOT EXISTS reservations (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

      customer_id uuid REFERENCES public.customers(id) 
        ON DELETE SET NULL, 
      court_id uuid REFERENCES public.courts(id) 
        ON DELETE SET NULL, 
      created_by uuid REFERENCES public.users(id) 
        ON DELETE SET NULL,

      date date NOT NULL,

      start_time time NOT NULL, 
      end_time time NOT NULL, 

      total_amount numeric(10,2) NOT NULL, 
      minimum_payment numeric(10,2) NOT NULL, 

      status text NOT NULL DEFAULT 'pending', 

      notes text,

      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz,

      CONSTRAINT reservation_status_valid
        CHECK (status IN (
          'pending',
          'confirmed',
          'completed',
          'cancelled'
        )),

      CONSTRAINT reservation_time_valid 
        CHECK (start_time < end_time),

      CONSTRAINT reservation_no_overlap
        EXCLUDE USING gist (
          court_id WITH =,
          tsrange(
            date + start_time,
            date + end_time,
            '[)'
          ) WITH &&
        )
        WHERE (
          court_id IS NOT NULL
          AND status IN ('pending', 'confirmed')
        )
    );

    -- =========================================================
    -- Payments
    -- =========================================================

    CREATE TABLE IF NOT EXISTS payments (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

      reservation_id uuid REFERENCES public.reservations(id) 
        ON DELETE SET NULL, 
      recorded_by uuid REFERENCES public.users(id)
        ON DELETE SET NULL,

      amount numeric(10,2) NOT NULL, 
      method text NOT NULL,
    
      paid_at timestamptz NOT NULL DEFAULT now(),
      created_at timestamptz NOT NULL DEFAULT now(),

      CONSTRAINT payment_method_valid 
        CHECK (method IN (
          'cash',
          'gcash',
          'bank_transfer',
          'card'
        )) 
    );
    `,
  );
};

initDb();
