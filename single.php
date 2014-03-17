<?php /*
Template Name: Blog Post
*/ ?>

<?php get_header(); ?>
<?php get_template_part( 'partial/section', 'pagetitle--blog'); ?>

<div class="block__blog single">
  <div class="blog__box">
    <div class="blog__row">


      <!-- BEGIN POSTS SECTION -->
      <div class="blog__posts">
        <?php if ( have_posts() ) : while (have_posts() ) : the_post(); ?>

          <!-- BEGIN POST COMPONENT -->
          <article class="blog__post post-<?php the_ID(); ?>">

             <!-- POST DATE -->
            <?php get_template_part('partial/blog', 'date' ); ?>

            <!-- POST CONTENT BOX -->
            <div class="blog__content">

              <!-- POST TITLE -->
              <h1 class="blog__title"><?php the_title(); ?></h1>

              <!-- POST INFO -->
              <?php get_template_part('partial/ribbon', 'bloginfo'); ?>

              <!-- POST IMAGE -->
              <div class="blog__image">
                <?php if ( has_post_thumbnail() ) { the_post_thumbnail(); } ?>
              </div>
              <!-- POST ENTRY -->
              <p class="blog__entry"><?php the_content('Read More >'); ?></p>

            <!-- END POST CONTENT BOX-->
            </div>

            <!-- EDIT LINK -->
            <!-- <i class="fa fa-edit"><?php edit_post_link(); ?></i> -->

          <!-- END POST COMPONENT -->
          </article>
        <?php endwhile; endif; ?>

        <?php get_template_part('partial/ribbon', 'pagination--single'); ?>
        <?php comments_template(); ?>



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