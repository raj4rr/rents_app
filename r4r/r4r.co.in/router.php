<?php
// router.php - Router for PHP built-in development server

$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

// Handle root directory
if ($path == '/') {
    if (file_exists($_SERVER["DOCUMENT_ROOT"] . '/index.php')) {
        $path = '/index.php';
    } elseif (file_exists($_SERVER["DOCUMENT_ROOT"] . '/index.shtml')) {
        $path = '/index.shtml';
    }
} 
// Handle subdirectories
elseif (is_dir($_SERVER["DOCUMENT_ROOT"] . $path)) {
    $rpath = rtrim($path, '/');
    if (file_exists($_SERVER["DOCUMENT_ROOT"] . $rpath . '/index.php')) {
        $path = $rpath . '/index.php';
    } elseif (file_exists($_SERVER["DOCUMENT_ROOT"] . $rpath . '/index.shtml')) {
        $path = $rpath . '/index.shtml';
    } elseif (file_exists($_SERVER["DOCUMENT_ROOT"] . $rpath . '/index.html')) {
        $path = $rpath . '/index.html';
    }
}

$fullPath = $_SERVER["DOCUMENT_ROOT"] . $path;

if (file_exists($fullPath) && !is_dir($fullPath)) {
    $ext = pathinfo($fullPath, PATHINFO_EXTENSION);

    if (in_array(strtolower($ext), ['php', 'shtml', 'html'])) {
        // Change working directory to the script's directory so relative includes (like ../../) work correctly
        chdir(dirname($fullPath));
        include($fullPath);
        return true;
    }

    // Return false to let the built-in server handle static files (images, css, etc.)
    return false;
}

// If file not found, let the server return a 404
return false;
