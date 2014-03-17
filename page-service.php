<?php /*
Template Name: Page -- Service
*/ ?>

<?php get_header(); ?>

  <?php get_template_part( 'partial/section','pagetitle'); ?>

  <?php get_template_part( 'partial/section','slogan'); ?>

  <?php get_template_part( 'partial/ribbon','contact'); ?>
    <?php
    if( get_field('section')): ?>

      <?php
      while( has_sub_field('section')): ?>
        <section class="block__pagecontent <?php the_sub_field('background_color'); ?>">
          <div class="pagecontent__box">
            <div class="pagecontent__row">

              <div class="pagecontent__image">
                <img src="<?php the_sub_field('section_image'); ?>">
              </div>

              <div class="pagecontent__content">
                <h1 class="pagecontent__title"><?php the_sub_field('section_title'); ?></h1>

                  <?php if( get_sub_field('section_content_box')): ?>
                    <?php while( has_sub_field('section_content_box')): ?>

                      <h2 class="pagecontent__subheading">
                        <?php the_sub_field('section_content_subheading'); ?>
                      </h2>

                      <p class="pagecontent__text">
                        <?php the_sub_field('section_content_text'); ?>
                      </p>

                    <?php endwhile; ?>
                  <?php endif; ?>

              </div>
            </div>
          </div>
        </section>

      <?php endwhile; ?>
    <?php endif; ?>
<?php get_footer(); ?>
