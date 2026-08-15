<?php
if (file_exists('hitcounter.txt')) 
{
$fil = fopen('hitcounter.txt', r);
$dat = fread($fil, filesize('hitcounter.txt')); 
echo $dat+1;
fclose($fil);
$fil = fopen('hitcounter.txt', w);
fwrite($fil, $dat+1);
}
?>
