<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>ajaxe tester example</title>
		<link rel="icon" href="data:;base64,=">
	</head>
	<body>
		<form class="ajaxe-submit"
			data-action="/search.php"
			data-confirm="Are you sure?"
			data-content=".search-results"
			data-feedback=".feedback"
			data-timeout="1000"
			data-type="html"
		>
			<input type="hidden" name="id" value="2">
			<label>
				Search
				&nbsp;
				<input type="text" name="search" value="">
			</label>
			&nbsp;
			<input type="submit" value="Go">
		</form>

		<button class="ajaxe-click"
			data-action="/search.php"
			data-content=".search-results"
			data-feedback=".feedback"
		>
			Moon
			<input type="hidden" name="search" value="moon">
		</button>
		<br>

		<select name="search" class="ajaxe-change"
			data-action="/search.php"
			data-content=".search-results"
			data-feedback=".feedback"
		>
			<option value="">Where?</option>
			<option value="earth">Earth</option>
			<option value="moon">Moon</option>
			<option value="mars">Mars</option>
			<option value="titan">Titan</option>
		</select>
		<br>

		<div class="ajaxe-change"
			data-action="/search.php"
			data-content=".search-results"
			data-feedback=".feedback"
		>
			Color:
			&nbsp;
			Red<input type="radio" name="search" value="red">
			&nbsp;
			Pink<input type="radio" name="search" value="pink">
		</div>

		Price:
		<input type="checkbox" name="search" value="too-much"
			data-action="/search.php"
			data-content=".search-results"
			data-feedback=".feedback"
		>

		<div class="feedback"></div>

		<div class="search-results"><?php include 'search.php' ?></div>
	</body>
	<footer>
		<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
		<script src="/ajaxe.js"></script>
	</footer>
</html>
