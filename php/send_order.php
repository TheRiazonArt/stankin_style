<?php
// send_order.php

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$orderDetails = $data['orderDetails'];

$subject = "Новый заказ";
$message = "Список товаров из корзины:n$orderDetails";

// Отправляем почту
if (mail($email, $subject, $message)) {
    echo json_encode(['message' => 'Заказ успешно оформлен!']);
} else {
    echo json_encode(['message' => 'Ошибка при оформлении заказа.']);
}
?>