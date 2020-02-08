const sql = {
  findOne: `
    select *
    from users
    where id = ?;
  `,
  create: `
  insert into users (
    id,
    name,
    email
  )values(
    ?, ?, ?
  );
`
};

export { sql as users };
