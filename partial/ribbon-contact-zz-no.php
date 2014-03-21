<div class="block__contact">
  <div class="contact__box">
    <div class="contact__row">
      <div class="contact__column map__neighbor">
        <p class="contact__message">CALL US TODAY!</p>
        <p class="contact__number">225.303.0125</p>
        <p class="contact__email">
          <a href="mailto:shredla@tigershreddingla.com">
            OR SEND US AN EMAIL!
          </a>
        </p>
      </div>
      <div class="contact__column">
       <?php

          $maplink = get_field('google_maps', 'option');

          if( !empty($maplink) ):
          ?>
          <div class="acf-map">
            <div class="marker" data-lat="<?php echo $maplink['lat']; ?>" data-lng="<?php echo $maplink['lng']; ?>"></div>
          </div>
        <?php endif; ?>
      </div>
    </div>
  </div>
</div>
