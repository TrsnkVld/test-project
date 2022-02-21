<template>
	<div
		class="apartment-card-hint"
		@mouseover="isDesctiptionShowing = true"
		@mouseleave="isDesctiptionShowing = false"
	>
		<div class="apartment-card-hint__icon" v-if="hint.text">
			<svgicon :name="hint.text == 'Квартира' ? 'plan' : 'car'" />
		</div>
		<div class="apartment-card-hint__text">
			{{ hint.text }}
		</div>
		<transition name="slide-down">
			<div
				class="apartment-card-hint__description"
				v-if="isDesctiptionShowing && hint.description"
			>
				{{ hint.description }}
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: "ApartmentsCardHint",
	props: {
		hint: {
			type: Object,
			default: () => {},
		},
	},
	data: () => ({
		isDesctiptionShowing: false,
	}),
};
</script>

<style lang="scss">
.apartment-card-hint {
	background: #ffffff;
	box-shadow: 0px 0px 2px rgba(94, 119, 157, 0.25);
	border-radius: 32px;
	font-size: 12px;
	line-height: 16px;
	padding: 5px 16px;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	position: relative;

	&__icon {
		flex-shrink: 0;
		width: 14px;
		height: 14px;
		margin-right: 8px;

		svg {
			max-width: 100%;
			max-height: 100%;
		}

		path {
			transition: fill $transition;
		}
	}

	&__description {
		position: absolute;
		top: 100%;
		left: 50%;
		background: #2d2d2db3;
		color: $white;
		font-size: 13px;
		line-height: 20px;
		padding: 12px 19px;
		width: auto;
		margin-top: 12px;
		white-space: nowrap;
		z-index: 10;

		&::before {
			content: "";
			display: block;
			border-bottom: solid 7px #2d2d2db3;
			border-left: solid 7px transparent;
			border-right: solid 7px transparent;
			position: absolute;
			bottom: 100%;
			left: 8px;
		}
	}

	&:hover {
		.apartment-card-hint {
			&__icon {
				path {
					fill: $red;
				}
			}
		}
	}
}
</style>
