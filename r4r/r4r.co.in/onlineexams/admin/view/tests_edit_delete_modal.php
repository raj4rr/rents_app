<!-- Edit -->
<div class="modal fade" id="edit_<?php echo $row['test_id']; ?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <center><h4 class="modal-title" id="myModalLabel">Edit Test</h4></center>
            </div>
            <div class="modal-body">
			<div class="container-fluid">
			<form method="POST" action="test_edit.php">
				<input type="hidden" class="form-control" name="sub_id" value="<?php echo $sub_id; ?>" required>
				<input type="hidden" class="form-control" name="id" value="<?php echo $row['test_id']; ?>">

				<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">Test Paper Name</label>
					</div>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="test_name" value="<?php echo $row['test_name']; ?>">
					</div>
				</div>
					<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">Question Count</label>
					</div>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="total_que" value="<?php echo $row['total_que']; ?>">
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
<div class="modal fade" id="delete_<?php echo $row['test_id']; ?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <center><h4 class="modal-title" id="myModalLabel">Delete Test</h4></center>
            </div>
            <div class="modal-body">	
            	<p class="text-center">Are you sure you want to Delete</p>
				<h2 class="text-center"><?php echo $row['test_name']; ?></h2>
			</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
                <a href="test_delete.php?id=<?php echo $row['test_id']; ?>&sub_id=<?php echo $sub_id; ?>" class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span> Yes</a>
            </div>

        </div>
    </div>
</div>
