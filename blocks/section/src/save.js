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
	const { fullSized, background, backgroundImageURL, backgroundParallax, photoCredit, photoCreditText, backgroundFeature, backgroundMessage } = attributes;
	const blockName = useBlockProps.save().className;
	const blockProps = useBlockProps.save({
        className: `
			${fullSized ? 'full-sized' : ''}
			${background ? background : ''}
			${((background!='image') && (backgroundFeature=='background-logo')) ? backgroundFeature : ''}
			${backgroundParallax ? 'image-fixed' : ''}
		`,
    });

	const generateText = (message) => {
		if (!message) return '';
		let text_ = message + '&#160;';
		let i = 1;
		while (((text_.length - 6 * i) < 60) || ((i % 2) == 0)) {
			text_ += message + '&#160;';
			i++;
		}
		return text_;
	};
	
	const text = generateText(backgroundMessage);

	return (
		<>
			<div className={`${blockName}__before ${background ? background : ''}`}></div>
			<section { ...blockProps }>
				<div className={`${blockName}__inner`}>
					<InnerBlocks.Content />
				</div>
				{ ((background!='image') && (backgroundFeature=='background-logo')) && (
					<div className={`${blockName}__logo-container`}></div>
				) }
				{ ((background!='image') && (backgroundFeature=='background-message') && (backgroundMessage!='')) && (
					<div aria-hidden='true' className={`${blockName}__message-container`}>
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
						{ ((photoCredit) && (photoCreditText!='')) && (
							<RichText.Content
								tagName="p"
								className={`${blockName}__photocredit`}
								value={ photoCreditText }
							/>
						) }
					</>
				) }
			</section>
			<div className={`${blockName}__after ${background ? background : ''}`}></div>
		</>
	);
}
