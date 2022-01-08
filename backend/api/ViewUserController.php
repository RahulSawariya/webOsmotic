<?php
	include("../model/UserModel.php");
	if($_SERVER['REQUEST_METHOD']==='OPTIONS')
	{
		return 0;
	}
	else 
	{
	// error_reporting(0);
	$data = json_decode(file_get_contents("php://input"));
	
	$myObj=(object)null;

    $auth_email = $data->auth_email;
	$auth_token = $data->auth_token;

    // $auth_email = "rahulmjain154@gmail.com";
	// $auth_token = "b05b64b135c654deacc33cf7c4a8aeb5";

	$obj = new User();
    $obj->dbCheck($auth_email,$auth_token);		
	
	// var_dump($data);
    // var_dump($data[0]['id']);
	// die();

    // $created_by = $data[0]['id'];

	if($obj->CreatedOrNot)
	{	
        $obj2 = new User();
        $data = $obj2->dbViewUser();		

        // var_dump($obj2);
        // var_dump($data);
        // die();

        if($obj2->CreatedOrNot)
        {	        
		$myObj->valid=true;
		$myObj->value= array("users"=>$data,"msg"=>"Authorized User");
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