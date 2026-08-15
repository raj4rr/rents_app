<?php
include("connect.php");
 include('menu.php');
?>
<link href="/css/main.css" rel="stylesheet" type="text/css" />

<link rel="stylesheet" href="style.css" type="text/css"/>

	<td style="60%">

                        	<!-- Header End-->	
                         <div class="main_content">
							 <div id="content">
 <?php
if(isset($_GET['categoryname'])) {
	$categoryname=$_GET['categoryname'];
	$result=mysqli_query($conn,"SELECT*FROM videos where categoryname='$categoryname' and status=1 order by id desc");
}else 
 $result=mysqli_query($conn,"SELECT*FROM videos where status=1  order by id desc");
 while($row=$result->fetch_array()){?>
	<table><tr><td colspan="2"><h3><?php echo $row['title'];?></h3></td></tr>
	<tr><td>
<div id="video_player_box"> 

  <video id="video" width="300" height="200" controls>
  <source src="<?php echo '../admin/videos/videos/'.$row['name'];?>" type="video/<?php echo $row['type'];?>">
    Your browser does not support the video tag.
</video>

</div>
</td>
<td><h4><?php echo $row['categoryname'];?></h4>
<h4><?php echo $row['vdesc'];?></h4>
</td>
</tr>
 </table>
  <?php }?>
  </div>

   <!--Footer  -->
                        </td>
                    </tr>
            	</table>
            </td>
           </tr>

        </table>
    </div>

    <div class="footer">
    	 <div class="footer_inner">
         <table cellpadding="10px;">
         	<tr>
                <td>
                	<p class="heading">Languages</a></p>
                    <p class="topic"><a href="/java/">JAVA Technology </a></p>
                   	<p class="topic"><a href="/php/">PHP Language</a></p>
                    <p class="topic"><a href="/c1/01/tutorial/csharp/">C# Language</a></p>
                   	<p class="topic"><a href="/cpp/basic_tutorials/01/">C++ Language</a></p>
					<p class="topic"><a href="/c/">C Language</a></p>
                </td>
                <td>
                	<p class="heading">Frameworks</p>
                    <p class="topic"><a href="/java/spring/basic/tutorial/spring2.5/">Spring Framework</a></p>
                   	<p class="topic"><a href="/java/struts/basic/tutorial/struts2.0/">Struts Framework</a></p>
                    <p class="topic"><a href="/asp.net/01/tutorial/asp.net/">.Net Framework</a></p>
                   	<p class="topic"><a href="/java/hibernate/basic/tutorial/hibernate-basic-tutorials/">Hibernate Framework</a></p>
					<p class="topic"><a href="/ado.net/01/tutorial/ado.net/index.shtml">ADO.Net Framework</a></p>
                </td>
                <td>
                	<p class="heading">Web / Design</p>
                    <p class="topic"><a href="/html/">Hypertext Markup Language</a></p>
                   	<p class="topic"><a href="/xml/">Extensible Markup Language</a></p>
                    <p class="topic"><a href="/javascript/">Java Scripting Language</a></p>
                   	<p class="topic"><a href="/css/">Cascading Style Sheet</a></p>
					<p class="topic"><a href="/css/">Asynchronous Javascript &amp; Xml</a></p>
                </td>
                <td><p class="heading">Mobile Technology</p>
                	<p class="topic"><a href="/java/android/basic/tutorial/Android/">Android Technology</a></p>
					<p class="topic"><a href="/java/android/Android_Interview_Questions_And_Answers/">Android FAQS</a></p>
                   	<p class="topic"><a href="/java/j2me/basic/tutorial/j2me/">J2ME(Java Micro Edittion)</a></p>
					<p class="topic"><a href="/java/j2me/basic/example/Mobile_Servlet/">J2ME Example</a></p>
						<p class="topic"><a href="/java/j2me/J2ME_Interview_Questions_And_Answers/">J2ME FAQS</a></p>
                </td>
                <td><p class="heading">Sql &amp; Technology </p> 
                    <p class="topic"><a href="/sql/01/tutorial/basics/">SQL Server</a></p>
					  <p class="topic"><a href="/java/servlet/basic/tutorial/Servlet/">Servlet Technology</a></p>
					    <p class="topic"><a href="/java/jsp/">Jsp Technology</a></p>  
						<p class="topic"><a href="/webservice/01/tutorial/basic/">Web Services</a></p>
						  <p class="topic"><a href="/testing/basic-testing/">Testing Tutorial</a></p>
                   	</td>

                <td style="width:10%;"><p class="heading">R4R</p> 
                	<p class="topic"><a href="/profile/index.shtml">About Us</a></p>
                   	<p class="topic"><a href="/profile/contact_us.shtml">Contact Us</a></p>
                    <p class="topic"><a href="/profile/">Policy</a></p>
                   	<p class="topic"><a href="/profile/">T & C</a></p>
                    <p class="topic"><a href="/profile/careers.shtml">Career</a></p>
                </td>
         	</tr>
         </table>
         </div>
         <div class="site_footer">
         	<div class="copyright">Copyright &copy;2014-15 r4r.co.in, all rights reserved.</div>
            <div class="copyright"><a href="/sitemap.xml">Sitemap</a></div>
             <div class="copyright"><a href="/profile/careers.shtml">Career</a></div>
             <div class="copyright"><a href="/profile/feedback.shtml">Post comment</a></div>
             <div class="copyright"><a href="/profile/index.shtml">About us</a></div>
         </div>
    </div>

    	<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-3662367-1', 'auto');
ga('send', 'pageview');

        </script>

</BODY>
</HTML>
