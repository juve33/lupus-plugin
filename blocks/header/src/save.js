/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save( { attributes } ) {
	const { fullSized, backgroundImageURL, backgroundParallax, photoCredit, photoCreditText } = attributes;
	const blockName = useBlockProps.save().className;
	const blockProps = useBlockProps.save({
        className: `
			${fullSized ? 'full-sized' : ''}
			image
			${backgroundParallax ? 'image-fixed' : ''}
		`,
    });

	return (
		<>
			<header { ...blockProps }>
				<div className={`${blockName}__inner is-layout-constrained`}>
					<InnerBlocks.Content />
				</div>
				<span className={`${blockName}__image-overlay`}></span>
				{ (backgroundImageURL!='') && (
						<div style={{ backgroundImage: `url(${backgroundImageURL})` }} className={`${blockName}__image-container`} ></div>
				) }
				{ ((photoCredit) && (photoCreditText!='')) && (
					<RichText.Content
						tagName="p"
						className={`${blockName}__photocredit`}
						value={ photoCreditText }
					/>
				) }
			</header>
		</>
	);
}
