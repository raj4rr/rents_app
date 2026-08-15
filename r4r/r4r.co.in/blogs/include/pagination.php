<?php $base = strtok($_SERVER["REQUEST_URI"], '?'); ?> <!--sets the delimiter in url with '?' so that ?page=1 not repeat-->

<nav>
    <ul class="pagination">
        <li class="page-item">
            <?php if ($paginator->previous): ?>
                <a class="page-link" href="<?= $base; ?>?page=<?= $paginator->previous; ?>">Previous</a>
            <?php else: ?>
                <span class="page-link">Previous</span>
            <?php endif; ?>
        </li>
        <?php $page= $paginator->n_page; $totoalPages= $paginator->total_page; ?>

        <?php for($i = $page; $i <= $page + 3; $i++ ): ?>
   <?php
            if($page < $totoalPages - $i){ ?>
                <li class="page-item <?php if($page == $i) {echo 'active'; } ?>">
                    <a class="page-link" href="<?= $base; ?>?page=<?php echo $i; ?>"> <?php echo $i; ?> </a>
                </li>
            <?php }
   ?>
   <?php endfor; ?>
   <li class="page-item">
      <span>....</span>
   </li>
   <?php for($i = 0; $i <= 3; $i++ ): ?>
   <?php
            if($totoalPages > $page - 4 -  $i){ ?>
                <li class="page-item <?php if($page == $totoalPages - (4 - $i)) {echo 'active'; } ?>">
                    <a class="page-link" href="<?= $base; ?>?page=<?php echo $totoalPages - (4 - $i); ?>"> <?php echo $totoalPages - (4 - $i); ?> </a>
                </li>
            <?php }
   ?>
   <?php endfor; ?>

        <li class="page-item">
            <?php if ($paginator->next): ?>
                <a class="page-link" href="<?= $base; ?>?page=<?= $paginator->next; ?>">Next</a>
            <?php else: ?>
                <span class="page-link">Next</span>
            <?php endif; ?>
        </li>
    </ul>
</nav>
