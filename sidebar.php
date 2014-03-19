<div class="component__sidebar" id="sidebar" role="complementary">
  <div></div>
  <?php if ( is_active_sidebar( 'primary-widget-area' ) ) : ?>
    <div id="primary" class="widget-area">
      <ul>
        <?php dynamic_sidebar( 'primary-widget-area' ); ?>
      </ul>
    </div>
  <?php endif; ?>
</div>