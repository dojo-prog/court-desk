export const RESERVATION_WITH_RELATIONS_PROJECTION = `
  r.id,
  r.date,
  r.start_time, 
  r.end_time,
  r.total_amount, 
  r.minimum_payment,
  r.status, 
  r.notes, 
  r.created_at,
  r.updated_at,

  CASE 
    WHEN c.id IS NULL THEN NULL
    ELSE json_build_object(
      'id', c.id, 
      'first_name', c.first_name,
      'last_name', c.last_name, 
      'email', c.email, 
      'phone', c.phone
    )
  END AS customer,

  CASE 
    WHEN court.id IS NULL THEN NULL
    ELSE json_build_object(
      'id', court.id,
      'name', court.name
    )
  END AS court,


  CASE 
    WHEN u.id IS NULL THEN NULL
    ELSE json_build_object(
      'id', u.id, 
      'first_name', u.first_name,
      'last_name', u.last_name, 
      'email', u.email
    )
  END AS created_by,

  COALESCE(
    (
      SELECT json_agg(
        json_build_object(
          'id', p.id,
          'reservation_id', p.reservation_id,
          'recorded_by', p.recorded_by,
          'amount', p.amount,
          'method', p.method,
          'paid_at', p.paid_at,
          'created_at', p.created_at
        )
        ORDER BY p.created_at DESC
      )
      FROM payments p
      WHERE p.reservation_id = r.id
    ),
    '[]'::json
  ) AS payments 
`;

export const RESERVATION_JOINS = `
  LEFT JOIN customers c
    ON c.id = r.customer_id
    
  LEFT JOIN courts court 
    ON court.id = r.court_id
  
  LEFT JOIN users u 
    ON u.id = r.created_by
`;
