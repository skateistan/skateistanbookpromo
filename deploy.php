<?php
  error_reporting(0);

  $ip = $_SERVER['REMOTE_ADDR'];
  $github_ips = array('207.97.227.253', '50.57.128.197', '108.171.174.178');
  $p = json_decode($_REQUEST['payload']);

  # Request must be made from GitHub and we only want to deploy master
  if (in_array($ip, $github_ips) && $p->ref === 'refs/heads/master') {
    `git pull -f origin master`;
  }
?>