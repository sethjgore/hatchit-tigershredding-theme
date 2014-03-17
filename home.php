<?php /*
Template Name: Page -- Blog
*/ ?>

<?php get_header(); ?>
<?php get_template_part( 'partial/section', 'pagetitle--blog'); ?>

<div class="block__blog">
  <div class="blog__box">
    <div class="blog__row">

      <!-- BEGIN POSTS SECTION -->
      <div class="blog__posts">

        <?php

          $q = new WP_Query( array( 'posts_per_page' => 4, 'paged' => get_query_var('paged')));

          if ( have_posts() ) : while ( $q -> have_posts() ) : $q -> the_post(); ?>

          <!-- BEGIN POST COMPONENT -->
          <article class="blog__post post-<?php the_ID(); ?>">

            <!-- POST DATE -->
            <?php get_template_part('partial/blog', 'date' ); ?>

            <!-- POST CONTENT BOX -->
            <div class="blog__content">

              <!-- POST TITLE -->
              <h1 class="blog__title"><?php the_title(); ?></h1>

              <!-- POST IMAGE -->
              <div class="blog__image">
                <?php if ( has_post_thumbnail() ) { the_post_thumbnail(); } ?>
              </div>
              <!-- POST ENTRY -->
              <p class="blog__entry"><?php the_content('Read More >'); ?></p>

              <!-- POST INFO -->
              <?php get_template_part('partial/ribbon', 'bloginfo'); ?>

            <!-- END POST CONTENT BOX-->
            </div>

            <!-- EDIT LINK -->
            <!-- <i class="fa fa-edit"><?php edit_post_link(); ?></i> -->

          <!-- END POST COMPONENT -->
          </article>
        <?php endwhile; endif; ?>
      <!-- POST PAGINATION PLUGIN -->

      <?php

        wp_pagenavi( array( 'query' => $q ));
        wp_reset_postdata(); ?>

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