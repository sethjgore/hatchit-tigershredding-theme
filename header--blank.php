<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta name="viewport" content="width=device-width" />

    <title><?php wp_title( ' | ', true, 'right' ); ?></title>
    <link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_uri(); ?>" />

    <?php get_template_part('typekit') //loads the typekit fonts embed scripts ?>

    <?php wp_head(); ?>
  </head>

  <body <?php body_class(); ?>>
      <div id="container">