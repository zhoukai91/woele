<?php
/*
*由main.html调用
*查询关键字，返回包含指定关键字的菜品
*/
header('Content-Type: application/json');
$output = [];

@$kw = $_REQUEST['kw'];
if(empty($kw)){
    echo "[]"; 
    return;    
}

//访问数据库
$conn = mysqli_connect('127.0.0.1','root','','woele');
$sql = 'SET NAMES utf8';
mysqli_query($conn, $sql);
$sql = "SELECT did,name,img_sm,material,price FROM wel_dish WHERE name LIKE '%$kw%' OR material LIKE '%$kw%'";
$result = mysqli_query($conn, $sql);
while( ($row=mysqli_fetch_assoc($result))!==NULL ){
    $output[] = $row;
}

echo json_encode($output);
?>