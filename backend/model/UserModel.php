<?php include("DbOperationModel.php"); ?>
<?php

class User extends DbOperation
{
    var $CreatedOrNot=0;

    function  dbCheck($auth_email,$auth_token)
    {
        $this->CreatedOrNot = 0;
        $objDbOperation = new DbOperation();

        $columnsName = "`id`";
        //database column name
        $tablesName = "auth";
        //database table name
        $conditions = "email = '" . $auth_email . "' AND token='" . $auth_token . "'";
        // conditions, what we want to apply
        $data = $objDbOperation->dbSelect($columnsName, $tablesName, $conditions);

        // var_dump($data);

        $result = array();

        while ($dataresult = mysqli_fetch_assoc($data)) {
            array_push($result, $dataresult);
        }

        if (mysqli_num_rows($data)) {
            $this->CreatedOrNot = 1;
            // $this->check = 1;
        }
     
        // var_dump($result);
        return $result;
    }

    function dbCreateUser($created_by,$first_name,$last_name,$email,$address)
	{
		$objDbOperation = new DbOperation();

		$columnsName = "`created_by`,`first_name`,`last_name`,`email`,`address`";
		//database column name
		$tablesName = "user";
		//database table name
		$conditions = "'" . $created_by . "','" . $first_name . "','" . $last_name . "','". $email ."','". $address ."'";
		// conditions, what we want to apply
		$result = $objDbOperation->dbInsert($columnsName, $tablesName, $conditions);
		// var_dump($result);
		// die();
		if ($result) {
			$this->CreatedOrNot = 1;
		}
	}

    function  dbViewUser()
    {
        $this->CreatedOrNot = 0;
        $objDbOperation = new DbOperation();

        $columnsName = "`id`,`first_name`,`last_name`,`email`,`address`";
        //database column name
        $tablesName = "user";
        //database table name
        $conditions = "status = 1";
        // conditions, what we want to apply
        $data = $objDbOperation->dbSelect($columnsName, $tablesName,$conditions);

        // var_dump($data);

        $result = array();

        while ($dataresult = mysqli_fetch_assoc($data)) {
            array_push($result, $dataresult);
        }

        if (mysqli_num_rows($data)) {
            $this->CreatedOrNot = 1;
            // $this->check = 1;
        }
     
        // var_dump($result);
        return $result;
    }

    function dbEditUser($user,$edited_by,$first_name,$last_name,$email,$address)
	{
		$objDbOperation = new DbOperation();

		$columnsName = "`edited_by`='".$edited_by."',`first_name`='".$first_name."',`last_name`='".$last_name."',`email`='".$email."',`address`='".$address."'";
		//database column name
		$tablesName = "user";
		//database table name
		// $conditions = "'" . $email . "','" . $password . "','" . $token . "'";
        $conditions = "id = '" . $user . "'";
        // conditions, what we want to apply
		$result = $objDbOperation->dbUpdate($columnsName, $tablesName, $conditions);
		
        // var_dump($result);

        if ($result) {
            $this->CreatedOrNot = 1;
        }
        
	}

    function dbDeleteUser($user,$edited_by)
	{
		$objDbOperation = new DbOperation();

		$columnsName = "`edited_by`='".$edited_by."',`status`=0";
		//database column name
		$tablesName = "user";
		//database table name
		// $conditions = "'" . $email . "','" . $password . "','" . $token . "'";
        $conditions = "id = '" . $user . "'";
        // conditions, what we want to apply
		$result = $objDbOperation->dbUpdate($columnsName, $tablesName, $conditions);
		
        // var_dump($result);

        if ($result) {
            $this->CreatedOrNot = 1;
        }
        
	}

}
?>