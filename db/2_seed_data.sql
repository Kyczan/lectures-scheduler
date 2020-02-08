insert into lectures (number, title, note, modify_date, deleted) 
    values( 1, 'Test title', '', now(), 'F' );

insert into congregations (name, modify_date, deleted)
    values( 'Test Congregation', now(), 'F' );

insert into speakers (
      congregation_id, first_name, last_name, note, modify_date, deleted
    )values(
      (select id from congregations limit 1), 'John', 'Smith', '',
      now(),
      'F'
    );

insert into schedule (
      speaker_id, lecture_id, event_date, event_time,
      note, modify_date, deleted
    )values(
      (select id from speakers limit 1), (select id from lectures limit 1), '2019-05-01', '10:00', 'note',
      now(),
      'F'
    );