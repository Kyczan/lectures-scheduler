const congregations = `
  select
  co.*,
  (
    select count(*)
    from speakers s
    where s.congregation_id = co.id
      and s.deleted = 'F'
  ) as speakers_count,
  co.number || co.name as number_name
  from congregations co
  where co.deleted = 'F'
`;

const sql = {
  all: `${congregations} ;`,
  one: `${congregations} and co.id = ?;`,
  add: `
    insert into congregations (number, name, modify_date, deleted)
    values( ?, ?, datetime('now', 'localtime'), 'F' );
  `,
  upd: `
    update congregations
    set number = ?, 
      name = ?, 
      modify_date = datetime('now', 'localtime')
    where id = ?;
  `,
  del: {
    congregations: `
      update congregations
      set deleted = 'T',
        modify_date = datetime('now', 'localtime')
      where id = ?;
    `,
    speakers: `
      update speakers
      set congregation_id = null
      where congregation_id = ?;
    `
  }
};

module.exports = sql;
