<?php
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/database.php');

// Main PDO Connection (for new or updated files)
$dsn = "mysql:host=localhost;dbname=u978544338_r4rmain";
$user = "root";
$passwd = "";

try {
    $pdo = new PDO($dsn, $user, $passwd);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec("SET NAMES latin1");
} catch (PDOException $e) {
    die("Database connection failed.");
}

// -------------------------------------------------------------------
// LEGACY COMPATIBILITY LAYER
// Defines deprecated mysql_* functions using mysqli so legacy code runs
// -------------------------------------------------------------------

global $__mysqli_conn;

if (!function_exists('mysql_connect')) {
    function mysql_connect($server, $username, $password, $new_link = false, $client_flags = 0) {
        global $__mysqli_conn;
        // Force connection to local root for legacy scripts
        $__mysqli_conn = mysqli_connect("localhost", "root", "");
        mysqli_set_charset($__mysqli_conn, "utf8");
        return $__mysqli_conn;
    }
}

if (!function_exists('mysql_select_db')) {
    function mysql_select_db($database_name, $link_identifier = null) {
        global $__mysqli_conn;
        $conn = $link_identifier ? $link_identifier : $__mysqli_conn;

        // Try to select the requested DB. If it fails, fallback to u978544338_r4rmain.
        if (!mysqli_select_db($conn, $database_name)) {
            return mysqli_select_db($conn, "u978544338_r4rmain");
        }
        return true;
    }
}

if (!function_exists('mysql_query')) {
    function mysql_query($query, $link_identifier = null) {
        global $__mysqli_conn;
        $conn = $link_identifier ? $link_identifier : $__mysqli_conn;
        return mysqli_query($conn, $query);
    }
}

if (!function_exists('mysql_fetch_array')) {
    function mysql_fetch_array($result, $result_type = MYSQLI_BOTH) {
        return mysqli_fetch_array($result, $result_type);
    }
}

if (!function_exists('mysql_fetch_assoc')) {
    function mysql_fetch_assoc($result) {
        return mysqli_fetch_assoc($result);
    }
}

if (!function_exists('mysql_fetch_row')) {
    function mysql_fetch_row($result) {
        return mysqli_fetch_row($result);
    }
}

if (!function_exists('mysql_num_rows')) {
    function mysql_num_rows($result) {
        return mysqli_num_rows($result);
    }
}

if (!function_exists('mysql_insert_id')) {
    function mysql_insert_id($link_identifier = null) {
        global $__mysqli_conn;
        $conn = $link_identifier ? $link_identifier : $__mysqli_conn;
        return mysqli_insert_id($conn);
    }
}

if (!function_exists('mysql_error')) {
    function mysql_error($link_identifier = null) {
        global $__mysqli_conn;
        $conn = $link_identifier ? $link_identifier : $__mysqli_conn;
        return mysqli_error($conn);
    }
}

if (!function_exists('mysql_real_escape_string')) {
    function mysql_real_escape_string($unescaped_string, $link_identifier = null) {
        global $__mysqli_conn;
        $conn = $link_identifier ? $link_identifier : $__mysqli_conn;
        return mysqli_real_escape_string($conn, $unescaped_string);
    }
}

if (!function_exists('mysql_close')) {
    function mysql_close($link_identifier = null) {
        global $__mysqli_conn;
        $conn = $link_identifier ? $link_identifier : $__mysqli_conn;
        return mysqli_close($conn);
    }
}

?>
