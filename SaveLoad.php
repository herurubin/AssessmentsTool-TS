<?php
ob_start();
$connection = mysqli_connect('localhost', 'root', 'Assessments2017', 'assessments');
//load all assessments
$transfer = $_POST['loadAllAssessments'];
if(!empty($transfer)) {
    if (isset($_POST['loadAllAssessments'])) {

        $getAssessments = "SELECT * FROM assessments ";
        $searchQuery = mysqli_query($connection, $getAssessments);
        $returnArray = array();
        while ($row = mysqli_fetch_array($searchQuery)){

            $rowObj = array(
                "name"=>$row['AssessmentName'],
                "whatIsAssessed"=>$row['WhatIsAssessed'],
                "AuthorName"=>$row['YourName'],
                "AuthorID"=>$row['CorpID']
            );

            array_push($returnArray, $rowObj);

        }

        echo json_encode($returnArray);




    }
}

?>