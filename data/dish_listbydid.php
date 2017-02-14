<?php
/*
*由detail.html调用
*/
header('Content-Type: application/json');
$output = [];

@$did = $_REQUEST['did'];
if(empty($did)){
    echo "[]"; //若客户端未提交菜品编号，则返回一个空数组，
    return;    
}

//访问数据库
$conn = mysqli_connect('127.0.0.1','root','','woele');
$sql = 'SET NAMES utf8';
mysqli_query($conn, $sql);
$sql = "SELECT did,name,img_lg,material,detail,price FROM wel_dish WHERE did=$did";
$result = mysqli_query($conn, $sql);
if( ($row=mysqli_fetch_assoc($result))!==NULL ){
    $output[] = $row;
}

echo json_encode($output);
?>