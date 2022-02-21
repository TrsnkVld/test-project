<template>
	<div class="v-select" v-click-outside="onClickOutside">
		<div class="v-select__btn" @click="onBtnClick">
			<div>
				{{ joinedPlaceholder }}
			</div>

			<svgicon
				name="arrow"
				:class="isDropdownOpen ? 'svg-up' : 'svg-down'"
			/>
		</div>
		<transition name="slide-down">
			<div class="v-select__items" v-if="isDropdownOpen">
				<template v-if="items.length">
					<v-checkbox
						v-for="(item, index) in items"
						:key="index"
						v-model="checkedItems"
						:inputValue="item"
						:label="item"
					/>
				</template>
				<template v-else>Список отсутсвует</template>
			</div>
		</transition>
	</div>
</template>

<script>
import Vue from "vue";
import VCheckbox from "@/components/elements/base/VCheckbox.vue";

Vue.directive("click-outside", {
	bind(el, binding, vnode) {
		el.clickOutsideEvent = (event) => {
			if (!(el === event.target || el.contains(event.target))) {
				vnode.context[binding.expression](event);
			}
		};
		document.body.addEventListener("click", el.clickOutsideEvent);
	},
	unbind(el) {
		document.body.removeEventListener("click", el.clickOutsideEvent);
	},
});

export default {
	components: { VCheckbox },
	name: "VSelect",
	props: {
		items: {
			type: Array,
			default: () => [],
		},
		placeholder: {
			type: String,
			default: "",
		},
	},
	data: () => ({
		isDropdownOpen: false,
		checkedItems: [],
	}),
	computed: {
		joinedPlaceholder() {
			if (
				this.checkedItems.length &&
				this.checkedItems.length < this.items.length
			) {
				return this.checkedItems.join(", ");
			}
			return this.placeholder;
		},
	},
	methods: {
		onBtnClick() {
			this.isDropdownOpen = !this.isDropdownOpen;
		},
		clickedOutside(e) {
			console.log(e.target);
		},
		onClickOutside() {
			this.isDropdownOpen = false;
		},
	},
	watch: {
		checkedItems(val) {
			this.$emit("onChange", val);
		},
	},
};
</script>
