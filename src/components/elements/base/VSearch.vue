<template>
	<div class="v-search">
		<svgicon name="magnifier" class="v-search__icon" />

		<input
			type="search"
			placeholder="Введите ЖК / корпус / № квартиры / № паркинга"
			class="v-search__input"
			v-model="model"
		/>
	</div>
</template>

<script>
export default {
	name: "VSearch",
	props: {
		value: {
			type: String,
			default: "",
		},
		inputValue: {
			type: String,
			default: "",
		},
	},
	computed: {
		model: {
			get() {
				return this.value;
			},
			set(value) {
				this.$emit("input", value);
			},
		},
	},
};
</script>
