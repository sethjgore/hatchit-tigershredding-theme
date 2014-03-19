<div id="slider" class="block__slider owl-carousel">
  <div class="slider__item" style="background: url('<?php bloginfo('url'); ?>/wp-content/uploads/2014/02/bg__pagetitle.jpg') center center; background-size: cover;">
      <div class="slider__box">
        <div class="slider__column Center first-slide">
          <div class="slider__title">
            <img src="<?php echo get_bloginfo('template_directory'); ?>/img/site-wide/site-logo.png">
          </div>
          <div class="slider__message is__text--c-black">Tiger Shredding provides secure, high volume shredding <br> services for a wide variety of industries.</div>

            <div class="slider__button">
              <a href="<?php bloginfo('url'); ?>/about">SHRED</a>
            </div>
        </div>
      </div>
    </div>
  <?php while(has_sub_field('front_slider')): ?>
    <div class="slider__item" style="background: url('<?php the_sub_field('image'); ?>') center center; background-size: cover;">
      <div class="slider__box">
        <div class="slider__column <?php the_sub_field('text_position'); ?>">
          <div class="slider__title <?php the_sub_field('title_color'); ?>">
          <img src="<?php the_sub_field('title_image'); ?>">
          <?php the_sub_field('title'); ?></div>
          <div class="slider__message first"><?php the_sub_field('message'); ?></div>

            <div class="slider__button <?php the_sub_field('button_color'); ?>">
              <a href="<?php the_sub_field('which_page'); ?>"><?php the_sub_field('button'); ?></a>
            </div>
        </div>
      </div>
    </div>
  <?php endwhile; ?>
</div>