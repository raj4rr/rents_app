<!-- Edit -->
<div class="modal fade" id="edit_<?php echo $row['que_id']; ?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <center><h4 class="modal-title" id="myModalLabel">Edit questions</h4></center>
            </div>
            <div class="modal-body">
			<div class="container-fluid">
			<form method="POST" action="questions_edit.php">
				<input type="hidden" class="form-control" name="test_id" value="<?php echo $test_id; ?>" required>
				<input type="hidden" class="form-control" name="id" value="<?php echo $row['que_id']; ?>">
				<input type="hidden" class="form-control" name="sub_id" value="<?php echo $sub_id; ?>" required>
				<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">questions:</label>
					</div>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="que_desc" value="<?php echo $row['que_desc']; ?>">
					</div>
				</div>
				<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">Answer-1:-</label>
					</div>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="ans1" value="<?php echo $row['ans1']; ?>">
					</div>
				</div>
					<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">Answer-2:-</label>
					</div>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="ans2" value="<?php echo $row['ans2']; ?>">
					</div>
				</div>
					<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">Answer-3:-</label>
					</div>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="ans3" value="<?php echo $row['ans3']; ?>">
					</div>
				</div>
					<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">Answer-4:-</label>
					</div>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="ans4" value="<?php echo $row['ans4']; ?>">
					</div>
				</div>
					<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">True Answer:-</label>
					</div>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="true_ans" value="<?php echo $row['true_ans']; ?>">
					</div>
				</div>
            </div> 
			</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
                <button type="submit" name="edit" class="btn btn-success"><span class="glyphicon glyphicon-check"></span> Update</a>
			</form>
            </div>

        </div>
    </div>
</div>

<!-- Delete -->
<div class="modal fade" id="delete_<?php echo $row['que_id']; ?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <center><h4 class="modal-title" id="myModalLabel">Delete questions</h4></center>
            </div>
            <div class="modal-body">	
            	<p class="text-center">Are you sure you want to Delete</p>
				<h2 class="text-center"><?php echo $row['que_desc']; ?></h2>
			</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
                <a href="questions_delete.php?id=<?php echo $row['que_id']; ?>&test_id=<?php echo $test_id; ?>&sub_id=<?php echo $sub_id; ?>" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span> Yes</a>
            </div>

        </div>
    </div>
</div>
