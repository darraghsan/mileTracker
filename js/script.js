$(document).one('pageinit', function(){
	//add handler
	$('#submitAdd').on('tap', addRun);

	//edit handler
	$('#submitEdit').on('tap', editRun);

	//Delete handler
	$('#stats').on('tap','#deleteLink', deleteRun);

	//Set current handler
	$('#stats').on('tap','#editLink', setCurrent);

	//Clear runs handler
	$('#clearRuns').on('tap', clearRuns);

	/*
	*Display al runs on homepage
	*/
	//Display runs
	showRuns();

	function showRuns(){
		//Get runs object
		var runs = getRunsObject();

		//Check if empty
		if(runs != '' && runs != null){
			for(var i = 0; i < runs.length; i++){
				$('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong>'+runs[i]["date"]+
					'<br><strong>Distance:</strong>'+runs[i]["miles"]+'m<div class="controls">'+
					'<a href="#edit" id="editLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'">Edit</a> | <a href="#" id="deleteLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'" return confirm(\'Are you sure?\')>Delete</a></div></li>');
			}

			$('#home').bind('pageinit', function(){
				$('stats').listview('refresh');
			});
		} else {
			$('#stats').html('<p>You have no logged runs</p>');
		}

	}

	/*
	*Add run
	*/
	function addRun(){
		//Get form values
		var miles = $('#addMiles').val();
		var date = $('#addDate').val();

		//Create run object
		var run = {
			date: date,
			miles: parseFloat(miles)
		};

		var runs = getRunsObject();

		//Add run to runs array
		runs.push(run);
		alert('Run added');

		//Set stringify object to storage
		localStorage.setItem('runs', JSON.stringify(runs));

		//redirect
		window.location.href="index.html";

		return false;
	}

	/*
	*Edit run
	*/
	function editRun(){
		//Get current values
		currentMiles = localStorage.getItem('currentMiles');
		currentDate = localStorage.getItem('currentDate');

		var runs = getRunsObject();

		//loop through current runs
		for(var i = 0; i < runs.length; i++){
			if(runs[i].miles == currentMiles && runs[i].date == currentDate){
				runs.splice(i, 1);
			}
			localStorage.setItem('runs', JSON.stringify(runs));
		}

		//Get form values
		var miles = $('#editMiles').val();
		var date = $('#editDate').val();

		//Create update run object
		var update_run = {
			date: date,
			miles: parseFloat(miles)
		};

		//Add run to runs array
		runs.push(update_run);
		alert('Run updated');

		//Set stringify object to storage
		localStorage.setItem('runs', JSON.stringify(runs));

		//redirect
		window.location.href="index.html";

		return false;

	}

	/*
	*Delete run
	*/
	function deleteRun(){
		//set ls items
		localStorage.setItem('currentMiles', $(this).data('miles'));
		localStorage.setItem('currentDate', $(this).data('date'));

		//Get current values
		currentMiles = localStorage.getItem('currentMiles');
		currentDate = localStorage.getItem('currentDate');

		var runs = getRunsObject();

		//loop through current runs
		for(var i = 0; i < runs.length; i++){
			if(runs[i].miles == currentMiles && runs[i].date == currentDate){
				runs.splice(i, 1);
			}
			localStorage.setItem('runs', JSON.stringify(runs));
		}

		alert('Run deleted');

		//redirect
		window.location.href="index.html";

		return false;

	}

	/*
	*Clear runs
	*/
	function clearRuns(){
		localStorage.removeItem('runs');
		$('#stats').html('<p>You have no logged runs</p>');
	}

	/*
	*Get runs object
	*/
	function getRunsObject(){
		//set runs array
		var runs = new Array();
		//Get current runs from local storage
		var currentRuns = localStorage.getItem('runs');
		
		//Check local storage
		if(currentRuns != null){
			var runs = JSON.parse(currentRuns);
		}

		//Return runs object
		return runs.sort(function(a, b){return new Date(b.date) - new Date(a.date)});
	}

	/*
	*Set current clicked miles and date
	*/
	function setCurrent(){
		//set ls items
		localStorage.setItem('currentMiles', $(this).data('miles'));
		localStorage.setItem('currentDate', $(this).data('date'));

		//insert form fields
		$('#editMiles').val(localStorage.getItem('currentMiles'));
		$('#editDate').val(localStorage.getItem('currentDate'));
	}

});