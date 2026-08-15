

<?php
function r4r_calendar($year, $month, $days = array(), $day_name_length = 3,$first_day = 0){
	$first_of_month = gmmktime(0,0,0,$month,1,$year);
	$day_names = array(); 
	for($n=0,$t=(3+$first_day)*86400; $n<7; $n++,$t+=86400) 
		$day_names[$n] = ucfirst(gmstrftime('%A',$t)); 
	list($month, $year, $month_name, $weekday) = explode(',',gmstrftime('%m,%Y,%B,%w',$first_of_month));
	$weekday = ($weekday + 7 - $first_day) % 7; 
	$title   = htmlentities(ucfirst($month_name)).'&nbsp;'.$year.'<br> <table height=100 >
<tr height=15>';  
	$calendar = $title;
	if($day_name_length){ 
		foreach($day_names as $d)
			$calendar .='<th height=15><font size="1">'.htmlentities($day_name_length < 4 ? substr($d,0,$day_name_length) : $d).'</font></th>';
		$calendar .= "</tr><tr height=15>";
	}
	$countWeakday=$weekday;
	while($countWeakday > 0) {$calendar .= '<td height=15>&nbsp;&nbsp;</td>';$countWeakday--;}
	for($day=1,$days_in_month=gmdate('t',$first_of_month); $day<=$days_in_month; $day++,$weekday++){
		if($weekday == 7){
			$weekday   = 0; 
			$calendar .= "</tr><tr height=15>";
		}
		if(isset($days[$day]) and is_array($days[$day])){
			@list($link,$classes,$content) = $days[$day];
                      if(is_null($content))  $content  = $day;
                       $calendar .= '<td height=15><font size="1">'.htmlspecialchars($classes).$content.'</font></td>'; 
		}
		else $calendar .= '<td height=15><font size="1">'.$day.'</font></td>';
	}
	return $calendar;
}
$time = time();
$today = date('j',$time);
$days = array($today=>array(NULL,NULL,'<font style="color: red; font-weight: bold; font-size: larger; text-decoration: blink;">'.$today.'</font>'));
echo r4r_calendar(date('Y', $time), date('n', $time), $days).'</tr></font></table>';
?>
</font>

