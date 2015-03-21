<?php

/**
 * LoadScripts class.
 * Load css and javascripts
 */
class SmartToDoLoadScripts {

	/**
	 * __construct function.
	 *
	 * @access public
	 * @return void
	 */
	public function __construct() {
		add_action('wp_enqueue_scripts', array($this, 'include_smart_todo_css'));

	}



	/**
	 * include_smart_todo_css function.
	 *
	 * @access public
	 * @return void
	 */
	public function include_smart_todo_css() {
		if(get_post_type()=='smart_todo'){
			wp_register_style('smart-todo-styles', SmartTodoInfo::get_plugin_url().'assets/css/style.css', array(), '20121224', 'all' );
			wp_register_style('dataTables-styles', SmartTodoInfo::get_plugin_url().'assets/dbtables/media/css/jquery.dataTables.css', array(), '1', 'all' );

			wp_enqueue_style('smart-todo-styles');
			wp_enqueue_style('dataTables-styles');

			wp_enqueue_script('jquery');
			wp_enqueue_script('datatables-js', SmartTodoInfo::get_plugin_url().'assets/dbtables/media/js/jquery.dataTables.js', array(), '', false);
			wp_enqueue_script('smart-todo-classes-js', SmartTodoInfo::get_plugin_url().'assets/js/smart-todo-classes.js', array(), '', true);
			wp_enqueue_script('js-tz-js', SmartTodoInfo::get_plugin_url().'assets/js/js-tz.min.js', array(), '', false);
			wp_localize_script('smart-todo-classes-js', 'obj_smart_todo', array('ajaxurl'=>admin_url('admin-ajax.php')));
		}
	}

}

new SmartToDoLoadScripts();