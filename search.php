<?php
$isAjax = !empty($_SERVER['HTTP_X_REQUESTED_WITH']) &&
	strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';

if (empty($_REQUEST['search'])) {
	if ($isAjax) {
		echo json_encode([
			'status' => 'success',
			'feedback' => 'Please provide a search string.',
		]);
	}
	return;
}

if ($isAjax) {
	ob_start();
}
?>

Found category "<?= $_REQUEST['search'] ?>"

<?php
if ($isAjax) {
	$content = ob_get_contents();
	ob_end_clean();

	echo json_encode([
		'status' => 'success',
		'content' => $content,
	]);
}
