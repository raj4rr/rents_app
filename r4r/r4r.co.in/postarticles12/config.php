<?Php
$host_name = "localhost";
$database = "r4rcoin"; // Change your database nae
$username = "db_shashir4r";          // Your database user id 
$password = "R%^&*(IUYT";          // Your password

//////// Do not Edit below /////////
try {
$pdo = new PDO('mysql:host='.$host_name.';dbname='.$database, $username, $password);
} catch (PDOException $e) {
print "Error!: " . $e->getMessage() . "<br/>";
die();
}
?>