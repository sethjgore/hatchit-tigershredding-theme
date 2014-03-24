<footer class="zz_black">
  <div class="footer__box">
    <div class="footer__row">
      <div class="footer__contact">
        <small class="footer__contact--heading">
          CONTACT
        </small>
        <ul class="footer__contact--list">
          <li><?php the_field('address_first_line', 'options'); ?></li>
          <li><?php the_field('address_second_line', 'options'); ?></li>
          <li><a href="tel:<?php the_field('phone_number', 'options'); ?>"><?php the_field('phone_number', 'options'); ?></a></li>
        </ul>
        <small class="footer__contact--heading">
          <a href="mailto:jobs@tigershreddingla.com">JOBS</a>
        </small>
      </div>
      <div class="footer__logo-box">
      <div class="footer__logo">
          <div role="logo-image" class="site-logo--image--dark"></div>
        </div>
        <div role="social-links" class="footer__social-box fa-stack fa-lg">
          <ul>
            <li><a href="" title="Twitter">
               <i class="fa fa-twitter is__text--c-secondary is__text--centered"></i>
            </a></li>
            <li><a href="" title="Linked In">
               <i class="fa fa-linkedin is__text--c-secondary is__text--centered"></i>
            </a></li>
            <li><a href="" title="Facebook">
               <i class="fa fa-facebook is__text--c-secondary is__text--centered"></i>
            </a></li>
          </ul>
        </div>
      </div>
      <div class="footer__menu">
           <?php wp_nav_menu( array(
                'theme_location' => 'main-menu',
                'container' => '',
                'menu_class' => 'footer__list',
                ) ); ?>
      </div>
    </div>
  </div>
</footer>