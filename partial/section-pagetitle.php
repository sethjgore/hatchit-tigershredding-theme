 <div class="block__pagetitle">
   <div class="pagetitle__box">
    <div class="pagetitle__title">
      <h1 class="pagetitle__text">
        <?php

          $alt_title = get_field('alt_title');

          if( $alt_title ){
            the_field('alt_title');
          }
          else{
            echo get_the_title();
          }
          ?>
        </h1>
      <p class="pagetitle__subtitle" role="subtitle"><?php the_field('page_subtitle'); ?></p>
    </div>
    <!--[if!IE]><!-->
    <div class="shredprocess__box">
      <div class="shredprocess__row">
        <div class="shredprocess__item">
          <img src="<?php bloginfo('template_url'); ?>/img/shredprocess/collect.svg" class="shredprocess__image"></img>
          <h3 class="shredprocess__text">Collect</h3>
        </div>
        <div class="shredprocess__item">
          <img src="<?php bloginfo('template_url'); ?>/img/shredprocess/secure.svg" class="shredprocess__image"></img>
          <h3 class="shredprocess__text">Secure</h3>
        </div>
        <div class="shredprocess__item">
          <img src="<?php bloginfo('template_url'); ?>/img/shredprocess/shred.svg" class="shredprocess__image"></img>
          <h3 class="shredprocess__text">Shred</h3>
        </div>
        <div class="shredprocess__item">
          <img src="<?php bloginfo('template_url'); ?>/img/shredprocess/recycle.svg" class="shredprocess__image"></img>
          <h3 class="shredprocess__text">Recycle</h3>
        </div>
      </div>
    </div>
    <!--<![endif]-->

    <!--[if IE]>
      <div class="shredprocess__box">
        <div class="shredprocess__row">
          <div class="shredprocess__item">
            <img src="<?php bloginfo('template_url'); ?>/img/shredprocess/collect.png" class="shredprocess__image"></img>
            <h3 class="shredprocess__text">Collect</h3>
          </div>
          <div class="shredprocess__item">
            <img src="<?php bloginfo('template_url'); ?>/img/shredprocess/secure.png" class="shredprocess__image"></img>
            <h3 class="shredprocess__text">Secure</h3>
          </div>
          <div class="shredprocess__item">
            <img src="<?php bloginfo('template_url'); ?>/img/shredprocess/shred.png" class="shredprocess__image"></img>
            <h3 class="shredprocess__text">Shred</h3>
          </div>
          <div class="shredprocess__item">
            <img src="<?php bloginfo('template_url'); ?>/img/shredprocess/recycle.png" class="shredprocess__image"></img>
            <h3 class="shredprocess__text">Recycle</h3>
          </div>
        </div>
      </div>
    <![endif]-->
   </div>
 </div>
