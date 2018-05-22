const speakers = `
  select
  s.id as id,
  s.first_name as first_name,
  s.last_name as last_name,
  s.last_name || ' ' || s.first_name as name,
  s.phone as phone,
  s.email as email,
  s.privilege as privilege,
  s.note as note,
  co.id as congregation_id,
  co.number as congregation_number,
  co.name as congregation_name,
  co.name || ' (' || co.number || ')' as congregation,
  (
    select max(sc.event_date)
    from schedule sc
    where sc.speaker_id = s.id
      and sc.deleted = 'F'
  ) as last_lecture_date
  from speakers s
  left join congregations co
  on s.congregation_id = co.id
  where s.deleted = 'F' 
`;

const sql = {
  all: `${speakers} ;`,
  one: `${speakers} and s.id = ?;`,
  add: `
    insert into speakers (
      congregation_id,
      first_name,
      last_name,
      phone,
      email,
      privilege,
      note,
      modify_date,
      deleted
    )values(
      ?, ?, ?, ?, ?, ?, ?,
      datetime('now', 'localtime'),
      'F'
    );
  `,
  upd: `
    update speakers
    set congregation_id = ?,
      first_name = ?,
      last_name = ?,
      phone = ?,
      email = ?,
      privilege = ?,
      note = ?,
      modify_date = datetime('now', 'localtime')
    where id = ?;
  `,
  del: `
    update speakers
    set deleted = 'T',
      modify_date = datetime('now', 'localtime')
    where id = ?;
  `
};

module.exports = sql;
