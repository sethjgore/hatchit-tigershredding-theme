<section class="block__slogan">
  <div class="slogan__box">
    <div class="slogan__row">
      <div class="slogan__video-box">
        <video class="slogan__video" src="<?php the_field('company_video', 'options'); ?>"></video>

      </div>
      <div class="slogan__message">
        <p>
          <?php the_field('company_slogan', 'options'); ?>
        </p>
        <div class="button--secondary centered">learn more</div>
      </div>
    </div>
  </div>
</section>