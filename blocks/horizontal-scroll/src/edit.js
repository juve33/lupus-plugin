/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';

import { PanelBody, Placeholder, SelectControl, ToggleControl } from '@wordpress/components';

import { useMemo } from '@wordpress/element';

import { useSelect } from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const { background, backgroundFeature, beforeElement, afterElement } = attributes;
	const blockName = 'wp-block-lupus-plugin-section';
	const blockProps = useBlockProps({
        className: `
			${background ? background : ''}
		`,
    });

	const allowedBlocks = [
		'lupus-plugin/section',
	];

	const template = [
		[ 'lupus-plugin/section', {}, [
			[ 'lupus-plugin/subtitle', { placeholder: __( 'Subtitle' ) }],
			[ 'core/heading', { placeholder: __( 'Title' ) }],
			[ 'core/paragraph', { placeholder: __( 'Enter Text...' ) }],
		] ],
		[ 'lupus-plugin/section', {}, [
			[ 'lupus-plugin/subtitle', { placeholder: __( 'Subtitle' ) }],
			[ 'core/heading', { placeholder: __( 'Title' ) }],
			[ 'core/paragraph', { placeholder: __( 'Enter Text...' ) }],
		] ],
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'General Settings', 'lupus-plugin' ) }>
					<SelectControl
						label={ __(
							'Background',
							'lupus-plugin'
						) }
						help={ __(
							'Determine the background of the section',
							'lupus-plugin'
						) }
						value={ background }
						options={ [
							{ label: 'Default', value: '' },
							{ label: 'Alternative Colors', value: 'alternative-colors' },
						] }
						onChange={ ( value ) =>
							setAttributes( {
								background: value,
							} )
						}
					/>
                </PanelBody>
				<PanelBody title={ __( 'Before/After Element Settings', 'lupus-plugin' ) }>
					<ToggleControl
						checked={ !! beforeElement }
						label={ __(
							'Before Element',
							'lupus-plugin'
						) }
						help={ __(
							'Element is not visible and does nothing by default, but maybe your theme does something cool with it',
							'lupus-plugin'
						) }
						onChange={ () =>
							setAttributes( {
								beforeElement: ! beforeElement,
							} )
						}
					/>
					<ToggleControl
						checked={ !! afterElement }
						label={ __(
							'After Element',
							'lupus-plugin'
						) }
						help={ __(
							'Element is not visible and does nothing by default, but maybe your theme does something cool with it',
							'lupus-plugin'
						) }
						onChange={ () =>
							setAttributes( {
								afterElement: ! afterElement,
							} )
						}
					/>
				</PanelBody>
				<PanelBody title={ __( 'Background Settings', 'lupus-plugin' ) }>
					<SelectControl
						label={ __(
							'Background Feature',
							'lupus-plugin'
						) }
						help={ __(
							'Determine the background feature of the section',
							'lupus-plugin'
						) }
						value={ backgroundFeature }
						options={ [
							{ label: 'None', value: '' },
							{ label: 'Pitch', value: 'background-pitch' },
						] }
						onChange={ ( value ) =>
							setAttributes( {
								backgroundFeature: value,
							} )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<div className={`${blockName}__inner is-layout-constrained`}>
					<InnerBlocks
						allowedBlocks={allowedBlocks}
						template={template}
						templateLock={false}
						orientation='horizontal'
					/>
				</div>
			</div>
		</>
	);
}
