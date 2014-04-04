<?php get_template_part('partial/footer', 'contents'); ?>
<?php get_template_part('partial/acf', 'google-map'); ?>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/script.js"></script>
 <!--[if (gte IE 6)&(lte IE 8)]>
      <script src="<?php echo get_bloginfo('template_directory'); ?>/js/selectivizr.js" /></script>
  <![endif]-->
<?php wp_footer(); ?>
</body>
</html>