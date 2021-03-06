<!DOCTYPE html>
<html <?php language_attributes(); ?>>
  <head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <meta name="viewport" content="width=device-width" />

    <title><?php wp_title( ' | ', true, 'right' ); ?></title>
    <link rel="stylesheet" type="text/css"
      href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css">

     <!--[if !IE]><!-->
      <link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_uri(); ?>" />
     <!--<![endif]-->

    <!--[if IE9]>
      <link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_uri(); ?>" />
      <link rel="stylesheet" type="text/css" href="<?php echo get_bloginfo('template_directory'); ?>/sass/shame/ie.css" />
    <![endif]-->

    <!--[if (gte IE 6)&(lte IE 8)]>
      <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
      <link rel="stylesheet" type="text/css" href="<?php echo get_bloginfo('template_directory'); ?>/sass/shame/ie8.css" />
    <![endif]-->



    <?php get_template_part('typekit') //loads the typekit fonts embed scripts ?>

    <?php wp_head(); ?>
  </head>

  <body class="<?php if( is_front_page() || is_home() || is_single()){ echo ''; } else { echo 'withlogo'; } ?>" <?php body_class(); ?> >

    <header>
    </header>
      <?php get_template_part('partial/ribbon', 'companyinfo'); ?>
      <?php get_template_part('partial/nav', 'main'); ?>