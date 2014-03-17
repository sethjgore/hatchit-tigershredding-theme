<div class="blog__info">
  <ul>
    <li class="blog__comments"><?php comments_number('0 Comments','One Comment', '% Comments'); ?></li>
    <li class="blog__tags">
      Tags: <?php
        $posttags = get_the_tags();
        if ($posttags) {
          foreach($posttags as $tag) {
            echo $tag->name . ' ';
          }
        }
        ?>
    </li>
    <li class="blog__share">
      <ul>
        <li class="blog__share--item">Share</li>
        <li class="blog__share--item"><i class="fa fa-twitter fa-2x is__text--c-gray-light"></i></li>
        <li class="blog__share--item"><i class="fa fa-facebook fa-2x is__text--c-gray-light"></i></li>
      </ul>
    </li>
  </ul>
</div>