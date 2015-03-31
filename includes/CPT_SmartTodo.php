<?php

/* Generated from http://themergency.com/generators/wordpress-custom-post-types/ */

class SmartTodo {

	public function __construct() {
		add_action( 'init', array($this, 'register_cpt_smart_todo'));
		add_action( 'init', array($this, 'register_smart_todo_taxonomies'));
		add_filter( 'the_content', array($this, 'sc_todo_content'));
		
		add_filter('manage_smart_todo_posts_columns', array($this,'columns_head_smart_todo'), 10);
		add_action('manage_smart_todo_posts_custom_column', array($this,'columns_content_smart_todo'), 10, 2);

		new SmartToDoHelper();
	}
	
	function columns_head_smart_todo($defaults) {
		$defaults['projects'] = 'Projects';
		$defaults['status'] = 'Status';
		return $defaults;
	}
	 
	// CUSTOM POSTS
	function columns_content_smart_todo($column_name, $smart_todo_id) {
	    global $post;
		if ($column_name == 'status') {
		    $meta_smart_todo=get_post_meta( $smart_todo_id, '_smart_todo', true);
			if ((strpos($meta_smart_todo,'"status":"hold"') !== false) ||
				(strpos($meta_smart_todo,'"status":"active"') !== false)) {
				echo 'Open';
			}else{
			    echo 'Closed';
			}
		     
		}else if ($column_name == 'projects') {
		    $terms = get_the_terms($smart_todo_id, 'smart_project' );
			if ($terms && ! is_wp_error($terms)) :
				$term_slugs_arr = array();
				foreach ($terms as $term) {
					$projects = ' <a href="'.get_term_link($term->slug,'smart_project').'" target="_blank">'.$term->name.'</a> ';
				}
				
			endif;
			echo $projects;
		}
	}
 



	public function register_cpt_smart_todo() {

		$labels = array(
			'name' => _x( 'Smart ToDos', 'smart_todo' ),
			'singular_name' => _x( 'Smart ToDo', 'smart_todo' ),
			'add_new' => _x( 'Add New', 'smart_todo' ),
			'add_new_item' => _x( 'Add New Smart ToDo', 'smart_todo' ),
			'edit_item' => _x( 'Edit Smart ToDo', 'smart_todo' ),
			'new_item' => _x( 'New Smart ToDo', 'smart_todo' ),
			'view_item' => _x( 'View Smart ToDo', 'smart_todo' ),
			'search_items' => _x( 'Search Smart ToDos', 'smart_todo' ),
			'not_found' => _x( 'No smart todos found', 'smart_todo' ),
			'not_found_in_trash' => _x( 'No smart todos found in Trash', 'smart_todo' ),
			'parent_item_colon' => _x( 'Parent Smart ToDo:', 'smart_todo' ),
			'menu_name' => _x( 'Smart ToDos', 'smart_todo' ),
		);

		$args = array(
			'labels' => $labels,
			'hierarchical' => false,
			'description' => 'Creates a smart todo custom post types which will allow you to add list of todos.',
			'supports' => array( 'title', 'editor', 'author', 'comments','post-formats' ),
			'taxonomies' => array( 'smart_project', 'post_tag' ),
			'public' => true,
			'show_ui' => true,
			'show_in_menu' => true,
			'menu_position' => 5,
			'menu_icon' => 'dashicons-welcome-write-blog',
			'show_in_nav_menus' => true,
			'publicly_queryable' => true,
			'exclude_from_search' => false,
			'has_archive' => true,
			'query_var' => true,
			'can_export' => true,
			'rewrite' => true,
			'capability_type' => 'post'
		);

		register_post_type( 'smart_todo', $args );
	}

	function register_smart_todo_taxonomies() {
		register_taxonomy(
			'smart_project',  //The name of the taxonomy. Name should be in slug form (must not contain capital letters or spaces).
			'smart_todo',      //post type name
			array(
				'hierarchical'   => true,
				'label'    => 'Projects',
				'query_var'   => true,
				'rewrite'   => array(
					'slug'    => 'smart_projects', // This controls the base slug that will display before each term
					'with_front'  => false // Don't display the category base before
				)
			)
		);
	}

	/**
	 * sc_todo_content function.
	 *
	 * @access public
	 * @param mixed $content
	 * @return void
	 */
	function sc_todo_content($content) {
		global $post;
		if ($post->post_type=='smart_todo' && is_single($post)) {
			include(SmartTodoInfo::get_plugin_uri().'templates/single-smart_todo-content.php');
			return ob_get_clean();
		}else{
			return $content;
		}
	}


}
new SmartTodo();