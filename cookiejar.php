<?php /*
Template Name: Page -- Cookie Jar
*/ ?>
<?php get_template_part( 'header--blank' ); ?>
<div class="traffic-light"></div>

  <?php get_template_part('partial/nav', 'main'); ?>

  <?php get_template_part( 'partial/ribbon','services--manual'); ?>

  <?php get_template_part( 'partial/section','slogan'); ?>

  <?php get_template_part( 'partial/ribbon','contact'); ?>

  <?php get_template_part( 'partial/ribbon','testmonial'); ?>


<div><h1>All Available Options</h1></div>

<?php get_template_part( 'cookiejar--fields' ); ?>

<div>
  <h1>Menu of Services Only</h1>

  <?php wp_nav_menu( array( 'theme_location' => 'services-ribbon-menu') ); ?>
</div>

<?php get_footer(); ?>