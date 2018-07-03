const sql = {
  findOne: `
    select *
    from users
    where id = ?;
  `
};

export { sql as users };
