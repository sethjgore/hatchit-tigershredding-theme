<?php /*
Template Name: Page -- Front
*/ ?>

<?php get_header(); ?>

  <?php get_template_part( 'partial/section','slider'); ?>

  <?php get_template_part( 'partial/ribbon','services--manual'); ?>

  <?php get_template_part( 'partial/section','badges'); ?>

  <?php get_template_part( 'partial/section','slogan'); ?>

  <?php get_template_part( 'partial/ribbon','contact'); ?>

  <?php get_template_part( 'partial/section','bloglist'); ?>

  <?php get_template_part( 'partial/ribbon','testmonial'); ?>

<?php get_footer(); ?>
