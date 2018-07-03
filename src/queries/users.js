const sql = {
  findOne: `
    select *
    from users
    where id = ?;
  `
};

export default sql;
