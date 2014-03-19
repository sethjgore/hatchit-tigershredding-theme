<?php /*
Template Name: Page -- Blog
*/ ?>

<?php get_header(); ?>
<?php get_template_part( 'partial/section', 'pagetitle--blog'); ?>

<div class="block__blog">
  <div class="blog__box">
    <div class="blog__row">

      <!-- BEGIN POSTS SECTION -->
      <div class="blog__posts" id="blog__posts">

      <?php
      while (have_posts()) : the_post();
        get_template_part( 'content', get_post_format() );
      endwhile;
      ?>
      <!-- POST PAGINATION PLUGIN -->

      <!-- END POSTS SECTION -->
      </div>

      <!-- SIDEBAR -->
      <aside role="sidebar" class="blog__sidebar">
        <?php get_sidebar(); ?>
      </aside>
    </div>
  </div>
</div>
<?php get_footer(); ?>