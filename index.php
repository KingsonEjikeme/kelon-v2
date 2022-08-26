<?php
session_start();

$errors = [];
$data = [];
$database = "kelon";
$username = "root";
$password = "";
$host = "localhost";

$connection = mysqli_connect($host, $username, $password, $database);

if (isset($_POST['action'])) {
    if ($_POST['action'] == 'createEmployer') {
        $firstname = $_POST['firstname'];
        $lastname = $_POST['lastname'];
        $email = $_POST['email'];
        $pass = $_POST['password'];
        $phone = $_POST['phone'];
        $company_name = $_POST['company_name'];
        $city = $_POST['city'];
        $state = $_POST['state'];
        $industry = $_POST['industry'];

        $query = "INSERT INTO `recruiters` (`firstname`, `lastname`, `email`, `password`, `phone`, `company_name`, `city`, `state`, `industry`) VALUES ('$firstname', '$lastname', '$email', '$pass', '$phone', '$company_name', '$city', '$state', '$industry')";
        $result = mysqli_query($connection, $query);
        $data['message'] = $result;
    } else if ($_POST['action'] == 'employerSignin') {
        $email = $_POST['email'];
        $pass = $_POST['password'];
        $query = "SELECT * FROM `recruiters` WHERE `email`='$email' and `password`='$pass'";
        $result = mysqli_query($connection, $query);
        $r = mysqli_fetch_assoc($result);
        $_SESSION['user'] = $r;
        $data['message'] = $r;
    } else if ($_POST['action'] == 'emProfile') {

        $data['message'] = $_SESSION['user'];
    } else if ($_POST['action'] == 'emJobs') {

        // $data['message'] = $_SESSION['user'];
        $recruiter_id = $_SESSION['user']['recruiter_id'];
        $query = "SELECT * FROM `jobs` where `recruiter_id`='$recruiter_id'";
        $result = mysqli_query($connection, $query);

        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $records[] = $row;
            }
            $data["status"] = true;
            $data["message"] = $records[0];
        }
        $r = $records;
        $data['message'] = $r;
    } else if ($_POST['action'] == 'viewSingleJob') {
        $job_id = $_POST['job_id'];
        $query = "SELECT * FROM `jobs` where `job_id`='$job_id'";
        $result = mysqli_query($connection, $query);
        $records = mysqli_fetch_assoc($result);
        $data['message'] = $records;
    } else if ($_POST['action'] == 'deleteJob') {
        $job_id = $_POST['job_id'];
        $query = "DELETE FROM `jobs` where `job_id`='$job_id'";
        $result = mysqli_query($connection, $query);
        $records = mysqli_fetch_assoc($result);
        $data['message'] = $records;
    } else if ($_POST['action'] == 'adminSignin') {
        $email = $_POST['email'];
        $pass = $_POST['password'];
        $query = "SELECT * from `admins` where `email`='$email' and `password`='$pass'";
        $result = mysqli_query($connection, $query);
        $records = mysqli_fetch_assoc($result);
        $data['message'] = $records;
        $_SESSION['admin'] = $email;
    } else if ($_POST['action'] == 'adminJobs') {
        $email = $_POST['email'];
        $query = "SELECT * from `jobs`";
        $result = mysqli_query($connection, $query);

        if (mysqli_num_rows($result) > 0) {
            while ($row = mysqli_fetch_assoc($result)) {
                $records[] = $row;
            }
            $data["status"] = true;
            $data["message"] = $records;
        }
    } else if ($_POST['action'] == 'adDeleteJob') {
        $job_id = $_POST['job_id'];
        $query = "DELETE from `jobs` where `job_id`='$job_id'";
        $result = mysqli_query($connection, $query);
        $data["message"] = $result;
    } else if ($_POST['action'] == 'emCreateJob') {
        $job_title = $_POST['job_title'];
        $company_name = $_POST['company_name'];
        $salary = $_POST['salary'];
        $type = $_POST['type'];
        $location = $_POST['location'];
        $requirements = $_POST['requirements'];
        $application_deadline = $_POST['application_deadline'];
        $date_posted = $_POST['date_posted'];
        $recruiter_id = $_SESSION['user']['recruiter_id'];

        $query = "INSERT INTO `jobs` (`job_title`,`salary`,`type`,`location`,`company_name`,`requirements`,`application_deadline`,`recruiter_id`,`date_posted`) VALUES ('$job_title','$salary','$type','$location','$company_name','$requirements','$application_deadline','$recruiter_id','$date_posted')";
        $result = mysqli_query($connection, $query);
        $data["message"] = $result;
    } else if ($_POST['action'] == 'emDeleteJob') {
        $job_id = $_POST['job_id'];
        $query = "DELETE from `jobs` where `job_id`='$job_id'";
        $result = mysqli_query($connection, $query);
        $data["message"] = $result;
    } else if ($_POST['action'] == 'emSignout') {
        unset($_SESSION['user']);
        $data["message"] = $result;
    }
}







echo json_encode($data);
exit();
