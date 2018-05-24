const sql = {
  one: `
    select value
    from settings
    where parameter = ?;
  `,
  upd: `
    update settings
    set value = ?
    where parameter = ?;
  `
};

module.exports = sql;
