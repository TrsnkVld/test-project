<template>
	<div class="apartment">
		<VCheckbox v-model="selected" :inputValue="apartment.id.toString()" />
		<div class="apartment-left">
			<div class="apartment-left__top">
				<div class="apartment__price">
					<strong>{{ apartment.price }} руб.</strong>
				</div>
				<ApartmentsCardHint
					:hint="apartment.hint"
					v-if="apartment.hint.text"
				/>
			</div>
			<h3 class="apartment__title">
				<a href="#">
					{{ apartment.title }},
					<span class="text-gray">{{ apartment.subtitle }}</span>
				</a>
			</h3>
			<div class="apartment__info">
				<div>
					<div>{{ apartment.apartmentNumber }}</div>
					<div v-if="apartment.type">{{ apartment.type }}</div>
				</div>
				<div>
					<div>{{ apartment.size }} м²</div>
					<div v-if="apartment.floor">{{ apartment.floor }}</div>
				</div>
			</div>
			<div class="apartment__address">
				<svgicon name="map-marker" />
				{{ apartment.address }}
			</div>
		</div>

		<div class="apartment-right">
			<ApartmentsCardTag :text="apartment.tag" />
			<img
				class="apartment__img"
				:src="require('@/assets/img/image105.png')"
				:alt="`${apartment.title}, ${apartment.subtitle}`"
				draggable="false"
			/>
			<div class="apartment__date text-gray">
				Добавлено {{ apartment.date }}
			</div>
		</div>
	</div>
</template>

<script>
import ApartmentsCardTag from "@/components/ApartmentsCardTag.vue";
import ApartmentsCardHint from "@/components/ApartmentsCardHint.vue";
import VCheckbox from "@/components/elements/base/VCheckbox.vue";

export default {
	name: "ApartmentsCard",
	components: { ApartmentsCardTag, VCheckbox, ApartmentsCardHint },
	props: {
		apartment: {
			type: Object,
			default: () => {},
		},
		isChecked: {
			type: Array,
			default: () => [],
		},
	},
	data: () => ({
		selected: [],
	}),
	watch: {
		selected(val) {
			if (val.length) this.$emit("onCheck", this.apartment.id.toString());
			else this.$emit("onUnCheck", this.apartment.id.toString());
		},
		isChecked(val) {
			if (val.length) {
				this.selected.push(this.apartment.id.toString());
				this.$emit("onCheck", this.apartment.id.toString());
			} else {
				this.selected = [];
				this.$emit("onUnCheck", this.apartment.id.toString());
			}
		},
	},
};
</script>

<style lang="scss">
.apartment {
	padding: 25px 25px 25px 66px;
	background: $white;
	border: 1px solid #e5e5e5;
	display: flex;
	position: relative;
	height: 234px;
	box-sizing: border-box;

	.v-checkbox {
		position: absolute;
		top: 50%;
		left: 25px;
		transform: translateY(-50%);
	}

	&-left {
		display: flex;
		flex-flow: column;

		&__top {
			display: flex;
			align-items: center;
			margin-bottom: 6px;
		}
	}

	&__price {
		color: $red;
		font-size: 15px;
		line-height: 20px;
		margin-right: 16px;
	}

	&__title {
		min-height: 42px;
		margin-bottom: 14px;
	}

	&__info {
		display: flex;
		margin: 0 -20px;
		margin-bottom: 16px;
		// min-height: 42px;

		& > div {
			padding: 0 20px;

			&:first-child {
				border-right: 1px solid #c4c4c4;
			}
		}
	}

	&__address {
		position: relative;
		margin-top: auto;

		svg {
			position: absolute;
			top: 3px;
			left: -20px;
			width: 13px;
		}
	}

	&-right {
		padding-left: 22px;
		display: flex;
		flex-flow: column;
		flex-shrink: 0;
	}

	&__img {
		width: 130px;
		height: 100px;
		object-fit: contain;
		object-position: center;
		margin: auto 0 16px auto;
	}

	&__date {
		font-size: 13px;
		line-height: 20px;
	}
}
</style>
