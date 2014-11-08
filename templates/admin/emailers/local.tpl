<h1><i class="fa fa-envelope-o"></i> Emailer - SMTP</h1>

<div class="row">
	<div class="col-lg-12">
		<blockquote>
			This plugin lets NodeBB send emails via an SMTP interface.
		</blockquote>
	</div>
</div>

<hr />

<form role="form" class="SMTP-settings">
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
					<label for="from">From address</label>
					<input type="from" class="form-control" id="from" name="from" />
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
	require(['settings'], function(Settings) {
		var wrapper = $('.SMTP-settings');

		Settings.load('SMTP-settings', wrapper);
		
		$('#save').click(function(event) {
			Settings.save('SMTP-settings', wrapper, function() {
				app.alert({
					type: 'success',
					alert_id: 'SMTP-settings',
					title: 'Reload Required',
					message: 'Please reload your NodeBB to have your changes take effect',
					clickfn: function() {
						socket.emit('admin.reload');
					}
				})
			});
		});
	});
</script>
