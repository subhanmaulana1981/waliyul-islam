<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - Support Railway & Local Laragon ** //
if (getenv('DATABASE_URL') || getenv('MYSQL_URL')) {
    $db_url = parse_url(getenv('DATABASE_URL') ?: getenv('MYSQL_URL'));
    define( 'DB_NAME', ltrim($db_url['path'] ?? '', '/') );
    define( 'DB_USER', $db_url['user'] ?? 'root' );
    define( 'DB_PASSWORD', $db_url['pass'] ?? '' );
    define( 'DB_HOST', ($db_url['host'] ?? 'localhost') . (isset($db_url['port']) ? ':' . $db_url['port'] : '') );
} else {
    define( 'DB_NAME', getenv('MYSQLDATABASE') ?: (getenv('MYSQL_DATABASE') ?: 'db_waliyul_islam') );
    define( 'DB_USER', getenv('MYSQLUSER') ?: (getenv('MYSQL_USER') ?: 'root') );
    define( 'DB_PASSWORD', getenv('MYSQLPASSWORD') ?: (getenv('MYSQL_PASSWORD') ?: '') );
    define( 'DB_HOST', (getenv('MYSQLHOST') || getenv('MYSQL_HOST')) 
        ? (getenv('MYSQLHOST') ?: getenv('MYSQL_HOST')) . ':' . (getenv('MYSQLPORT') ?: getenv('MYSQL_PORT') ?: '3306')
        : 'localhost' 
    );
}

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

// Detect HTTPS behind Railway / Cloud reverse proxy
if ((isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https') ||
    (isset($_SERVER['HTTP_X_FORWARDED_SSL']) && $_SERVER['HTTP_X_FORWARDED_SSL'] === 'on')) {
    $_SERVER['HTTPS'] = 'on';
}

// Dynamic Site URL & Home URL for Railway deployment
if (isset($_SERVER['HTTP_HOST'])) {
    $scheme = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on') ? 'https://' : 'http://';
    define('WP_HOME', $scheme . $_SERVER['HTTP_HOST']);
    define('WP_SITEURL', $scheme . $_SERVER['HTTP_HOST']);
}

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'Z&;|Mb_!E;NN,0azz~Z,I6-xo9)$ =.IHU#@8JU#8u.7EdFvn*f}O:?0D=qs0=f:' );
define( 'SECURE_AUTH_KEY',  '#>UCOFv&`yoRZ34xLe.qaxh!$WlZ,H;x-0r;+]dY+e2a=E`x4*UDTE1vlvvoFetn' );
define( 'LOGGED_IN_KEY',    '^L!MNY*otbeRHAMVv,}RJ8[,e?[89 {L@Pbm^Qz{kIey!?#~{R4FSP|Ce|+tu3UL' );
define( 'NONCE_KEY',        'x9|LTES$P|Eo5$4^<~uYIx %t|_X^}KR)YajYW>k!*xG(:jUc/7cM+!F#M[E`2Y?' );
define( 'AUTH_SALT',        'J_=FX{.HC;rOBM:hRocX@OK0#}Mup!a:wrTE L$&WKr!P+.J:auB7x.k|)K<sI?^' );
define( 'SECURE_AUTH_SALT', '!`oIBx+7 0owmiy!K#EJIS#k<+W >6.Qc1g;MR%?1t#|5%i Lt3~#Vvfvy.[XgA[' );
define( 'LOGGED_IN_SALT',   'IQGm5zxHW:/rYpu,R79XiIdOTBtc?c(U%5r%!!tk1>0< hx;mG=v}]WU{L):1pkg' );
define( 'NONCE_SALT',       '1>|T!]&)KnP5YuBTIC28x`oK_:rK9a-U@S~0-Y}K+d~!U;.:pmU*C;0Abn+8gGWb' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



define( 'SURECART_ENCRYPTION_KEY', '^L!MNY*otbeRHAMVv,}RJ8[,e?[89 {L@Pbm^Qz{kIey!?#~{R4FSP|Ce|+tu3UL' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
