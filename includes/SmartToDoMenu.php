<?php


class SmartToDoMenu {


    function __construct(){
	
	   add_action( 'admin_menu', array($this,'register_my_custom_menu_page' ));

	}
	
	
	
	

	function register_my_custom_menu_page(){
		add_submenu_page( 'edit.php?post_type=smart_todo', 'How To Use', 'How To Use', 'manage_options', 'smarttodo_info', array($this,'smarttodo_menu_page'), 'dashicons-images-alt2', 10 ); 
	}

	function smarttodo_menu_page(){
		include(SmartTodoInfo::get_plugin_uri().'templates/smarttodo_dashboard.php');
	}
	

	
	

	
} //end of class
	
new SmartToDoMenu();