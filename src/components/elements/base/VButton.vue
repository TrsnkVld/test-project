<template>
	<button class="v-button">
		<slot></slot>

		<svgicon v-if="icon" class="v-button__icon" :name="icon" />
	</button>
</template>

<script>
export default {
	name: "VButton",
	props: {
		icon: {
			type: String,
			default: "",
		},
	},
};
</script>
