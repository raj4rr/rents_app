<?php
// Redirect to our single, centralized database configuration file
include_once(__DIR__ . '/database.php');

// Maintain backwards compatibility for legacy variables that some scripts might rely on
global $CONFIG;
if (!isset($CONFIG)) {
    $CONFIG = array();
}

$CONFIG['CORE_PATH'] = '';
$CONFIG['MYSQL_USER'] = 'root';
$CONFIG['MYSQL_HOST'] = 'localhost';
$CONFIG['MYSQL_USER_PASSWORD'] = '';
$CONFIG['MYSQL_DATABASE'] = 'u978544338_r4rmain';

$CONFIG['SourceCode_MYSQL_HOST'] = 'localhost';
$CONFIG['SourceCode_USER'] = 'root';
$CONFIG['SourceCode_PASSWORD'] = '';
$CONFIG['SourceCode_DATABASE'] = 'sourscode';

$pdos = $pdo;
?>
