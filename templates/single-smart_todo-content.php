<?php
$smart_todo_terms = get_the_terms( $post->ID,'smart_project');
$sep='';
if($smart_todo_terms){
	foreach($smart_todo_terms as $smart_todo_term) {
		$output.=$sep.'<a href="'.get_term_link($smart_todo_term).'">'.$smart_todo_term->name.'</a>';
		if($sep==''){$sep=' / ';}
	}
	echo '<h3>Under Project/s: '.trim($output, $separator).'</h3>';
}
?>

<?php echo $content; ?>
<?php
  $donateButton='<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top"><input name="cmd" type="hidden" value="_s-xclick" />
<input name="hosted_button_id" type="hidden" value="W7HKSYRWYFB3S" />
<input style="width:100px" alt="PayPal - The safer, easier way to pay online!" name="submit" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" type="image" />
<img src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" alt="" width="1" height="1" border="0" /></form>';

?>

<div id="tblcontainer" post_id="<?php echo $post->ID;?>">
    <table id="tbl_smart_todo" class="display" cellspacing="0" width="100%">
        <thead>
            <tr>
                <th>Smart Tasks</th>

                <th>Time Spent</th>

                <th>Controls</th>
            </tr>
        </thead>

        <tfoot>
            <tr>
                <th>Smart Tasks</th>

                <th>Time Spent</th>

                <th>Controls</th>
            </tr>
            <tr id="totalrow">
                <td>Totals</td>

                <td id="total_time_used">00:00:00</td>

                <td id="donate"><?php echo $donateButton;?></td>
            </tr>
        </tfoot>

        <tbody>

        </tbody>
    </table>
</div>

<div id="addform"></div>
<!--
created by:
  _________.__                  __      _________
 /   _____/|  |__   ___________|  | __ /   _____/_____   ____ _____ _______
 \_____  \ |  |  \_/ __ \_  __ \  |/ / \_____  \\____ \_/ __ \\__  \\_  __ \
 /        \|   Y  \  ___/|  | \/    <  /        \  |_> >  ___/ / __ \|  | \/
/_______  /|___|  /\___  >__|  |__|_ \/_______  /   __/ \___  >____  /__|
        \/      \/     \/           \/        \/|__|        \/     \/

http://www.sherkspear.com
-->