<?php
	error_reporting(0);

	$ip = $_SERVER['REMOTE_ADDR'];
	$github_cidrs = array('204.232.175.64/27', '192.30.252.0/22');
	$p = json_decode($_REQUEST['payload']);
	
	#Is the request made from Github?
	function isitgithub($ip, $cidr) {		 
		$parts = explode('/', $cidr);
		$ipc = explode('.', $parts[0]);
		foreach ($ipc as &$v)
			$v = str_pad(decbin($v), 8, '0', STR_PAD_LEFT);
		$ipc = substr(join('', $ipc), 0, $parts[1]);
		$ipu = explode('.', $ip);
		foreach ($ipu as &$v)
			$v = str_pad(decbin($v), 8, '0', STR_PAD_LEFT);
		$ipu = substr(join('', $ipu), 0, $parts[1]);
		return $ipu == $ipc;
	}
	
	$validaddr = false;
	foreach ($github_cidrs as $addr)
		if (isitgithub($ip, $addr)) {
			$validaddr = true;
			break;
		}

	# Request must be made from GitHub and we only want to deploy master
	if ($validaddr == 'true' && $p->ref === 'refs/heads/master') {
		`git fetch --all && git reset --hard origin/master`;
	}
 ?>