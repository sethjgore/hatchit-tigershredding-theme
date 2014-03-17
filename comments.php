<?php if ( 'comments.php' == basename( $_SERVER['SCRIPT_FILENAME'] ) ) return; ?>
<section id="comments">
  <?php
    if ( have_comments() ) :
    global $comments_by_type;
    $comments_by_type = &separate_comments( $comments );
    if ( ! empty( $comments_by_type['comment'] ) ) :
    ?>

    <section id="comments-list" class="block__comments">
      <h3 class="comments__title"><?php comments_number(); ?></h3>
        <?php if ( get_comment_pages_count() > 1 ) : ?>
          <nav id="comments-nav-above" class="comments-navigation" role="navigation">
            <div class="paginated-comments-links"><?php paginate_comments_links(); ?></div>
          </nav>
        <?php endif; ?>

      <ul class="comments__single">
        <?php wp_list_comments('type=comment&callback=mytheme_comment'); ?>
      </ul>

      <?php if ( get_comment_pages_count() > 1 ) : ?>
        <nav id="comments-nav-below" class="comments-navigation" role="navigation">
          <div class="paginated-comments-links"><?php paginate_comments_links(); ?></div>
        </nav>
      <?php endif; ?>

    </section>

      <?php
      endif;
      if ( ! empty( $comments_by_type['pings'] ) ) :
      $ping_count = count( $comments_by_type['pings'] );
      ?>

      <?php
        endif;
        endif;
      ?>

  <div class="comments__form" >
    <?php

    $customForm = array(
    'id_form'           => 'commentform',
    'id_submit'         => 'submit',
    'title_reply'       => __( 'Leave a Comment' ),
    'title_reply_to'    => __( 'Leave a Reply to %s' ),
    'cancel_reply_link' => __( 'Cancel Reply' ),
    'label_submit'      => __( 'Send' ),

    'comment_field' =>  '<div class="cform__field"><label for="comment">' .
      '</label><textarea class="cform__field" placeholder="Your Comment" id="comment" name="comment" cols="45" rows="8" aria-required="true">' .
      '</textarea></div>',

    'must_log_in' => '<p class="must-log-in">' .
      sprintf(
        __( 'You must be <a href="%s">logged in</a> to post a comment.' ),
        wp_login_url( apply_filters( 'the_permalink', get_permalink() ) )
      ) . '</p>',

    'logged_in_as' => '<p class="logged-in-as">' .
      sprintf(
      __( 'Logged in as <a href="%1$s">%2$s</a>. <a href="%3$s" title="Log out of this account">Log out?</a>' ),
        admin_url( 'profile.php' ),
        $user_identity,
        wp_logout_url( apply_filters( 'the_permalink', get_permalink( ) ) )
      ) . '</p>',

    'comment_notes_before' => '',

    'comment_notes_after' => '',

    'fields' => apply_filters( 'comment_form_default_fields', array(

      'author' =>
        '<div class="cform__author">' .
        '<label for="author">' . '</label> ' .
        ( $req ? '<span class="required"></span>' : '' ) .
        '<input id="author" name="author" placeholder="Name *" type="text" value="' . esc_attr( $commenter['comment_author'] ) .
        '" size="30"' . $aria_req . ' /></div>',

      'email' =>
        '<div class="cform__email"><label for="email">' . '</label> ' .
        ( $req ? '<span class="required"></span>' : '' ) .
        '<input  id="email" name="email" placeholder="Email *" type="text" value="' . esc_attr(  $commenter['comment_author_email'] ) .
        '" size="30"' . $aria_req . ' /></div>',

      'url' =>
        '',

      ''
      )
    ),
  );
    comment_form($customForm);
    ?>
  </div>
</section>