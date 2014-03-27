<section class="block__companyinfo">
  <div role="company hours+info" class="companyinfo__box">
    <div class="companyinfo__row">
      <div class="companyinfo__flexbox">
        <ul>
          <a class="withlogo__link" href=""><li class="withlogo__placeholder"></li></a>
          <li class="companyinfo__text companyinfo__first">
            <p class="left"><a href="tel:<?php the_field('phone_number', 'options'); ?>"><?php the_field('phone_number', 'option'); ?></a></p>
            <p class="left"><a href="<?php the_field('google-map', 'option'); ?>"><?php the_field('address_first_line', 'option'); ?> |
            <?php the_field('address_second_line', 'option'); ?></a></p>
          </li>
          <li class="companyinfo__text">
            <p class="right">Monday-Friday  |   8AM-5PM<p>
            <a class="right" href="mailto:shredla@tigershreddingla.com">
              shredla@tigershreddingla.com
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>