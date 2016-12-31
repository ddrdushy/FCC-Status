<?php
    $a=$_GET['uname'];
    echo $a;
    echo '</br>';


$url_link = "https://www.freecodecamp.com/".$a;
// Create DOM from URL


$homepage = file_get_contents($url_link);
$regex='/var\scalendar\s=\s\{(.*?)\}/';

preg_match_all($regex, $homepage, $matches);
//  echo $homepage;

print_r($matches);

?>