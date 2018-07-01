const select = `
  select
  co.*,
  (
    select count(*)
    from speakers s
    where s.congregation_id = co.id
      and s.deleted = 'F'
  ) as speakers_count,
  concat(co.number, co.name) as number_name
  from congregations co
  where co.deleted = 'F'
`;

const sql = {
  findAll: `${select} ;`,
  findOne: `${select} and co.id = ?;`,
  create: `
    insert into congregations (number, name, modify_date, deleted)
    values( ?, ?, now(), 'F' );
  `,
  update: `
    update congregations
    set number = ?, 
      name = ?, 
      modify_date = now()
    where id = ?;
  `,
  remove: {
    congregations: `
      update congregations
      set deleted = 'T',
        modify_date = now()
      where id = ?;
    `,
    speakers: `
      update speakers
      set congregation_id = null
      where congregation_id = ?;
    `
  }
};

export default sql;
