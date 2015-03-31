<?php
/*
Plugin Name: Smart Todo
Plugin URI: http://www.sherkspear.com/portfolio-item/smart-todo-wordpress-plugin/
Description: This plugin creates Smart ToDo post types, break into tasks and categorized as Projects. Timers are added on each tasks.
Created Projects as taxonomy for Smart ToDo post types. And each Smart ToDo post types is capable of adding multiple tasks with url references. Timers are provided on each task and can be controlled with buttons to Start, Pause and setting task as Done. Also edit buttons are provided to edit task description, task url reference and time spent. Proper user's access are also given to each type of users. Total hours are provided dynamically and Title of window is set to active task with the current time spent. This is inspired from the Task Timer Google Chrome App.
Version: 1.02
Author: Sherwin Calims
Author URI: http://www.sherkspear.com

------------------------------------------------------------------------
Copyright 2015 SherkSpear

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
*/

/*

  _________.__                  __      _________
 /   _____/|  |__   ___________|  | __ /   _____/_____   ____ _____ _______
 \_____  \ |  |  \_/ __ \_  __ \  |/ / \_____  \\____ \_/ __ \\__  \\_  __ \
 /        \|   Y  \  ___/|  | \/    <  /        \  |_> >  ___/ / __ \|  | \/
/_______  /|___|  /\___  >__|  |__|_ \/_______  /   __/ \___  >____  /__|
        \/      \/     \/           \/        \/|__|        \/     \/
*/


/**
 * SmartTodoInfo class.
 */
class SmartTodoInfo {

	/**
	 *
	 *  Include classes essential for the plugin
	 *
	 * @return void
	 */

	public function __construct() {
		//Load SmartToDoHelper and debugger function
		require "includes/SmartToDoHelper.php";

		// Load any external files you have here
		require "includes/CPT_SmartTodo.php";

		//Load javascripts and stylesheets
		require "includes/CssJsScripts.php";

	}

	/**
	 *
	 * Returns plugin directory
	 *
	 * @return <string>
	 */

	public static function get_plugin_url() {
		return plugins_url( '' , __FILE__ ).'/';
	}

	/**
	 * get_plugin_uri function.
	 *
	 * @access public
	 * @static
	 * @return void
	 */
	public static function get_plugin_uri() {
		return  dirname(__FILE__).'/';

	}
}



new SmartTodoInfo();
