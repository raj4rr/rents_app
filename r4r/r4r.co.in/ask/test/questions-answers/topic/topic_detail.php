	<table style="width:100%; margin:10px 0px 0px 0px;">
	<tr>
		<td style="width:25%; vertical-align:top; padding:0px 4px 0px 5px;">
				<div id="right_menu">
					<div>Topic</div>
					<?php foreach($topic_list as $topiclist)
					{
					 if(isset($topiclist['topic_id']) && isset($topiclist['topic_name']))
					 {?>
					 	<a<?php if($_REQUEST['tp']==$topiclist['topic_id']){echo ' class="active"';$sub_category=$topiclist['topic_name'];}?> href="../topic/?ct=<?php echo $_REQUEST['ct'];?>&subct=<?php echo $_REQUEST['subct'];?>&tp=<?php echo $topiclist['topic_id'];?>" title="<?php echo $topiclist['topic_name'];?>">
							<?php echo $topiclist['topic_name'];?>
						</a>
					<?php }
					}?>
					</div>

<!-- r4rcoin -->

<!-- r4rcoin -->

		</td>
	</tr>

	</table>

