<?php
include "auth.php";

$result = mysqli_query($conn, "SELECT * FROM tasks WHERE user_id=".$user['id']);

$tasks = [];

while ($row = mysqli_fetch_assoc($result)) {
    $tasks[] = $row;
}

echo json_encode($tasks);
?>