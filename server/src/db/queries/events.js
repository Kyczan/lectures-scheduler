const select = `
  select 
    sc.*,
    concat(sp.last_name, ' ', sp.first_name) as speaker,
    co.name as congregation,
    concat(le.number, '. ', le.title) as lecture
  from schedule sc
  left join speakers sp
    on sc.speaker_id = sp.id
  left join lectures le
    on le.id = sc.lecture_id
  left join congregations co
    on co.id = sp.congregation_id
  where sc.deleted = 'F' 
`;

const sql = {
  findAll: `${select} ;`,
  findOne: `${select} and sc.id = ?;`,
  create: `
    insert into schedule (
      speaker_id,
      lecture_id,
      event_date,
      event_time,
      note,
      modify_date,
      deleted
    )values(
      ?, ?, ?, ?, ?,
      now(),
      'F'
    );
  `,
  update: `
    update schedule
    set speaker_id = ?,
      lecture_id = ?,
      event_date = ?,
      event_time = ?,
      note = ?,
      modify_date = now()
    where id = ?;
  `,
  remove: `
    update schedule
    set deleted = 'T',
      modify_date = now()
    where id = ?;
  `
};

export { sql as events };
