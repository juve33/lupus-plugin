<?php
/**
 * Plugin Name: Lupus Plugin
 * Description: Lupus Plugin is a plugin made for FC St. Pauli Werewolves.
 * Version: 0.1
 * Requires at least: 6.6.2
 * Requires PHP: 8.1.29
 * Author: Julian Velling
 * Author URI: https://github.com/juve33
 * License: MIT License
 * License URI: https://github.com/juve33/lupus-plugin/blob/main/LICENSE
 * Text Domain: lupus-plugin
 * 
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}



function create_blocks_init() {

	register_block_type( __DIR__ . '/blocks/header/build' );
	register_block_type( __DIR__ . '/blocks/section/build' );

}

add_action( 'init', 'create_blocks_init' );



function lupusplugin_customize_register( $wp_customize ) {

	$wp_customize->add_setting(
        'alternative_logo',
        array()
    );
    $wp_customize->add_control(
        new WP_Customize_Media_Control(
            $wp_customize,
            'alternative_logo',
            array(
                'label' => 'Alternative Logo',
                'description' => 'Logo that replaces the main logo in sections with a logo as background',
                'section' => 'title_tagline',
                'settings' => 'alternative_logo',
                'mime_type' => 'image'
            )
        )
    );

}

add_action('customize_register', 'lupusplugin_customize_register');



wp_enqueue_style('lupusplugin-variables', WP_PLUGIN_DIR . '/blocks/section/build/style-index.css');
wp_add_inline_style('lupusplugin-variables', ':root { --wp-support-bar: 0px"); } .customize-support { --wp-support-bar: 32px"); }');
wp_add_inline_style('lupusplugin-variables', ':root { --wp-logo-url: url("' . admin_url('images/wordpress-logo.svg') . '"); }');

if( function_exists( 'the_custom_logo' ) ) {

	$custom_logo_id = get_theme_mod( 'custom_logo' );
	$logo = wp_get_attachment_image_src( $custom_logo_id, 500 );

	if ( $logo ) {
		wp_add_inline_style('lupusplugin-variables', ':root { --logo-src: url("' . $logo[0] . '"); }');
	}

}

$alternative_custom_logo_id = get_theme_mod( 'alternative_logo' );
$alternative_logo = wp_get_attachment_image_src( $alternative_custom_logo_id, 500 );

if ( $alternative_logo ) {
	wp_add_inline_style('lupusplugin-variables', ':root { --alternative-logo-src: url("' . $alternative_logo[0] . '"); }');
}