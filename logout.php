<?php
include "auth.php"; // already validates token & gets $user

// Remove token from database
mysqli_query($conn, "UPDATE users SET token=NULL WHERE id=".$user['id']);

echo json_encode([
    "status" => "success",
    "message" => "Logged out successfully"
]);
?>