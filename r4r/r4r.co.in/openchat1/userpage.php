<?php 
$userName=isset($_SESSION['userName']); 
?>
<a href="/">Home</a>
<?php if($userName!='Guest' && userName==''){ ?>

<a href="logout.php">Logout</a></p>

<?php 

echo '<b>Welcome:</b>'.isset($_SESSION['userName']);
echo '<a href="?chatwith=all">OpenChat</a> || ';
echo '<a href="?chatwith=frd">Chat with friends</a> || ';
echo '<a href="?chatwith=gst">Chat with Guest</a>';
 } else {?>
||<a href="login.shtml">Login</a>||<a href="NewUser.shtml">New User</a>
||<a href="logout.php">Refresh</a>

<?php } ?>
