<template>
	<div class="apartment-card-tag" :class="tagType">
		<span>●</span>{{ text }}
	</div>
</template>

<script>
export default {
	name: "ApartmentsCardTag",
	props: {
		text: {
			type: String,
			default: "",
		},
	},
	computed: {
		tagType() {
			if (this.text == "Уступка от физ. лица")
				return "apartment-card-tag--individual";
			else if (this.text == "Уступка от юр. лица")
				return "apartment-card-tag--entity";
			else if (this.text == "Продано") return "apartment-card-tag--sold";
			return "apartment-card-tag--booked";
		},
	},
};
</script>

<style lang="scss">
.apartment-card-tag {
	padding: 5px 9px;
	position: absolute;
	top: 22px;
	right: 0;
	background: #ededed;
	color: #686868;

	span {
		margin-right: 8px;
	}

	&--entity {
		background: #ffe4e4;
		color: #dd4c5d;
	}

	&--individual {
		background: #d6f5ff;
		color: #0291c1;
	}

	&--sold {
		background: #cccccc;
		color: #808080;
	}
}
</style>
