<?php
/*
*由myorder.html调用
*根据客户端提交的电话号码，返回其所有的订单
*/
header('Content-Type: application/json');
$output = [];

@$phone = $_REQUEST['phone'];
if(empty($phone)){
    echo "[]"; //若客户端未提交电话号码，则返回一个空数组，
    return;    //并退出当前页面的执行
}

//访问数据库
$conn = mysqli_connect('127.0.0.1','root','','woele');
$sql = 'SET NAMES utf8';
mysqli_query($conn, $sql);
$sql = "SELECT wel_order.oid,wel_order.user_name,wel_order.order_time,wel_dish.img_sm FROM wel_order,wel_dish WHERE wel_order.did=wel_dish.did AND wel_order.phone='$phone'";
$result = mysqli_query($conn, $sql);

while( ($row=mysqli_fetch_assoc($result))!==NULL ){
    $output[] = $row;
}

echo json_encode($output);
?>