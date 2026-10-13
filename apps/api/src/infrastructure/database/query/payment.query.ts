export const PAYMENT_WITH_RELATIONS_PROJECTION = `
  p.id,
  p.amount,
  p.paid_at,
  p.created_at,

  json_build_object(
    'court',   
    CASE 
      WHEN court.id IS NULL THEN NULL
      ELSE json_build_object(
        'id', court.id,
        'name', court.name
      )  
    END,

    'customer',
    CASE 
      WHEN c.id IS NULL THEN NULL
      ELSE json_build_object(
        'id', c.id,
        'first_name', c.first_name,
        'last_name', c.last_name
      )
    END
  ) AS reservation,

  CASE 
    WHEN u.id IS NULL THEN NULL
    ELSE json_build_object(
      'id', u.id,
      'first_name', u.first_name,
      'last_name', u.last_name
    )
  END AS recorded_by
`;

export const PAYMENT_JOINS = `
  LEFT JOIN reservations r
    ON r.id = p.reservation_id

  LEFT JOIN courts court
    ON court.id = r.court_id
  
  LEFT join customers c
    ON c.id = r.customer_id

  LEFT join users u
    ON u.id = p.recorded_by
`;
