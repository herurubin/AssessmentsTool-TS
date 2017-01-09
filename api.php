

<?php
ob_start();
$connection = mysqli_connect('localhost', 'root', 'Assessments2017', 'assessments');

$transfer = $_POST['assessment'];





if(!empty($transfer)){

    //saving and updating assessments
    if( isset($_POST['assessment']) ){
        $assessment = $_POST['assessment'];
        $assessmentInfo = $assessment['assessmentInfo'];
        $assessmentStructure = json_encode($assessment['assessmentStructure']);

        $whatIsAssessed = mysqli_real_escape_string($connection, $assessmentInfo['whatIsAssessed']);
        $assessmentName = mysqli_real_escape_string($connection, $assessmentInfo['AssessmentName']);
        $yourName = $assessmentInfo['YourName'];
        $corpID = $assessmentInfo['CorpID'];

        $checkExisting = "SELECT * FROM assessments WHERE WhatIsAssessed LIKE '$assessmentName%' ";
        $searchQuery = mysqli_query($connection, $checkExisting);

        echo json_encode($searchQuery);

        $result = mysqli_query($connection, "SELECT * FROM assessments WHERE AssessmentName='$assessmentName' ");

        if($result->num_rows){

            $query = "UPDATE assessments 
                      SET WhatIsAssessed = '$whatIsAssessed', YourName = '$yourName', CorpID = '$corpID', questionsStructure = '$assessmentStructure'
                      WHERE AssessmentName = '$assessmentName'   ";
            $update = mysqli_query($connection, $query);


        }else{

            $query = "INSERT INTO assessments(WhatIsAssessed, AssessmentName, YourName, CorpID, questionsStructure )
                  VALUE('$whatIsAssessed', '$assessmentName', '$yourName', '$corpID', '$assessmentStructure' )";

            $query_assessment = mysqli_query($connection, $query);
        }
    }//end saving and updating



}

?>