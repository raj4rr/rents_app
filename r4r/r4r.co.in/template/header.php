<?php
if (!defined('HEADER_INCLUDED')) {
    define('HEADER_INCLUDED', 1);
    // Include analytics tracking scripts
    include_once($_SERVER['DOCUMENT_ROOT'] . '/config/analytics.php');
?>
<link href="/template/style.css" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet">

<header class="site-header">
    <div class="header-top">
        <a href="/" class="logo-wrapper">
            <div class="logo-text"><span>r</span>4r</div>
            <div class="tagline">Right place for Right person&reg;</div>
        </a>
        <ul class="extra-links">
            <li><a href="/mcqs/">MCQs</a></li>
            <li><a href="/blogs/">Articles</a></li>
            <li><a href="/answer/">Answer</a></li>
            <li><a href="/interview-questions-answers/?categoryFilter=Core%20Java%20SUB">Interview Questions</a></li>
        </ul>
    </div>

    <nav class="main-nav">
        <ul class="nav-list">
            <li class="nav-item">
                <a href="#" class="nav-link">C / C++</a>
                <div class="dropdown-menu">
                    <div class="dropdown-category">C Tutorials</div>
                    <a href="/c/c_topics/c_array_basics/" class="dropdown-item">Array Basics</a>
                    <a href="/c/" class="dropdown-item">Learn C in 15 days</a>
                    <div class="dropdown-category">C++</div>
                    <a href="/cpp/" class="dropdown-item">C++ Basics</a>
                </div>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">Java</a>
                <div class="dropdown-menu">
                    <a href="/java/corejava/" class="dropdown-item">Core Java</a>
                    <a href="/java/advancejava/" class="dropdown-item">Advanced Java</a>
                    <a href="/java/jsp/" class="dropdown-item">JSP Tutorials</a>
                </div>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">Frameworks</a>
                <div class="dropdown-menu">
                    <a href="/java/spring/" class="dropdown-item">Spring</a>
                    <a href="/java/hibernate/" class="dropdown-item">Hibernate</a>
                    <a href="/java/struts/" class="dropdown-item">Struts</a>
                </div>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">.NET</a>
                <div class="dropdown-menu">
                    <a href="/c1/" class="dropdown-item">C#</a>
                    <a href="/asp.net/" class="dropdown-item">ASP.NET</a>
                    <a href="/wpf/" class="dropdown-item">WPF / WCF</a>
                </div>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">Database & Web</a>
                <div class="dropdown-menu">
                    <a href="/sql/" class="dropdown-item">SQL</a>
                    <a href="/html/" class="dropdown-item">HTML / CSS / JS</a>
                    <a href="/php/" class="dropdown-item">PHP</a>
                </div>
            </li>
        </ul>
    </nav>
</header>
<?php } ?>
