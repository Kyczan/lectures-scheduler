const sql = {
  findOne: `
    select *
    from users
    where id = ?
      and access_privilege = 'T';
  `
};

export { sql as users };
