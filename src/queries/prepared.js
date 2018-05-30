const select = `
  select pl.speaker_id,
  pl.lecture_id,
  l.title,
  l.number,
  (
    select max(sc.event_date)
    from schedule sc
    where sc.speaker_id = pl.speaker_id
      and sc.lecture_id = pl.lecture_id
      and sc.deleted = 'F'
  ) as last_speaker_lecture_date,
  (
    select max(sc.event_date)
    from schedule sc
    where sc.lecture_id = pl.lecture_id
      and sc.deleted = 'F'
  ) as last_lecture_date
  from prepared_lectures pl
  left join lectures l
    on l.id = pl.lecture_id
  where l.deleted = 'F'
  and pl.speaker_id = ? 
`;

const sql = {
  findAll: `${select} ;`,
  findOne: `${select} and pl.lecture_id = ?;`,
  create: `
    insert into prepared_lectures ( speaker_id, lecture_id )
    values( ?, ? );
  `,
  remove: `
    delete from prepared_lectures
    where speaker_id = ?
      and lecture_id = ?;
  `
};

export default sql;
