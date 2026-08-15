<!-- Add New -->
<div class="modal fade" id="addnew" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <center><h4 class="modal-title" id="myModalLabel">Add New Question</h4></center>
            </div>
            <div class="modal-body">
			<div class="container-fluid">
			<form method="POST" action="questions_add.php">
				<input type="hidden" class="form-control" name="test_id" value="<?php echo $test_id; ?>" required>
				<input type="hidden" class="form-control" name="sub_id" value="<?php echo $sub_id; ?>" required>
				<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">Enter Question</label>
					</div>
					<div class="col-sm-10">
						<textarea name="que_desc" cols="60" rows="2" id="que_desc" required></textarea>
					</div>
				</div>

				<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">Answer-1</label>
					</div>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="ans1" required>
					</div>
				</div>
				<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">Answer-2</label>
					</div>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="ans2" required>
					</div>
				</div>
				<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">Answer-3</label>
					</div>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="ans3" required>
					</div>
				</div>
				<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">Answer-4</label>
					</div>
					<div class="col-sm-10">
						<input type="text" class="form-control" name="ans4" required>
					</div>
				</div>
				<div class="row form-group">
					<div class="col-sm-2">
						<label class="control-label modal-label">True Answer:</label>
					</div>
					<div class="col-sm-10">
						<select class="form-control" name="true_ans" required >
							<option value="">Select True Answer</option>
							<option>1</option>
							<option>2</option>
							<option>3</option>
							<option>4</option>
						</select>
					</div>
				</div>

            </div> 
			</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal"><span class="glyphicon glyphicon-remove"></span> Cancel</button>
                <button type="submit" name="add" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk"></span> Save</a>
			</form>
            </div>

        </div>
    </div>
</div>
