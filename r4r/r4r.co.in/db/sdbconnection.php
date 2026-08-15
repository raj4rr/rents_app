<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

require_once dirname(__FILE__) . '/../config/site_config.php';

$sconnection = mysql_connect($CONFIG['SourceCode_MYSQL_HOST'],$CONFIG['SourceCode_USER'],$CONFIG['SourceCode_PASSWORD']);
mysql_select_db($CONFIG['SourceCode_DATABASE'],$sconnection);

?>
