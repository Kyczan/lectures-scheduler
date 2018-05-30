const select = `
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
  where l.deleted = 'F' 
`;

const sql = {
  findAll: `${select} ;`,
  findOne: `${select} and l.id = ?;`,
  create: `
    insert into lectures (number, title, modify_date, deleted)
    values( ?, ?, datetime('now', 'localtime'), 'F' );
  `,
  update: `
    update lectures
    set number = ?, 
        title = ?, 
        modify_date = datetime('now', 'localtime')
    where id = ?;
  `,
  remove: `
    update lectures
    set deleted = 'T',
        modify_date = datetime('now', 'localtime')
    where id = ?;
  `
};

export default sql;
