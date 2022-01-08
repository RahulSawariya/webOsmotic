<?php include("DbOperationModel.php"); ?>
<?php

class Auth extends DbOperation
{
    var $CreatedOrNot=0;

    function dbSignupQuery($email,$password,$token)
	{
		$objDbOperation = new DbOperation();

		$columnsName = "`email`,`password`,`token`";
		//database column name
		$tablesName = "auth";
		//database table name
		$conditions = "'" . $email . "','" . $password . "','" . $token . "'";
		// conditions, what we want to apply
		$result = $objDbOperation->dbInsert($columnsName, $tablesName, $conditions);
		// var_dump($result);
		// die();
		if ($result) {
			$this->CreatedOrNot = 1;
		}
	}

    function dbSigninQuery($email,$password,$token)
	{
		$objDbOperation = new DbOperation();

		$columnsName = "`token`='".$token."'";
		//database column name
		$tablesName = "auth";
		//database table name
		// $conditions = "'" . $email . "','" . $password . "','" . $token . "'";
        $conditions = "email = '" . $email . "' AND password='" . $password . "'";
        // conditions, what we want to apply
		$result = $objDbOperation->dbUpdate($columnsName, $tablesName, $conditions);
		
        // var_dump($result);

        if ($result) {
            $this->CreatedOrNot = 1;
        }
        
	}
}
?>