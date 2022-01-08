<?php
	include("../model/UserModel.php");
	if($_SERVER['REQUEST_METHOD']==='OPTIONS')
	{
		return 0;
	}
	else 
	{
	error_reporting(0);
	$data = json_decode(file_get_contents("php://input"));
	
	$myObj=(object)null;

    $auth_email = $data->auth_email;
	$auth_token = $data->auth_token;
    $first_name = $data->first_name;
    $last_name = $data->last_name;
    $email = $data->email;
    $address = $data->address; 

    // $auth_email = "rahulmjain154@gmail.com";
	// $auth_token = "d2abdc034c8035de05f41e88d422be1d";
    // $first_name = "Rahul";
    // $last_name = "Jain";
    // $email = "rahulmjain154@gmail.com";
    // $address = "Udaipur"; 

	$obj = new User();
    $data = $obj->dbCheck($auth_email,$auth_token);		
	
	// var_dump($data);
    // var_dump($data[0]['id']);
	// die();

    $created_by = $data[0]['id'];

	if($obj->CreatedOrNot)
	{	
        $obj2 = new User();
        $obj2->dbCreateUser($created_by,$first_name,$last_name,$email,$address);		

        // var_dump($obj2);
        // die();

        if($obj2->CreatedOrNot)
        {	        
		$myObj->valid=true;
		$myObj->value= array("msg"=>"User is successfully created.");
		echo json_encode($myObj);
        }
        else{
            $myObj->valid=false;
		    $myObj->value = array("msg"=>"Something went wrong!");		
		    echo json_encode($myObj);
        }
	}
	else
	{
		$myObj->valid=false;
		$myObj->value = array("msg"=>"token mismatch!");		
		echo json_encode($myObj);
	}
}
?>