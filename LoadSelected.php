<?php
ob_start();
$connection = mysqli_connect('localhost', 'root', 'Assessments2017', 'assessments');
//load all assessments
$transfer = $_POST['loadSelected'];
if( isset($_POST['loadSelected']) ){

    $getAssessment = "SELECT * FROM assessments WHERE AssessmentName = '$transfer'  ";
    $search = mysqli_query($connection, $getAssessment);
    $returnArray = array();
    while ($row = mysqli_fetch_array($search)){
        $questions = json_encode($row['questionsStructure']);

        $rowObj = array(
            "name"=>$row['AssessmentName'],
            "whatIsAssessed"=>$row['WhatIsAssessed'],
            "AuthorName"=>$row['YourName'],
            "AuthorID"=>$row['CorpID']
        );

        $quizObj = array(
            "questionsStructure"=> stripslashes($questions)
        );

        array_push($returnArray, $rowObj);
        array_push($returnArray, $quizObj);





    }


    echo json_encode($returnArray);

}





?>