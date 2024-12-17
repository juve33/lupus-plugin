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

import { Button, PanelBody, SelectControl, TextControl, ToggleControl } from '@wordpress/components';

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
	const { fullSized, background, backgroundImageURL, backgroundParallax, photoCredit, photoCreditText, backgroundFeature, backgroundMessage, beforeElement, afterElement } = attributes;
	const blockName = 'wp-block-lupus-plugin-section';
	const blockProps = useBlockProps({
        className: `
			${fullSized ? 'full-sized' : ''}
			${background ? background : ''}
			${backgroundParallax ? 'image-fixed' : ''}
		`,
    });

	const allBlocks = useSelect((select) => {
        const blocks = select('core/blocks').getBlockTypes();
        return blocks.map((block) => block.name);
    }, []);

	const disallowedBlock = 'lupus-plugin/section';
    const allowedBlocks = allBlocks.filter((blockName) => blockName !== disallowedBlock);

	const generateText = (message) => {
		let text_ = message + ' ';
		let i = 0;
		while ((text_.length < 60) || ((i % 2) == 0)) {
			text_ += message + ' ';
			i++;
		}
		return text_;
	};

	const text = useMemo(() => generateText(backgroundMessage), [backgroundMessage]);

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
							'Whether the section shall cover at least the whole screen height',
							'lupus-plugin'
						) }
						onChange={ () =>
							setAttributes( {
								fullSized: ! fullSized,
							} )
						}
					/>
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
							{ label: 'Image', value: 'image' },
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
				{ (background!='image') && (
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
								{ label: 'Logo', value: 'background-logo' },
								{ label: 'Message', value: 'background-message' },
							] }
							onChange={ ( value ) =>
								setAttributes( {
									backgroundFeature: value,
								} )
							}
						/>
						{ (backgroundFeature=='background-message') && (
							<TextControl
								label={ __(
									'Background Message',
									'lupus-plugin'
								) }
								help={ __(
									'Set the message that is shown in the background of the section',
									'lupus-plugin'
								) }
								value={ backgroundMessage }
								onChange={ ( value ) =>
									setAttributes( {
										backgroundMessage: value,
									} )
								}
							/>
						) }
					</PanelBody>
				) }
				{ (background=='image') && (
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
				) }
			</InspectorControls>
			<section { ...blockProps }>
				<div className={`${blockName}__inner`}>
					<InnerBlocks
						allowedBlocks={allowedBlocks}
						templateLock={false}
					/>
				</div>
				{ ((background!='image') && (backgroundFeature=='background-logo')) && (
					<div className={`${blockName}__logo-container`}></div>
				) }
				{ ((background!='image') && (backgroundFeature=='background-message') && (backgroundMessage!='')) && (
					<div className={`${blockName}__message-container`}>
						{ Array.from({ length: 3 }).map((_, i) => (
							<div key={`group-${i}`} className={`${blockName}__message-group`}>
								{ Array.from({ length: 3 }).map((_, j) => (
									<div key={`line-${i}-${j}`} className={`${blockName}__message-line`}>
										{ Array.from({ length: 3 }).map((_, k) => (
											<div key={`line-inner-${i}-${j}-${k}`} className={`${blockName}__message-line__inner`}>{ text }</div>
										)) }
									</div>
								)) }
							</div>
						)) }
					</div>
				) }
				{ (background=='image') && (
					<>
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
					</>
				) }
			</section>
		</>
	);
}
