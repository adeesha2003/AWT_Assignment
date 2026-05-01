<?php
include "auth.php";

$data = json_decode(file_get_contents("php://input"), true);

$task = $data['task'];

mysqli_query($conn, "INSERT INTO tasks (user_id, task) VALUES (".$user['id'].", '$task')");

echo json_encode(["status" => "task added"]);
?>