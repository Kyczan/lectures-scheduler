<?php
require_once '../lib/mpdf/mpdf.php';
require_once 'dataModel.php';

date_default_timezone_set('Europe/Warsaw');
session_start();

$req = $_POST['request'];
$obj = $_POST['obj'];
$data = $_POST;
if(empty($req)){
    $data = json_decode(file_get_contents('php://input'), true); //przy jsonie w zmiennej post
    $req = $data['request'];
    $obj = $data['obj'];
}

switch ($req) {

//--ustawienia:
    case 'getsetting':
        $value = getSetting($data['parameter']);
        echo $value;
        break;
    case 'setsetting':
        $ok = setSetting($data);
        echo $ok;
        break;

//--wykłady:
    case 'alllectures':
        $lectures = getAllLectures();
        echo json_encode($lectures);
        break;
    case 'addlecture':
        $ok = addNewLecture($data);
        echo json_encode($ok);
        break;
    case 'dellecture':
        $ok = deleteLecture($data);
        echo($ok);
        break;
    case 'editlecture':
        $ok = editLecture($data);
        echo json_encode($ok);
        break;

//--zbory:
    case 'allcongregations':
        $congregations = getAllCongregations();
        echo json_encode($congregations);
        break;
    case 'addcongregation':
        $ok = addNewCongregation($data);
        echo json_encode($ok);
        break;
    case 'delcongregation':
        $ok = deleteCongregation($data);
        echo($ok);
        break;
    case 'editcongregation':
        $ok = editCongregation($data);
        echo json_encode($ok);
        break;

//--mówcy:
    case 'allspeakers':
        $speakers = getAllSpeakers();
        echo json_encode($speakers);
        break;
    case 'addspeaker':
        $ok = addNewSpeaker($data);
        echo json_encode($ok);
        break;
    case 'delspeaker':
        $ok = deleteSpeaker($data);
        echo($ok);
        break;
    case 'editspeaker':
        $ok = editSpeaker($data);
        echo json_encode($ok);
        break;

//--przygotowane wykłady przez mówców:
    case 'preparedlectures':
        $prepared = getPreparedLectures($data['id']);
        echo json_encode($prepared);
        break;
    case 'delprepared':
        $prepared = deletePreparedLecture($data);
        echo json_encode($prepared);
        break;
    case 'addprepared':
        $prepared = addPreparedLecture($data);
        echo json_encode($prepared);
        break;

//--zaplanowane wykłady:
    case 'schedule':
        $schedule = getSchedule();
        echo json_encode($schedule);
        break;
    case 'addevent':
        $event = addEvent($data);
        echo json_encode($event);
        break;
    case 'delevent':
        $ok = deleteEvent($data);
        echo($ok);
        break;
    case 'editevent':
        $event = editEvent($data);
        echo json_encode($event);
        break;
    case 'genpdf':
        $a = genPdf($obj);
        break;
    case 'getdatatopdf':
        $pdf = getScheduleDataToPdf();
        echo json_encode($pdf);
        break;

    default:
        break;
}

?>

