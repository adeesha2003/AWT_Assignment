<?php
include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$password = $data['password'];

$result = mysqli_query($conn, "SELECT * FROM users WHERE username='$username'");
$user = mysqli_fetch_assoc($result);

if ($user && password_verify($password, $user['password'])) {

    $token = bin2hex(random_bytes(16));

    mysqli_query($conn, "UPDATE users SET token='$token' WHERE id=".$user['id']);

    echo json_encode([
        "status" => "success",
        "token" => $token
    ]);

} else {
    echo json_encode(["status" => "error"]);
}
?>