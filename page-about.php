<?php /*
Template Name: Page -- About
*/ ?>

<?php get_header(); ?>

<div class="block__pagetitle">
  <div class="pagetitle__box">
    <div class="pagetitle__title about">
      <h1 class="pagetitle__text"><?php echo get_the_title(); ?></h1>
    </div>
  </div>
</div>

<div class="block__about">
  <div class="pagecontent__box">
    <div class="row">
      <?php if(get_field('about')): ?>
        <?php while( has_sub_field('about')): ?>
          <div class="about__company-box">
            <img class="about__image" src="<?php the_sub_field('image'); ?>">
            <h2 class="about__heading"><?php the_sub_field('heading'); ?></h2>
            <p class="about__copy is__text--c-gray"><?php the_sub_field('copy'); ?></p>
          </div>
        <?php endwhile ?>
      <?php endif?>
    </div>
  </div>
</div>


<?php
    if( get_field('about_features')): ?>

      <?php
      while( has_sub_field('about_features')): ?>
        <section class="block__pagecontent <?php the_sub_field('background_color');?>">
          <div class="pagecontent__box">
            <div class="pagecontent__row">

              <div class="pagecontent__image">
                <img src="<?php the_sub_field('image'); ?>">
              </div>

              <div class="pagecontent__content">

                <h1 class="pagecontent__title">
                  <?php the_sub_field('heading'); ?>
                </h1>

                <p class="about__copy">
                  <?php the_sub_field('text'); ?>
                </p>

                <?php if( get_sub_field('list')): ?>
                  <div class="about__list--left">
                    <ul>
                      <?php while( has_sub_field('list')): ?>
                        <li><?php the_sub_field('item'); ?></li>
                      <?php endwhile; ?>
                    </ul>
                  </div>
                <?php endif; ?>

                <?php if( get_sub_field('list_2')): ?>
                  <div class="about__list--right">
                    <ul>
                      <?php while( has_sub_field('list_2')): ?>
                        <li><?php the_sub_field('item'); ?></li>
                      <?php endwhile; ?>
                    </ul>
                  </div>
                <?php endif; ?>
                <p class="about__text-extra">
                  <?php the_sub_field('text_extra'); ?>
                </p>
              </div>
            </div>
          </div>
        </section>

      <?php endwhile; ?>
    <?php endif; ?>

  <?php get_template_part( 'partial/ribbon','contact'); ?>

<?php get_footer(); ?>
