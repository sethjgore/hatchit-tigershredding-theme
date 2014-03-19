<div class="block__bloglist">
  <div class="bloglist__row">
    <?php query_posts('posts_per_page=3'); ?>
    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
    <div class="bloglist__item">
      <a href="<?php the_permalink() ?>" role="blog-link">
        <h4 class="bloglist__title"><?php the_title(); ?></h4>
        <p class="blog__snippet"><?php the_excerpt(); ?></p>
        <span class="bloglist__readmore">Read More</span>
      </a>
    </div>
    <?php endwhile;?>
    <?php endif; ?>
  </div>
</div>