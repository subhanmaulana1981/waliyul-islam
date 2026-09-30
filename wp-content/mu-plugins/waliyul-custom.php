<?php
/**
 * Plugin Name: Waliyul Islam Custom Assets
 * Description: Custom CSS & JS for Hero Background Slider and layout tweaks.
 */

if (!defined('ABSPATH')) exit;

add_action('wp_head', function() {
    ?>
    <style id="waliyul-custom-hero-css">
        .waliyul-hero-group {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
        }
        .waliyul-hero-wrapper {
            box-sizing: border-box;
            width: 100%;
            position: relative;
            overflow: hidden;
            background-color: #1E5128;
            color: #ffffff;
            padding: 190px 24px 95px 24px;
            min-height: 540px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .waliyul-hero-slider {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            overflow: hidden;
        }
        .waliyul-slide {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center center;
            opacity: 0;
            transform: scale(1.06);
            transition: opacity 1.2s ease-in-out, transform 6s ease-out;
            pointer-events: none;
        }
        .waliyul-slide.active {
            opacity: 1;
            transform: scale(1);
        }
        .waliyul-hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(16, 44, 23, 0.85) 0%, rgba(30, 81, 40, 0.80) 50%, rgba(12, 34, 18, 0.88) 100%);
            z-index: 2;
            pointer-events: none;
        }
        .waliyul-hero-content {
            position: relative;
            z-index: 3;
            max-width: 1140px;
            margin: 0 auto;
            text-align: center;
            width: 100%;
        }
        .waliyul-hero-dots {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
            margin-top: 25px;
            position: relative;
            z-index: 3;
        }
        .waliyul-dot {
            width: 30px;
            height: 6px;
            border-radius: 4px;
            border: none;
            background-color: rgba(255, 255, 255, 0.4);
            cursor: pointer;
            padding: 0;
            transition: all 0.3s ease;
            outline: none;
        }
        .waliyul-dot.active {
            background-color: #C5A880;
            width: 46px;
        }
        .waliyul-dot:hover {
            background-color: #ffffff;
        }
        @media (max-width: 768px) {
            .waliyul-hero-wrapper {
                padding: 140px 18px 70px 18px !important;
                min-height: auto;
            }
            .waliyul-hero-content h1 {
                font-size: 28px !important;
            }
            .waliyul-hero-content p {
                font-size: 16px !important;
            }
        }
    </style>
    <?php
}, 100);

add_action('wp_footer', function() {
    ?>
    <script id="waliyul-custom-hero-js">
        document.addEventListener('DOMContentLoaded', function() {
            var currentSlide = 0;
            var slideInterval = null;
            var slides = document.querySelectorAll('.waliyul-slide');
            var dots = document.querySelectorAll('.waliyul-dot');

            if (!slides || slides.length === 0) return;

            window.waliyulSetSlide = function(index) {
                if (!slides.length) return;
                currentSlide = (index + slides.length) % slides.length;
                for (var i = 0; i < slides.length; i++) {
                    if (i === currentSlide) {
                        slides[i].classList.add('active');
                    } else {
                        slides[i].classList.remove('active');
                    }
                }
                for (var j = 0; j < dots.length; j++) {
                    if (j === currentSlide) {
                        dots[j].classList.add('active');
                    } else {
                        dots[j].classList.remove('active');
                    }
                }
                resetInterval();
            };

            function nextSlide() {
                window.waliyulSetSlide(currentSlide + 1);
            }

            function resetInterval() {
                if (slideInterval) clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            }

            resetInterval();
        });
    </script>
    <?php
}, 100);
