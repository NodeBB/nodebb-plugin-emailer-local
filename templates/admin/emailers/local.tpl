<h1><i class="fa fa-envelope-o"></i> Emailer (Local)</h1>

<div class="row">
	<div class="col-lg-12">
		<blockquote>
			This plugin lets NodeBB send emails via an SMTP interface. Leave user and/or password empty if no authentication is required.
		</blockquote>
	</div>
</div>

<hr />

<form role="form" class="emailer-local-settings">
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
					<label>Connection security</label>
					<select name="security" class="form-control">
						<option value="NONE">None</option>
						<option value="STARTTLS">STARTTLS</option>
						<option value="ENCRYPTED">Encrypted</option>
					</select>
				</div>
			</div>
		</div>

		<button type="button" class="btn btn-lg btn-primary" id="save">Save</button>
	</fieldset>
</form>

<script type="text/javascript">
	require(['settings'], function(Settings) {
		Settings.load('emailer-local', $('.emailer-local-settings'));

		$('#save').on('click', function() {
			Settings.save('emailer-local', $('.emailer-local-settings'), function() {
				app.alert({
					alert_id: 'emailer-local',
					type: 'info',
					title: 'Settings Changed',
					message: 'Please reload your NodeBB to apply these changes',
					timeout: 5000,
					clickfn: function() {
						socket.emit('admin.reload');
					}
				});
			});
		});
	});
</script>
