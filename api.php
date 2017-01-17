

<?php
include "db.php";



if(!empty($_POST)){
    //$action = $_POST;


    if( isset($_POST['assessment'])){

        $assessment = $_POST['assessment'];

        $assessmentInfo = $assessment['assessmentInfo'];
        $assessmentStructure = $assessment['assessmentStructure'];
        $assessmentStructureJSON = json_encode($assessmentStructure);
        $responsesDataJSON = $assessment['responsesData'];

        $whatIsAssessed = $assessmentInfo['whatIsAssessed'];
        $assessmentName = $assessmentInfo['AssessmentName'];
        $yourName = $assessmentInfo['YourName'];
        $corpID = $assessmentInfo['CorpID'];
        $emailList = $assessmentInfo['emailList'];
        $quizStructure = json_encode($assessmentStructureJSON);
        $responsesData = json_encode($responsesDataJSON);



        $result = mysqli_query($connection, "SELECT * FROM assessments WHERE assessmentsname='$assessmentName' ");


        if(mysqli_num_rows($result)>=1){

            $query = "UPDATE assessments 
              SET whatIsAssessed = '$whatIsAssessed', yourName = '$yourName', corpID = '$corpID', quizStructure='$quizStructure', responses = '$responsesData',  WHERE assessmentsname = '$assessmentName' ";
            $update = mysqli_query($connection, $query);

            echo "saved over existing";
        }else{
            $query = "INSERT INTO assessments(whatIsAssessed, assessmentsname, yourName, corpID, quizStructure) VALUE('$whatIsAssessed', '$assessmentName', '$yourName', '$corpID','$assessmentStructureJSON' )";

            $query_assessment = mysqli_query($connection, $query);
            echo "new item saved";
        }


    }


    if(isset($_POST['loadAll'])){

        $listFromResult=array();
        $result = mysqli_query($connection, "SELECT * FROM assessments ORDER BY lastmodified");

        while($row = $result->fetch_assoc()){
            array_push($listFromResult, $row);
        }

        echo json_encode($listFromResult);

    }

    if(isset($_POST['loadSpecific'])){

        $selectedAssessment = $_POST['loadSpecific'];
        echo $selectedAssessment;
        $listFromResult=array();

        $result = mysqli_query($connection, "SELECT * FROM assessments WHERE assessmentsname = '$selectedAssessment' ");


        while($row = $result->fetch_assoc()){
            array_push($listFromResult, $row);
        }

        echo json_encode($listFromResult);

    }


    if(isset($_POST['editSelectedAssessment'])){
        $selectedAssessment=$_POST['editSelectedAssessment'];
        $listFromResult=array();
        $quizStructureDescription = array();


        $result = mysqli_query($connection, "SELECT * FROM assessments WHERE assessmentsname = '$selectedAssessment'");

        while($row = $result->fetch_assoc()){
            $quizInfo = array(
              "yourName" => $row["yourName"],
                "corpID" => $row["corpID"],
                "assessmentsname" => $row["assessmentsname"],
                "whatIsAssessed" => $row["whatIsAssessed"],

            );
            $quizStructureDescription = $row["quizStructure"];

        }

        $returnData = array(
            $quizInfo,
            $quizStructureDescription
        );

        echo json_encode($returnData);


    }


    if(isset($_POST['getAssessmentResponses'])){
        $selectedAssessment = $_POST['getAssessmentResponses'];
        $result = mysqli_query($connection, "SELECT * FROM assessments WHERE assessmentsname = '$selectedAssessment'");

        while($row = $result->fetch_assoc()){
            $returnResponses = $row["responses"];
        }

        echo  json_encode($returnResponses);


    }




    }//end saving and updating





?>


