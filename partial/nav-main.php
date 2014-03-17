<section class="is__background--c-secondary">
  <nav role="navigation">
    <div class="row nav__mobile-box">
      <div class="nav__mobile-logo">
        <h1 class="nav__mobile--title">
          DIXIE PAPER
        </h1>
      </div>
      <div class="nav__mobile--icon">
      <input type="checkbox" class="nav__mobile-checkbox" id="nav-toggle">
      <label class="nav__mobile-toggle fa fa-bars is__text--c-main" for="nav-toggle" onclick>
      </label>
      </div>
    </div>
    <div class="row">
      <div class="nav__flexbox">
        <?php wp_nav_menu( array( 'theme_location' => 'main-menu' ) ); ?>
      </div>
    </div>
  </nav>
</section>