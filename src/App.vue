<template>
	<div id="app">
		<main>
			<div class="container">
				<CartSection />
			</div>
		</main>
	</div>
</template>

<script>
import CartSection from "@/components/elements/CartSection.vue";

export default {
	name: "App",
	components: { CartSection },
};
</script>

<style lang="scss">
#app {
	min-height: 100%;
}
</style>
