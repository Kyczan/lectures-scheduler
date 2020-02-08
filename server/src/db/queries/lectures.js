const select = `
  select l.*,
  (
    select max(concat(s.event_date, ifnull(concat('##', sp.last_name, ' ', sp.first_name),''))) as a
    from schedule s 
    left join speakers sp
    on sp.id = s.speaker_id
    where s.lecture_id = l.id 
      and s.deleted = 'F'
  ) as notes,
  concat(l.number, l.title) as number_title
  from lectures l
  where l.deleted = 'F'
`;

const sql = {
  findAll: `${select} ;`,
  findOne: `${select} and l.id = ?;`,
  create: `
    insert into lectures (number, title, note, modify_date, deleted)
    values( ?, ?, ?, now(), 'F' );
  `,
  update: `
    update lectures
    set number = ?, 
        title = ?, 
        note = ?, 
        modify_date = now()
    where id = ?;
  `,
  remove: `
    update lectures
    set deleted = 'T',
        modify_date = now()
    where id = ?;
  `
};

export { sql as lectures };
