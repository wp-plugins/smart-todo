<?php


class SmartToDoHelper {


	public function __construct() {
		/*AJAX 	prep*/
		add_action('smart_todo_action', array($this, 'smart_todo_action'));
		add_action('wp_ajax_smart_todo_action', array($this, 'smart_todo_action'));
		add_action('wp_ajax_nopriv_smart_todo_action', array($this, 'smart_todo_action'));
	}



	/**
	 * Saves the smarttask data to the post_meta with meta_keys
	 * @todo save data in json format
	 *
	 * @return string echo success for ajax
	 */
	public function smart_todo_action() {
		$dataSmartToDo=json_decode(str_replace("\\", "", $_POST['datatodo']), true);
		$post_id=$_POST['post_id'];
		$request=$_POST['request'];
		$post=get_post($post_id);
		$access=((get_current_user_id()==$post->post_author || is_admin()) && (get_current_user_id()>0)) ? true : false;

 		if ($request=='get') {
			echo json_encode(array('access'=>$access,'data'=>$this->getDbSmartToDoArray($post_id)));
		} else if ($access==true) { //making sure valid user
			if ($request=='add') {
				if ($this->smart_todo_add($post_id, $dataSmartToDo)) {
					echo json_encode(array('request'=>$request, 'success'=>true));
				}else {
					echo json_encode(array('request'=>$request, 'success'=>false));
				}
			}else if ($request=='edit') {
				if ($this->smart_todo_update($post_id, $dataSmartToDo)) {
					echo json_encode(array('request'=>$request, 'success'=>true));
				}else {
					echo json_encode(array('request'=>$request, 'success'=>false));
				}
			}
		}

		die(1);

	}
	public function getDbSmartToDoArray($post_id) {
		$oldJSONValue=get_post_meta( $post_id, '_smart_todo', true);
		if ($oldJSONValue && $oldJSONValue!='null') {
			return json_decode($oldJSONValue, true);
		}else {
			return array();
		}
	}

	public function smart_todo_add($post_id, $jsonData) {
		$arrayCollection = $this->getDbSmartToDoArray($post_id);
		array_push($arrayCollection, $jsonData);
		return update_post_meta($post_id, '_smart_todo', json_encode($arrayCollection));
	}

	public function smart_todo_update($post_id, $jsonData) {
		$arrayCollection = array();
		$arrSmartToDo=$this->getDbSmartToDoArray($post_id);

		foreach ($arrSmartToDo as $smartToDo) {
			if ($smartToDo['time_start'] == $jsonData['time_start']) {
				$smartToDo['desc']=$jsonData['desc'];
				$smartToDo['url_ref']=$jsonData['url_ref'];
				$smartToDo['time_active']=$jsonData['time_active'];
				$smartToDo['time_used']=$jsonData['time_used'];
				$smartToDo['status']=$jsonData['status'];
			}
			array_push($arrayCollection, $smartToDo);
		}
		return update_post_meta($post_id, '_smart_todo', json_encode($arrayCollection));
	}

	public function smart_todo_remove($post_id, $jsonData) {  $arrayCollection = array();
		$arrSmartToDo=$this->getDbSmartToDoArray($post_id);

		foreach ($arrSmartToDo as $smartToDo) {
			if ($smartToDo['time_start'] != $jsonData['time_start']) {
				array_push($arrayCollection, $smartToDo);
			}
		}
		return update_post_meta($post_id, '_smart_todo', json_encode($arrayCollection));
	}

}