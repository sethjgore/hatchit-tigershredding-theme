<?php

/*
*  get all custom fields and dump for texting
*/

$fields = get_fields('options');
var_dump( $fields );

/*
*  get all custom fields, loop through them and load the field object to create a label => value markup
*/

$fields = get_fields('options');

if( $fields )
{
  foreach( $fields as $field_name => $value )
  {
    // get_field_object( $field_name, $post_id, $options )
    // - $value has already been loaded for us, no point to load it again in the get_field_object function
    $field = get_field_object($field_name, false, array('load_value' => false));

    echo '<div>';
      echo '<h3>' . $field_name . '</h3>';
      echo $value;
    echo '</div>';
  }
}

?>