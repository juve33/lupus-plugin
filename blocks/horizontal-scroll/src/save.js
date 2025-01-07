/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

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
	const { background, backgroundFeature, beforeElement, afterElement } = attributes;
	const blockName = useBlockProps.save().className;
	const blockProps = useBlockProps.save({
        className: `
			${background ? background : ''}
			${(backgroundFeature=='background-pitch') ? backgroundFeature : ''}
		`,
    });
	
	return (
		<>
			{ (beforeElement) && (
				<div className={`${blockName}__before ${blockName}__before-after ${background ? background : ''}`}></div>
			) }
			<div { ...blockProps }>
				<div className={`${blockName}__inner is-layout-constrained`}>
					<InnerBlocks.Content />
				</div>
			</div>
			{ (afterElement) && (
				<div className={`${blockName}__after ${blockName}__before-after ${background ? background : ''}`}></div>
			) }
		</>
	);
}
