<div>
  <h1>
    services banner
  </h1>
</div>

<section class="is__background--c-main">
  <div class="block__services--ribbon">
    <div class="services--row">
      <?php wp_nav_menu( array( 'theme_location' => 'services-ribbon-menu-left', 'container_class' => 'services--column' ) ); ?>
      <div class="services__logo">
        <div class="site-logo"></div>
      </div>
      <?php wp_nav_menu( array( 'theme_location' => 'services-ribbon-menu-right', 'container_class' => 'services--column' ) ); ?>
    </div>
  </div>
</section>