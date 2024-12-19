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
import { useBlockProps, InnerBlocks, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';

import { Button, PanelBody, ToggleControl } from '@wordpress/components';

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
	const { fullSized, backgroundImageURL, backgroundParallax, photoCredit, photoCreditText } = attributes;
	const blockName = 'wp-block-lupus-plugin-header';
	const blockProps = useBlockProps({
        className: `
			${fullSized ? 'full-sized' : ''}
			${backgroundParallax ? 'image-fixed' : ''}
		`,
    });

	const allBlocks = useSelect((select) => {
        const blocks = select('core/blocks').getBlockTypes();
        return blocks.map((block) => block.name);
    }, []);

	const disallowedBlock = 'lupus-plugin/section';
    const allowedBlocks = allBlocks.filter((blockName) => blockName !== disallowedBlock);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'General Settings', 'lupus-plugin' ) }>
					<ToggleControl
						checked={ !! fullSized }
						label={ __(
							'Full-sized',
							'lupus-plugin'
						) }
						help={ __(
							'Whether the header shall cover at least the whole screen height',
							'lupus-plugin'
						) }
						onChange={ () =>
							setAttributes( {
								fullSized: ! fullSized,
							} )
						}
					/>
                </PanelBody>
				<PanelBody title={ __( 'Background Image Settings', 'lupus-plugin' ) }>
					{ (backgroundImageURL!='') && (
							<img src={ backgroundImageURL } style={{ width: '100%' }} />
					) }
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) => {
								setAttributes({ backgroundImageURL: media.url });
							} }
							allowedTypes={['image']}
							render={({ open }) => (
								<Button onClick={ open } variant="secondary" style={{ marginBottom: '16px' }}>
									{ backgroundImageURL
										? __( 'Replace Background Image', 'lupus-plugin' )
										: __( 'Select Background Image', 'lupus-plugin' ) }
								</Button>
							)}
						/>
					</MediaUploadCheck>
					{ (backgroundImageURL) && (
						<>
							<ToggleControl
								checked={ !! backgroundParallax }
								label={ __(
									'Fixed Background',
									'lupus-plugin'
								) }
								help={ __(
									'Whether background shall be attached or move when scrolling. Disabled when client prefers reduced motion',
									'lupus-plugin'
								) }
								onChange={ () =>
									setAttributes( {
										backgroundParallax: ! backgroundParallax,
									} )
								}
							/>
							<ToggleControl
								checked={ !! photoCredit }
								label={ __(
									'Photocredit',
									'lupus-plugin'
								) }
								help={ __(
									'Toggle the photocredit field',
									'lupus-plugin'
								) }
								onChange={ () =>
									setAttributes( {
										photoCredit: ! photoCredit,
									} )
								}
							/>
						</>
					) }
				</PanelBody>
			</InspectorControls>
			<header { ...blockProps }>
				<div className={`${blockName}__inner is-layout-constrained`}>
					<InnerBlocks
						allowedBlocks={allowedBlocks}
						templateLock={false}
					/>
				</div>
				<span className={`${blockName}__image-overlay`}></span>
				{ (backgroundImageURL!='') && (
						<div style={{ backgroundImage: `url(${backgroundImageURL})` }} className={`${blockName}__image-container`} ></div>
				) }
				{ (photoCredit) && (
					<RichText
						tagName="p" 
						className={`${blockName}__photocredit`}
						value={ photoCreditText }
						allowedFormats={ [ 'core/link' ] }
						onChange={(content) => {
							setAttributes({ photoCreditText: content });
						} }
						placeholder={ __( 'Photo Credit' ) }
					/>
				) }
			</header>
		</>
	);
}
