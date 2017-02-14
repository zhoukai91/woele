<?php
/*
*由main.html调用
*分页返回后续的5条菜品
*/
header('Content-Type: application/json');
$output = [];


$count = 5;  //一次最多返回的记录条数
@$start = $_REQUEST['start']; 
if( empty($start) ){        
    $start = 0;
}

//访问数据库
$conn = mysqli_connect('127.0.0.1','root','','woele');
$sql = 'SET NAMES utf8';
mysqli_query($conn, $sql);
$sql = "SELECT did,name,img_sm,material,price FROM wel_dish LIMIT $start,$count";
$result = mysqli_query($conn, $sql);
while( ($row=mysqli_fetch_assoc($result))!==NULL ){
    $output[] = $row;
}

echo json_encode($output);
?>