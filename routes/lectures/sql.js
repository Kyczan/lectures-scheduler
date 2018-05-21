const lectures = `
  select l.*,
    (
      select max(s.event_date || ifnull(' (' || sp.last_name || ' ' || sp.first_name || ')','')) as a
      from schedule s 
      left join speakers sp
      on sp.id = s.speaker_id
      where s.lecture_id = l.id 
        and s.deleted = 'F'
    ) as uwagi,
  l.number || l.title as number_title
  from lectures l
  where 
`;

const sql = {
  all: `${lectures} l.deleted = 'F';`,
  one: `${lectures} l.id = ?;`,
  add: `
    insert into lectures (number, title, modify_date, deleted)
    values( ?, ?, datetime('now', 'localtime'), 'F' );
  `,
  upd: `
    update lectures
    set number = ?, 
        title = ?, 
        modify_date = datetime('now', 'localtime')
    where id = ?;
  `,
  del: `
    update lectures
    set deleted = 'T',
        modify_date = datetime('now', 'localtime')
    where id = ?;
  `
};

module.exports = sql;
