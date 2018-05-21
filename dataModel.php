<?php
//funkcje związane z zapytaniami do bazy danych:

function polacz(){ //łączy się z bazą sqlite
	$db = new SQLite3('../../db/planer.db');
	return $db;
}

function daj_tablice($sql){
    $db = polacz();
	$result = $db->query($sql);
	$data = array();
	while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
		$data[] = $row;
	}
	return $data;
}

function daj_wiersz($sql){
	$db = polacz();
	$result = $db->query($sql);
	$data = $result->fetchArray(SQLITE3_ASSOC);
	return $data;
}

function wykonaj_sql($sql){
    $db = polacz();
    $db->exec($sql);
}

function wykonaj_sql_daj_id($sql){
    $db = polacz();
    $db->exec($sql);
    return $db->lastInsertRowid();
}

//------ustawienia:

function getSetting($parameter){
    $sql = "select value
            from settings
            where parameter = '".$parameter."'";
    $data = daj_wiersz($sql);
    return $data['value'];
}

function setSetting($data){
    $parameter = $data['parameter'];
    $value = $data['value'];
    $sql = "update settings
            set value = '".$value."'
            where parameter = '".$parameter."'";
    wykonaj_sql($sql);
    return 'ok';
}

//------wykłady:

function getAllLectures(){
    $sql = "select l.*,
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
            order by l.number";
    $data = daj_tablice($sql);
    return $data;
}

function getLectureById($id){
    $sql = "select l.*,
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
            where l.id = ".$id;
    $data = daj_wiersz($sql);
    return $data;
}

function addNewLecture($lecture){
    $numer = ($lecture['number'] == '' ? 'null' : $lecture['number']);
    $tytul = $lecture['title'];
    $sql = "insert into lectures (number, title, modify_date, deleted)
            values( ".$numer.", '".$tytul."', '".date('Y-m-d H:i:s')."', 'F' )";
    $id = wykonaj_sql_daj_id($sql);
    return getLectureById($id);
}

function deleteLecture($lecture){
    $id = $lecture['id'];
    $sql = "update lectures
            set deleted = 'T',
                modify_date = '".date('Y-m-d H:i:s')."'
            where id = ".$id;
    wykonaj_sql($sql);
    return 'ok';
}

function editLecture($lecture){
    $id = $lecture['id'];
    $title = $lecture['title'];
    $number = ($lecture['number'] == '' ? 'null' : $lecture['number']);
    $sql = "update lectures
            set number = ".$number.", 
                title = '".$title."', 
                modify_date = '".date('Y-m-d H:i:s')."'
            where id = ".$id;
    wykonaj_sql($sql);
    return getLectureById($id);
}

//------zbory:

function getAllCongregations(){
    $sql = "select
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
            order by name";
    $data = daj_tablice($sql);
    return $data;
}

function getCongregationById($id){
    $sql = "select
                co.*,
                (
                    select count(*)
                    from speakers s
                    where s.congregation_id = co.id
                        and s.deleted = 'F'
                ) as speakers_count,
                co.number || co.name as number_name
            from congregations co
            where co.id = ".$id;
    $data = daj_wiersz($sql);
    return $data;
}

function addNewCongregation($congregation){
    $number = ($congregation['number'] == '' ? 'null' : $congregation['number']);
    $name = $congregation['name'];
    $sql = "insert into congregations (number, name, modify_date, deleted)
            values( ".$number.", '".$name."', '".date('Y-m-d H:i:s')."', 'F' )";
    $id = wykonaj_sql_daj_id($sql);
    return getCongregationById($id);
}

function deleteCongregation($congregation){
    $id = $congregation['id'];
    $sql = "update congregations
            set deleted = 'T',
                modify_date = '".date('Y-m-d H:i:s')."'
            where id = ".$id;
    wykonaj_sql($sql);
    $sql = "update speakers
            set congregation_id = null
            where congregation_id = ".$id;
    wykonaj_sql($sql);
    return 'ok';
}

function editCongregation($congregation){
    $id = $congregation['id'];
    $name = $congregation['name'];
    $number = ($congregation['number'] == '' ? 'null' : $congregation['number']);
    $sql = "update congregations
            set number = ".$number.", 
                name = '".$name."', 
                modify_date = '".date('Y-m-d H:i:s')."'
            where id = ".$id;
    wykonaj_sql($sql);
    return getCongregationById($id);
}

//------mówcy:

function getAllSpeakers(){
    $sql = "select
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
            order by name";
    $data = daj_tablice($sql);
    return $data;
}

function getSpeakerById($id){
    $sql = "select
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
            where s.id = ".$id;
    $data = daj_wiersz($sql);
    return $data;
}

function addNewSpeaker($speaker){
    $first_name = $speaker['first_name'];
    $last_name = $speaker['last_name'];
    $phone = $speaker['phone'];
    $email = $speaker['email'];
    $privilege = $speaker['privilege'];
    $note = $speaker['note'];
    $congregation_id = ($speaker['congregation_id'] == '' ? 'null' : $speaker['congregation_id']);
    $sql = "insert into speakers (
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
                ".$congregation_id.",
                '".$first_name."',
                '".$last_name."',
                '".$phone."',
                '".$email."',
                '".$privilege."',
                '".$note."',
                '".date('Y-m-d H:i:s')."',
                'F'
            )";
    $id = wykonaj_sql_daj_id($sql);
    return getSpeakerById($id);
}

function deleteSpeaker($speaker){
    $id = $speaker['id'];
    $sql = "update speakers
            set deleted = 'T',
                modify_date = '".date('Y-m-d H:i:s')."'
            where id = ".$id;
    wykonaj_sql($sql);
    return 'ok';
}

function editSpeaker($speaker){
    $id = $speaker['id'];
    $first_name = $speaker['first_name'];
    $last_name = $speaker['last_name'];
    $phone = $speaker['phone'];
    $email = $speaker['email'];
    $privilege = $speaker['privilege'];
    $note = $speaker['note'];
    $congregation_id = ($speaker['congregation_id'] == '' ? 'null' : $speaker['congregation_id']);
    $sql = "update speakers
            set congregation_id = ".$congregation_id.",
                first_name = '".$first_name."',
                last_name = '".$last_name."',
                phone = '".$phone."',
                email = '".$email."',
                privilege = '".$privilege."',
                note = '".$note."',
                modify_date = '".date('Y-m-d H:i:s')."'
            where id = ".$id;
    wykonaj_sql($sql);
    return getSpeakerById($id);
}

//------przygotowane wykłady przez mówców:

function getPreparedLectures($id){
    $sql = "select pl.speaker_id,
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
                and pl.speaker_id = ".$id;
    $data = daj_tablice($sql);
    return $data;
}

function deletePreparedLecture($data){
    $lecture_id = $data['lecture_id'];
    $speaker_id = $data['speaker_id'];
    $sql = "delete from prepared_lectures
            where lecture_id = ".$lecture_id."
                and speaker_id = ".$speaker_id;
    wykonaj_sql($sql);
    return getPreparedLectures($speaker_id);
}

function checkIfPreparedExists($lecture_id, $speaker_id){
    $sql = "select count(*) as ile
            from prepared_lectures
            where lecture_id = ".$lecture_id."
                and speaker_id = ".$speaker_id;
    $data = daj_wiersz($sql);
    return $data['ile'];
}

function addPreparedLecture($data){
    $lecture_id = $data['lecture_id'];
    $speaker_id = $data['speaker_id'];
    //sprawdzenie czy mówca nie ma już przypisanego tego wykładu
    if(checkIfPreparedExists($lecture_id, $speaker_id) == 0){
        $sql = "insert into prepared_lectures (
                    speaker_id,
                    lecture_id
                )values(
                    ".$speaker_id.",
                    ".$lecture_id."
                )";
        wykonaj_sql($sql);
    }
    return getPreparedLectures($speaker_id);
}

//------zaplanowane wykłady:

function getSchedule(){
    $sql = "select 
                sc.*,
                sp.last_name || ' ' || sp.first_name as speaker,
                sp.phone as phone,
                sp.email as email,
                -- co.name || ' (' || co.number || ')' as congregation,
                co.name as congregation,
                le.number || '. ' || le.title as lecture
            from schedule sc
            left join speakers sp
                on sc.speaker_id = sp.id
            left join lectures le
                on le.id = sc.lecture_id
            left join congregations co
                on co.id = sp.congregation_id
            where sc.deleted = 'F'";
    $data = daj_tablice($sql);
    return $data;
}

function getEventById($id){
    $sql = "select 
                sc.*,
                sp.last_name || ' ' || sp.first_name as speaker,
                sp.phone as phone,
                sp.email as email,
                -- co.name || ' (' || co.number || ')' as congregation,
                co.name as congregation,
                le.number || '. ' || le.title as lecture
            from schedule sc
            left join speakers sp
                on sc.speaker_id = sp.id
            left join lectures le
                on le.id = sc.lecture_id
            left join congregations co
                on co.id = sp.congregation_id
            where sc.id = ".$id;
    $data = daj_wiersz($sql);
    return $data;
}

function addEvent($event){
    $event_date = $event['event_date'];
    $event_time = $event['event_time'];
    $note = $event['note'];
    $lecture_id = ($event['lecture_id'] == '' ? 'null' : $event['lecture_id']);
    $speaker_id = ($event['speaker_id'] == '' ? 'null' : $event['speaker_id']);
    $sql = "insert into schedule (
                speaker_id,
                lecture_id,
                event_date,
                event_time,
                note,
                modify_date,
                deleted
            )values(
                ".$speaker_id.",
                ".$lecture_id.",
                '".$event_date."',
                '".$event_time."',
                '".$note."',
                '".date('Y-m-d H:i:s')."',
                'F'
            )";
    $id = wykonaj_sql_daj_id($sql);
    if($lecture_id != 'null' && $speaker_id != 'null'){
        $data = array('lecture_id' => $lecture_id, 'speaker_id' => $speaker_id);
        $tmp = addPreparedLecture($data);
    }
    return getEventById($id);
}

function deleteEvent($event){
    $id = $event['id'];
    $sql = "update schedule
            set deleted = 'T',
                modify_date = '".date('Y-m-d H:i:s')."'
            where id = ".$id;
    wykonaj_sql($sql);
    return 'ok';
}

function editEvent($event){
    $id = $event['id'];
    $event_date = $event['event_date'];
    $event_time = $event['event_time'];
    $note = $event['note'];
    $lecture_id = ($event['lecture_id'] == '' ? 'null' : $event['lecture_id']);
    $speaker_id = ($event['speaker_id'] == '' ? 'null' : $event['speaker_id']);
    $sql = "update schedule
            set speaker_id = ".$speaker_id.",
                lecture_id = ".$lecture_id.",
                event_date = '".$event_date."',
                event_time = '".$event_time."',
                note = '".$note."',
                modify_date = '".date('Y-m-d H:i:s')."'
            where id = ".$id;
    wykonaj_sql($sql);
    if($lecture_id != 'null' && $speaker_id != 'null'){
        $data = array('lecture_id' => $lecture_id, 'speaker_id' => $speaker_id);
        $tmp = addPreparedLecture($data);
    }
    return getEventById($id);
}

//------pdf:

function genPdf($data){
    $pdf_data = json_decode($data,true);
    include 'pdf/schedulePdf.php';
    $mpdf=new mPDF('','','','',7,7,10,6,5,5);
    $mpdf->WriteHTML($html);
    $mpdf->Output();
    exit;
}

function getScheduleDataToPdf(){
    $sql = "select 
                sc.event_date,
                sp.first_name || ' ' || sp.last_name as speaker_name,
                le.title as lecture_title,
                co.name as congregation,
                sc.note as note
            from schedule sc
            left join speakers sp
                on sc.speaker_id = sp.id
            left join lectures le
                on le.id = sc.lecture_id
            left join congregations co
                on co.id = sp.congregation_id
            where sc.deleted = 'F'
                -- and (speaker_name is not null or lecture_title is not null)
                and event_date >= '".date("Y-m-d")."'
            order by sc.event_date";
    $data = daj_tablice($sql);
    return $data;
}

?>
