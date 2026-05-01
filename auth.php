<?php
include "db.php";

$headers = getallheaders();
$token = $headers['Authorization'];

$result = mysqli_query($conn, "SELECT * FROM users WHERE token='$token'");
$user = mysqli_fetch_assoc($result);

if (!$user) {
    echo json_encode(["status" => "unauthorized"]);
    exit;
}
?>