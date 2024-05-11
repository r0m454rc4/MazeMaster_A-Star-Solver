<?php
header('Access-Control-Allow-Origin: *');

// Here I get the sended data from the fetch.
$formData = file_get_contents("php://input");
$formDataDec = json_decode($formData, true);

// $formDataDec["filename"] is to get the data, in this case filename from the associative array.
$filename = $formDataDec["filename"];
$data = $formDataDec["data"];

$target_path = "./Mazes/";
$target_path = $target_path . basename($filename);

// mb_convert_encoding($data, "UTF-8") is to convert the data to utf-8, as utf8_decode() is deprecated.
if (file_put_contents($target_path, mb_convert_encoding($data, "UTF-8")) != false) {
  header('Content-type: application/json');
  $response = ['success' => true, 'message' => 'Upload and move success'];
  echo json_encode($response);
} else {
  header('Content-type: application/json');
  $response = ['success' => false, 'message' => 'There was an error uploading the file, please try again!'];
  echo json_encode($response);
}
