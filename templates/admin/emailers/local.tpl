<h1><i class="fa fa-envelope-o"></i> Emailer - SMPT</h1>

<div class="row">
	<div class="col-lg-12">
		<blockquote>
			This plugin lets NodeBB send emails via an SMTP interface.
		</blockquote>
	</div>
</div>

<hr />

<form role="form" class="smpt-settings">
	<fieldset>
		<div class="row">
			<div class="col-sm-12">
				<div class="form-group">
					<label for="host">Host</label>
					<input type="text" class="form-control" id="host" name="host" />
				</div>
			</div>
			<div class="col-sm-12">
				<div class="form-group">
					<label for="port">Port</label>
					<input type="text" class="form-control" value="25" id="port" name="port" />
				</div>
			</div>
			<div class="col-sm-12">
				<div class="form-group">
					<label for="username">User</label>
					<input type="text" class="form-control" id="username" name="username" />
				</div>
			</div>
			<div class="col-sm-12">
				<div class="form-group">
					<label for="password">Password</label>
					<input type="password" class="form-control" id="password" name="password" />
				</div>
			</div>
			<div class="col-sm-12">
				<div class="form-group">
					<label>
						<input type="checkbox" class="form-control" id="ssl" name="ssl" /> Use SSL
					</label>
				</div>
			</div>
		</div>

		<button class="btn btn-lg btn-primary" id="save">Save</button>
	</fieldset>
</form>

<script type="text/javascript">
	require(['settings'], function(settings) {
		var wrapper = $('.smpt-settings');
		settings.sync('smpt-settings', wrapper);
		
		$('#save').click(function(event) {
		    event.preventDefault();
		    settings.persist('smpt-settings', wrapper, function() {
		        socket.emit('admin.settings.smptserver');
		    });
		});
	});
</script>
