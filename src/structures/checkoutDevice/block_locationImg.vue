<template>
	<div
		class="my-canvas-wrapper"
	>
		<canvas
			ref="my-canvas"
			@click="onClick"
		>
		</canvas>
		<slot></slot>
	</div>
</template>

<script>
import config from '@/store/config';
export default {
	props: ['imageURL', 'internalPos', 'selectable', 'useOfficeMap', 'radius'],
	model: {
		prop: 'internalPos',
		event: 'click'
	},
	data() {
		return {
			context: 		null,
			parentWidth:	null,
			parentHeight:	null,
			image:			null,
			imageRatio:		null,
			xOffset:		null,
			yOffset:		null,
		}
	},
	methods: {
		onClick(event) {
			if (this.selectable) {
				var xPos = parseInt((event.offsetX - this.xOffset) / this.imageRatio);
				var yPos = parseInt((event.offsetY - this.yOffset) / this.imageRatio);
	// 			console.log({x: xPos, y: yPos});
				this.$emit('click', {x: xPos, y: yPos});
			}
		},
		updateCircle() {
			this.context.clearRect(0, 0, this.parentWidth, this.parentHeight);
			this.context.drawImage(this.image, this.xOffset, this.yOffset, (this.image.naturalWidth * this.imageRatio),(this.image.naturalHeight * this.imageRatio));

			if (!this.internalPos) return;
			this.context.strokeStyle = "#FF0000";
			this.context.lineWidth = 5;
// 			this.context.strokeRect(50, 50, 100, 100);
			this.context.beginPath();
			this.context.arc(this.internalPos.x * this.imageRatio + this.xOffset, this.internalPos.y * this.imageRatio + this.yOffset, this.radius, 0, 2 * Math.PI);
			this.context.stroke();
		}
	},
	watch: {
		internalPos: 				'updateCircle',
	},
	mounted() {
		// Resize the canvas to fit its parent's width.
		// Normally you'd use a more flexible resize system.
		let imageURL = this.imageURL
		if (this.useOfficeMap) imageURL = config.BACKEND_ROOT_URL + "images/floorplan.png";
		this.parentWidth = this.$refs['my-canvas'].parentElement.clientWidth
		this.parentHeight = this.$refs['my-canvas'].parentElement.clientHeight

		this.$refs['my-canvas'].width = this.parentWidth;
		this.$refs['my-canvas'].height = this.parentHeight;

		this.image = new Image();
		this.image.src = imageURL;
		this.image.addEventListener("load", () => {
			this.imageRatio = Math.min((this.parentWidth / this.image.naturalWidth), (this.parentHeight / this.image.naturalHeight));
			this.xOffset = 0;
			this.yOffset = 0;
			if (this.image.naturalWidth < this.image.naturalHeight) {
				this.xOffset = (this.parentWidth - (this.imageRatio * this.image.naturalWidth)) / 2;
			} else {
				this.yOffset = (this.parentHeight - (this.imageRatio * this.image.naturalHeight)) / 2;
			}
			this.updateCircle();
 		},false);
		// We can't access the rendering context until the canvas is mounted to the DOM.
		// Once we have it, provide it to all child components.
		this.context = this.$refs['my-canvas'].getContext('2d')
	}
}
</script>
