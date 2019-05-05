insert into lectures (number, title, modify_date, deleted) 
    values( 1, 'Test title', now(), 'F' );

insert into congregations (number, name, modify_date, deleted)
    values( 1111, 'Congregation-Name', now(), 'F' );

insert into speakers (
      congregation_id, first_name, last_name, phone,
      email, privilege, note, modify_date, deleted
    )values(
      (select id from congregations limit 1), 'John', 'Smith', '555666555', 'john@smith.com', 'starszy', '',
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