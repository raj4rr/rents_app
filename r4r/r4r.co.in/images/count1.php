<?php

if (file_exists('hitcounter.txt')) 
{
$fil = fopen('hitcounter.txt', r);
$dat = fread($fil, filesize('hitcounter.txt')); 

$my_img = imagecreate( 80, 20 );
$background = imagecolorallocate( $my_img, 0, 0, 255 );
$text_colour = imagecolorallocate( $my_img, 255, 255, 0 );
$line_colour = imagecolorallocate( $my_img, 128, 255, 0 );
imagestring( $my_img, 6, 5, 5, $dat+1,$text_colour );
imagesetthickness ( $my_img, 5 );
header( "Content-type: image/png" );
imagepng( $my_img );
imagecolordeallocate( $line_color );
imagecolordeallocate( $text_color );
imagecolordeallocate( $background );
imagedestroy( $my_img );

echo $dat+1;
fclose($fil);
$fil = fopen('hitcounter.txt', w);
fwrite($fil, $dat+1);
}
else
{

}

?>
