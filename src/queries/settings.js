const sql = {
  findOne: `
    select value
    from settings
    where parameter = ?;
  `,
  update: `
    update settings
    set value = ?
    where parameter = ?;
  `
};

export default sql;
