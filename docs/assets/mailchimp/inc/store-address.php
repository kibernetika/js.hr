<?php// // ----------------------------------------------------------------------------------------------------// // - Display Errors// // ----------------------------------------------------------------------------------------------------// ini_set('display_errors', 'On');// ini_set('html_errors', 0);// // ----------------------------------------------------------------------------------------------------// // - Error Reporting// // ----------------------------------------------------------------------------------------------------// error_reporting(-1);/*///////////////////////////////////////////////////////////////////////Part of the code from the bookBuilding Findable Websites: Web Standards, SEO, and Beyondby Aarron Walter (aarron@buildingfindablewebsites.com)http://buildingfindablewebsites.comDistrbuted under Creative Commons licensehttp://creativecommons.org/licenses/by-sa/3.0/us////////////////////////////////////////////////////////////////////////*/function storeAddress() {	// Validation	if (empty($_REQUEST['email'])) {		return "No email address provided";	}	if(!preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*$/i", $_REQUEST['email'])) {		return "Email address is invalid";	}	// grab an API Key from http://admin.mailchimp.com/accoun	1`t/api/	$api_key = 'your-api-code-here';	// grab your List's Unique Id by going to http://admin.mailchimp.com/lists/	// Click the "settings" link for the list - the Unique Id is at the bottom of that page.	$list_id = "your-list-id-here";	require_once('MailChimp.php');	$dopt = (!empty($_REQUEST['dopt']) && $_REQUEST['dopt'] == 'true') ? true : false;	$email = $_REQUEST['email'];	$merge_vars = array(		'FNAME' => !empty($_REQUEST['fname']) ? $_REQUEST['fname'] : '',		'LNAME' => !empty($_REQUEST['lname']) ? $_REQUEST['lname'] : '',	);	$api = new MailChimp($api_key);	$valid_key = $api->validateApiKey();	if( !$valid_key ) {		return 'Error: please, check your api-key';	}	$result = $api->call('lists/subscribe', array(        'id'                => $list_id,        'email'             => array('email' => $email),        'merge_vars'        => $merge_vars,        'double_optin'      => $dopt,        'update_existing'   => true,        'replace_interests' => false,        'send_welcome'      => false,    ));	if (!empty($result['email']) && !empty($result['euid']) && !empty($result['leid'])) {		return 'Success! Check your email to confirm sign up.';	} else {		$message = array();		if( !empty($result['error']) ) {			$message[] = $result['error'];		}		return 'Error: '.implode(' - ', $message);	}}// If being called via ajax, autorun the functionif ( !empty($_REQUEST['ajax']) ) {	echo storeAddress();}?>