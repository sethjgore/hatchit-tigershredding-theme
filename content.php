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