<?php
require 'include/init.php';

Auth::logout();
Url::redirect('/blogs/'); // will not work not root location
// header("location:index.php");

?>
