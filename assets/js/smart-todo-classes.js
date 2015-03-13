window.jQuery = window.$ = jQuery; /*Smart ToDo type class*/
var SmartToDo = function() {
		var desc = '';
		var url_ref = '';
		var time_start = '';
		var time_created = $('#tbl_smart_todo').attr('time_created');
		var time_active = '-1';
		var time_used = '00:00:00';
		var status = 'hold'; //active, hold, done
		var smartToDoHelper = new SmartToDoController();
		var time_zone = smartToDoHelper.getLocalTimeZone();
		this.toJson = function() {
			var smartToDoJson = {
				desc: desc,
				url_ref: url_ref,
				time_created: time_created,
				time_start: time_start,
				time_active: time_active,
				time_used: time_used,
				status: status,
				time_zone: time_zone,
			};
			return JSON.stringify(smartToDoJson);
		};
		this.jsonSmartToDoToObject = function(jsonSmartToDo) {
			this.setDesc(jsonSmartToDo['desc']);
			this.setUrlRef(jsonSmartToDo['url_ref']);
			this.setTimeCreated(jsonSmartToDo['time_created']);
			this.setTimeStart(jsonSmartToDo['time_start']);
			this.setTimeActive(jsonSmartToDo['time_active']);
			this.setTimeUsed(jsonSmartToDo['time_used']);
			this.setStatus(jsonSmartToDo['status']);
		}
		this.getSmartToDoFromTimeStart = function(time_started) {
			this.setTimeCreated($(time_started).attr('time_created'));
			this.setTimeStart($(time_started).attr('id'));
			this.setDesc($(time_started).find('.desc').html());
			this.setUrlRef($(time_started).find('.url_ref').attr('href'));
			this.setTimeActive($(time_started).attr('time_active'));
			this.setTimeUsed($(time_started).find('.time_used').html());
			this.setStatus($(time_started).attr('status'));
		}
		this.getTimeZone = function() {
			return time_zone;
		};
		this.setDesc = function(description) {
			desc = description;
		};
		this.getDesc = function() {
			return desc;
		};
		this.setUrlRef = function(url_reference) {
			url_ref = url_reference;
		};
		this.getUrlRef = function() {
			return url_ref;
		};
		this.setTimeCreated = function(tcreated) {
			time_created = tcreated;
		};
		this.getTimeCreated = function() {
			return time_created;
		};
		this.setTimeStart = function(tstart) {
			time_start = tstart;
		};
		this.getTimeStart = function() {
			return time_start;
		};
		this.setTimeActive = function(tstop) {
			time_active = tstop;
		};
		this.getTimeActive = function() {
			return time_active;
		};
		this.setTimeUsed = function(tused) {
			time_used = tused;
		};
		this.getTimeUsed = function() {
			return time_used;
		};
		this.setStatus = function(ui_status) {
			status = ui_status;
		};
		this.getStatus = function() {
			return status;
		};
	};
var SmartToDoHTML = function() {
		var tbl_smart_todo = $('#tbl_smart_todo').DataTable();
		this.getTblDatatable = function() {
			return tbl_smart_todo;
		}
		this.addForm = function() {
			var addform = '<div class="addform row"><div class="width-100">Smart Task:</div><input class="width-100 smarttitle" type="text" /></div><div class="row"><div class="width-100 pull-left">Url Task Reference:</div><input class="width-100 pull-left text-left ref_url" type="text" value="" /></div><div class="row"><div class="float-right margin-10-5"><div class="addtodo btn btn-default">Add Smart Task</div></div>';
			$('#addform').html(addform);
		};
		this.refreshDataTable = function(jsonSmartToDo, access) {
			this.getTblDatatable().clear();
			for (index = 0; index < jsonSmartToDo.length; ++index) {
				curSmartToDo = new SmartToDo();
				curSmartToDo.jsonSmartToDoToObject(jsonSmartToDo[index]);
				this.addToDataTable(curSmartToDo,access);
			}
		}
		this.addToDataTable = function(smartToDo,access) {
			var status = smartToDo.getStatus();
			var sortTitle='<span class="sort_title hide">A</span>';
			if(status=='hold'){
				sortTitle='<span class="sort_title hide">H</span>';
			}else if (status=='done'){
				sortTitle='<span class="sort_title hide">Z</span>';
			}
			var hidePlay = (status != 'active' ? '' : 'hide');
			var hidePause = (status == 'active' ? '' : 'hide');
			var hideDone = (status == 'done' ? 'hide' : '');
			var actionHtml = '<i class="icon-small icon-play margin-icon ' + hidePlay + '"></i><i class="icon-small icon-pause margin-icon ' + hidePause + '"></i><i class="icon-small icon-ok margin-icon ' + hideDone + '"></i>';
			var editTaskButtons='<i class="edit-task icon-small icon-pencil"></i><i class="margin-icon edit-url icon-small icon-globe"></i><i class="margin-icon edit-time-used icon-small icon-time"></i>';
			if(access==false){
				actionHtml='<i class="icon-small icon-warning-sign"></i>';
				editTaskButtons='';
				$('#addform').hide();
			}
			var rowHtml = sortTitle+'<span class="smart_todo_data" status="' + smartToDo.getStatus() + '">' + this.getDescHtml(smartToDo) + '</span><br/>'+editTaskButtons;
			var time_used = smartToDo.getTimeUsed();
			var rowTbl = this.getTblDatatable().row.add([rowHtml, '<span class="time_used">' + (time_used ? time_used : '00:00:00') + '</span>', actionHtml]).draw();
			var rowIndex = rowTbl.index();
			rowTbl = rowTbl.node();
			$(rowTbl).attr('id', smartToDo.getTimeStart());
			$(rowTbl).attr('row', rowIndex);
			$(rowTbl).attr('status', smartToDo.getStatus());
			$(rowTbl).attr('time_active', smartToDo.getTimeActive());
			$(rowTbl).attr('time_used', time_used);
			$(rowTbl).removeClass('active');
			if (status == 'active') {
				$(rowTbl).addClass('active');
				$('#tbl_smart_todo').attr('active', smartToDo.getTimeStart());
			} else if (status == 'done') {
				$(rowTbl).addClass('done');
			}
			this.clearForm();
		};

		this.updateDataTable = function(smartToDo) {
			var status = smartToDo.getStatus();
			var sortTitle='<span class="sort_title hide">A</span>';
			if(status=='hold'){
				sortTitle='<span class="sort_title hide">H</span>';
			}else if (status=='done'){
				sortTitle='<span class="sort_title hide">Z</span>';
			}
			var hidePlay = (status != 'active' ? '' : 'hide');
			var hidePause = (status == 'active' ? '' : 'hide');
			var hideDone = (status == 'done' ? 'hide' : '');
			var actionHtml = '<i class="icon-small icon-play margin-icon ' + hidePlay + '"></i><i class="icon-small icon-pause margin-icon ' + hidePause + '"></i><i class="icon-small icon-ok margin-icon ' + hideDone + '"></i>';
			var rowHtml = sortTitle+'<span class="smart_todo_data" status="' + smartToDo.getStatus() + '">' + this.getDescHtml(smartToDo) + '</span><br/><i class="edit-task icon-small icon-pencil"></i><i class="margin-icon edit-url icon-small icon-globe"></i><i class="margin-icon edit-time-used icon-small icon-time"></i>';
			var time_start = smartToDo.getTimeStart();
			rowTbl = '#' + time_start;
			var rowIndex = $(rowTbl).attr('row');
			var time_used = smartToDo.getTimeUsed();
			$('#tbl_smart_todo').dataTable().fnUpdate([rowHtml, '<span class="time_used">' + (time_used ? time_used : '00:00:00') + '</span>', actionHtml], rowIndex);
			$(rowTbl).attr('status', smartToDo.getStatus());
			$(rowTbl).attr('time_active', smartToDo.getTimeActive());
			$(rowTbl).attr('time_used', time_used);
			$(rowTbl).removeClass('active');
			if (status == 'active') {
				$(rowTbl).addClass('active');
				$('#tbl_smart_todo').attr('active', smartToDo.getTimeStart());
			} else if (status == 'done') {
				$(rowTbl).addClass('done');
			}
		}
		this.getDescHtml = function(smartToDo) {
			if (smartToDo.getUrlRef() != '' && smartToDo.getUrlRef() !== 'undefined') {
				return '<a class="url_ref" href="' + smartToDo.getUrlRef() + '" target="_blank"><span class="desc">' + smartToDo.getDesc() + '</span></a>';
			} else {
				return '<span class="desc">' + smartToDo.getDesc() + '</span>';
			}
		};
		this.clearForm = function() {
			$('.smarttitle').val('');
			$('.ref_url').val('');
		}
	};
var SmartToDoAjax = function() {
		var smartToDoHelper = new SmartToDoController();
		this.saveSmartToDo = function(smartToDo) {};
		this.updateSmartToDo = function(smartToDo) {};
		this.deleteSmartToDo = function(postmeta_id) {};
		this.getSmartToDo = function(postmeta_id) {};
		this.getSmartToDos = function(post_id) {};
/*
	  Submits form into database using ajax
	  ajax_action= save, delete
	  ajax_data = SmartToDo
	*/
		this.ajaxSubmit = function(request, ajax_data) {
			$.ajax({
				type: 'POST',
				dataType: 'json',
				url: obj_smart_todo.ajaxurl,
				data: {
					'action': 'smart_todo_action',
					'request': request,
					'time_created': $('#tbl_smart_todo').attr('time_created'),
					'post_id': smartToDoHelper.getPostID(),
					'datatodo': ajax_data.toJson(),
				},
				complete: function(object) {
					if (object.status == 200) {
						var jsonResponse = object.responseJSON;
						if (jsonResponse && typeof jsonResponse === "object" && jsonResponse !== null) {
							smartToDoHtml = new SmartToDoHTML();
							if (request == 'add') {
								smartToDoHtml.addToDataTable(ajax_data,true);
							} else if (request == 'get') { //populate form
								smartToDoHtml.refreshDataTable(jsonResponse.data,jsonResponse.access);
								var smartToDoController = new SmartToDoController();
								smartToDoController.timerOnActive();
							} else if (request == 'edit' && jsonResponse.success) {
								smartToDoHtml.updateDataTable(ajax_data);
							}
						} else {
							console.log("Ajax Failed");
						}
					} else {
						console.log("Ajax Failed");
					}
				}
			});
		}
	};
var SmartToDoController = function() {
		this.clickAddToDo = function() {
			if (this.validateForm()) {
				var smartToDoAjax = new SmartToDoAjax();
				smartToDoAjax.ajaxSubmit('add', this.getSmartToDoFormValues('add'));
			} else {}
		};
		this.populateForm = function() {
			var smartToDoAjax = new SmartToDoAjax();
			smartToDoAjax.ajaxSubmit('get', new SmartToDo());
		}
		this.clickEditToDo = function(time_started) {
			var newDesc = prompt('Edit Task Description', $(time_started).find('.desc').html());
			if (newDesc != '' && newDesc != null) {
				smartToDoEdited = new SmartToDo();
				smartToDoEdited.setTimeCreated($('#tbl_smart_todo').attr('time_created'));
				smartToDoEdited.getSmartToDoFromTimeStart(time_started);
				smartToDoEdited.setDesc(newDesc);
				var smartToDoAjax = new SmartToDoAjax();
				smartToDoAjax.ajaxSubmit('edit', smartToDoEdited);
			}
		};
		this.clickEditToDoLink = function(time_started) {
			var oldUrlRef = $(time_started).find('.url_ref').attr('href');
			if (typeof oldUrlRef === 'undefined') {
				oldUrlRef = '';
			}
			var newUrlRef = prompt('Edit Url Reference', oldUrlRef);
			if (newUrlRef !== null && newUrlRef !== '' && oldUrlRef != newUrlRef) {
				if (this.isValidUrl(newUrlRef)) {
					smartToDo = new SmartToDo();
					smartToDo.setTimeCreated($('#tbl_smart_todo').attr('time_created'));
					smartToDo.getSmartToDoFromTimeStart(time_started);
					smartToDo.setUrlRef(newUrlRef);
					var smartToDoAjax = new SmartToDoAjax();
					smartToDoAjax.ajaxSubmit('edit', smartToDo);
				}
			} else {
				alert('Enter a valid Url Reference');
			}
		};
		this.clickEditTimeUsed = function(time_started) {
			var newTimeUsed = prompt('Edit Time Used', $(time_started).find('.time_used').html());
			if (newTimeUsed != '' && newTimeUsed != null && this.isValidTimeFormat(newTimeUsed)) {
				smartToDoEdited = new SmartToDo();
				smartToDoEdited.setTimeCreated($('#tbl_smart_todo').attr('time_created'));
				smartToDoEdited.getSmartToDoFromTimeStart(time_started);
				smartToDoEdited.setTimeUsed(newTimeUsed);
				var smartToDoAjax = new SmartToDoAjax();
				smartToDoAjax.ajaxSubmit('edit', smartToDoEdited);
				this.getTotTime();
			} else {
				alert('Enter a valid Time Entry');
			}
		};
		this.clickPlayTime = function(time_started) {
			smartToDo = new SmartToDo();
			smartToDo.getSmartToDoFromTimeStart(time_started);
			smartToDo.setStatus('active');
			smartToDo.setTimeCreated($('#tbl_smart_todo').attr('time_created'));
			smartToDo.setTimeActive(Date.now());
			var smartToDoAjax = new SmartToDoAjax();
			smartToDoAjax.ajaxSubmit('edit', smartToDo);
		};
		this.clickStopTime = function(time_started) {
			smartToDo = new SmartToDo();
			smartToDo.setTimeCreated($('#tbl_smart_todo').attr('time_created'));
			smartToDo.getSmartToDoFromTimeStart(time_started);
			smartToDo.setStatus('hold');
			smartToDo.setTimeActive(-Date.now());
			smartToDo.setTimeUsed($(time_started).find('.time_used').html());
			var smartToDoAjax = new SmartToDoAjax();
			smartToDoAjax.ajaxSubmit('edit', smartToDo);
		};
		this.clickDone = function(time_started) {
			smartToDo = new SmartToDo();
			smartToDo.setTimeCreated($('#tbl_smart_todo').attr('time_created'));
			smartToDo.getSmartToDoFromTimeStart(time_started);
			smartToDo.setStatus('done');
			smartToDo.setTimeActive(Date.now());
			var smartToDoAjax = new SmartToDoAjax();
			smartToDoAjax.ajaxSubmit('edit', smartToDo);
		};
		this.getSmartToDoFormValues = function(form_user_action) {
			var smartToDoForm = new SmartToDo();
			smartToDoForm.setDesc($('.smarttitle').val());
			smartToDoForm.setTimeCreated($('#tbl_smart_todo').attr('time_created'));
			smartToDoForm.setTimeStart(Date.now());
			smartToDoForm.setTimeActive(-Date.now());
			smartToDoForm.setUrlRef($('.ref_url').val());
			return smartToDoForm;
		};
		this.validateForm = function() {
			if ($('.smarttitle').val() != '') {
				if ($('.ref_url').val() != '') {
					return this.isValidUrl($('.ref_url').val());
				}
				return true;
			} else {
				return false;
			}
		};
		this.isValidTimeFormat = function(entrytime) {
			re = /^\d{1,2}:\d{2}:\d{2} ?$/;
			if (entrytime == '' || !entrytime.match(re)) {
				('Error:Invalid Time Entry Format');
				return false;
			} else {
				return true;
			}
		};
		this.isValidUrl = function(url) {
			var urlregex = new RegExp("^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
			if (urlregex.test(url)) {
				return true;
			} else {
				alert('Error:Invalid Url Format');
				return false;
			}
		}
		this.getLocalTimeZone = function() {
			var timezone = jstz.determine();
			return timezone.name();
		}
		this.getPostID = function() {
			return $('#tblcontainer').attr('post_id');
		} /*time manipulation*/
/*
		duration from .getTime() value Date Object
		*/
		this.msToTime = function(duration) {
			var milliseconds = parseInt((duration % 1000) / 100),
				seconds = parseInt((duration / 1000) % 60),
				minutes = parseInt((duration / (1000 * 60)) % 60),
				hours = parseInt((duration / (1000 * 60 * 60)) % 24);
			hours = (hours < 10) ? "0" + hours : hours;
			minutes = (minutes < 10) ? "0" + minutes : minutes;
			seconds = (seconds < 10) ? "0" + seconds : seconds;
			return hours + ":" + minutes + ":" + seconds;
		}
		this.twoDigits = function(n) {
			return n > 9 ? "" + n : "0" + n;
		}
/*
			converts hh:mm:ss format to total seconds
		*/
		this.getTotSec = function(hrsec) {
			if (hrsec != '') {
				hrsec = hrsec.split(':');
				if (hrsec.length) {
					return ((parseInt(hrsec[0]) * 3600) + (parseInt(hrsec[1]) * 60) + (parseInt(hrsec[2])));
				} else {
					return 0;
				}
			}
		}
/*
	        converts total seconds to hh:mm:ss format
        */
		this.secToTime = function(totSeconds) {
			var seconds = totSeconds % 60;
			var minutes = Math.floor(totSeconds / 60);
			var hours = Math.floor(minutes / 60);
			minutes %= 60;
			hours %= 60;
			return this.twoDigits(hours) + ":" + this.twoDigits(minutes) + ":" + this.twoDigits(seconds);
		}
/*
		ftime1='10:23:23'
		ftime2='01:43:53'
		*/
		this.addFormattedTime = function(ftime1, ftime2) {
			totSecs = this.getTotSec(ftime1) + this.getTotSec(ftime2);
			return this.secToTime(totSecs);
		}
		this.getTotTime = function() {
			var totsec = '00:00:00';
			var smartToDoController = new SmartToDoController();
			$('.time_used').each(function(index) {
				totsec = smartToDoController.addFormattedTime(totsec, $(this).html());
			});
			return totsec;
		}
		this.timerOnActive = function() {
			var activeId = $('#tbl_smart_todo').attr('active');
			var rowTbl = '#' + activeId;
			if (activeId != '') {
				cur_time = new Date().getTime();
				time_used = $(rowTbl).attr('time_used');
				if ($(rowTbl).attr('time_active') > 0) {
					time_activated = this.msToTime(cur_time - $(rowTbl).attr('time_active'));
					ctr_time = this.addFormattedTime(time_used, time_activated);
				} else {
					ctr_time = time_used;
				}
				$(rowTbl + ' .time_used').html(ctr_time);
				$('#total_time_used').html(this.getTotTime());
				if ((typeof ctr_time != 'undefined') && (typeof $(rowTbl).find('.desc').html() != 'undefined')) {
					document.title = ctr_time + ' ' + $(rowTbl).find('.desc').html();
				}
				cur_timer = setTimeout(function() {
					var smartToDoController = new SmartToDoController();
					smartToDoController.timerOnActive();
				}, 1000);
			}
		}
	};
var SmartToDoMain = function() {
		var smartToDoHtml = new SmartToDoHTML();
		smartToDoHtml.addForm();
		var smartToDoController = new SmartToDoController(); /*click add ToDo*/
		smartToDoController.populateForm();
		$(document).on('click', '.addtodo', function(e) {
			smartToDoController.clickAddToDo();
			e.preventDefault();
		}); /*click edit ToDo*/
		$(document).on('click', '.edit-task', function(e) {
			var closesttrid = $(this).closest('tr');
			smartToDoController.clickEditToDo(closesttrid);
			e.preventDefault();
		});
		$(document).on('click', '.edit-url', function(e) {
			var closesttrid = $(this).closest('tr');
			smartToDoController.clickEditToDoLink(closesttrid);
			e.preventDefault();
		});
		$(document).on('click', '.edit-time-used', function(e) {
			var closesttrid = $(this).closest('tr');
			smartToDoController.clickEditTimeUsed(closesttrid);
			e.preventDefault();
		}); /*click active ToDo*/
		$(document).on('click', '.icon-play', function(e) {
			var closesttrid = $(this).closest('tr');
			var activeTimeStarted = $('#tbl_smart_todo').attr('active');
			activeRowTbl = '#' + activeTimeStarted;
			if (activeTimeStarted != '' && (typeof activeTimeStarted != 'undefined')) {
				smartToDoController.clickStopTime(activeRowTbl);
				console.log('im in active=' + activeRowTbl);
			}
			smartToDoController.clickPlayTime(closesttrid);
			$('#tbl_smart_todo').attr('active', $(closesttrid).attr('id'));
			$(closesttrid).removeClass('done');
			e.preventDefault();
		}); /*click stop ToDo*/
		$(document).on('click', '.icon-pause', function(e) {
			var closesttrid = $(this).closest('tr');
			smartToDoController.clickStopTime(closesttrid);
			$('#tbl_smart_todo').removeAttr('active');
			e.preventDefault();
		}); /*click done ToDo*/
		$(document).on('click', '.icon-ok', function(e) {
			var closesttrid = $(this).closest('tr');
			$(closesttrid).addClass('done');
			if ($(closesttrid).attr('status') == 'active') {
				smartToDoController.clickStopTime(closesttrid);
				$('#tbl_smart_todo').removeAttr('active');
			}
			smartToDoController.clickDone(closesttrid);
			e.preventDefault();
		});
		//add loader
		$(document.body).append('<div class="ajaxmodal"><!-- Place at bottom of page --></div>');
		$body = $("body");
		$(document).on({
			ajaxStart: function() {
				$body.addClass("loading");
			},
			ajaxStop: function() {
				$body.removeClass("loading");
			}
		});
	};
var smartToDoMain = new SmartToDoMain();