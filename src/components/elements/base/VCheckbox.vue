<template>
	<div class="v-checkbox">
		<label>
			<input
				class="v-checkbox__input"
				type="checkbox"
				:value="inputValue"
				v-model="model"
			/>
			<span class="v-checkbox__mark" />
			<span class="v-checkbox__text" v-if="label">
				{{ label }}
			</span>
		</label>
	</div>
</template>

<script>
export default {
	name: "VCheckbox",
	props: {
		value: {
			type: Array,
			default: () => [],
		},
		inputValue: {
			type: String,
			default: "",
		},
		label: {
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
