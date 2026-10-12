export const CUSTOMER_WITH_RELATIONS_PROJECTION = `
  c.id,
  c.first_name,
  c.last_name,
  c.email,
  c.phone,
  c.created_at,
  c.updated_at,
  (
    SELECT COUNT(*) 
    FROM reservations r
    WHERE r.customer_id = c.id
      AND r.status IN ('confirmed', 'completed')
  ) reservations_count
`;
