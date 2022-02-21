<template>
	<section class="cart-section">
		<div class="main-search">
			<div class="main-search__top">
				<v-search v-model="searchStr" />
				<v-select
					:items="statusItems"
					placeholder="Все статусы"
					@onChange="onStatusFilterChange"
				/>
				<v-button icon="close" @click.native="onClearCart">
					Очистить корзину
				</v-button>
			</div>
			<div class="main-search__bottom">
				<v-checkbox v-model="allChecked" inputValue="все" label="все" />
				<v-button icon="pdf">Сохранить</v-button>
				<v-button icon="paper-plane">Отправить</v-button>
				<v-button icon="bin" @click.native="onDeleteCheckedItems">
					Удалить
				</v-button>
			</div>
		</div>
		<transition-group
			name="fade-out"
			class="row"
			v-if="isLoaded && apartments.length"
		>
			<div
				class="column"
				v-for="item in filteredApartments"
				:key="item.id"
			>
				<ApartmentsCard
					:apartment="item"
					:isChecked="allChecked"
					@onCheck="onApartmentToggle($event, true)"
					@onUnCheck="onApartmentToggle($event, false)"
				/>
			</div>
		</transition-group>
		<div v-else>В корзине ничего нет</div>
	</section>
</template>

<script>
import VSearch from "@/components/elements/base/VSearch.vue";
import VCheckbox from "@/components/elements/base/VCheckbox.vue";
import VButton from "@/components/elements/base/VButton.vue";
import VSelect from "@/components/elements/base/VSelect.vue";
import ApartmentsCard from "@/components/ApartmentsCard.vue";
import axios from "axios";
import { mapMutations, mapGetters } from "vuex";

export default {
	name: "CartSection",
	components: { VSearch, VButton, VCheckbox, VSelect, ApartmentsCard },
	data: () => ({
		isLoaded: false,
		statusItems: ["Забронировано", "Продано", "Активно"],
		selectedApartments: [],
		localArrApartments: [],
		searchStr: "",
		allChecked: [],
	}),
	computed: {
		...mapGetters(["apartments"]),
		filteredApartments() {
			return this.localArrApartments.filter(
				({ title, price, apartmentNumber }) =>
					this.compareToSearch(title) ||
					this.compareToSearch(price) ||
					this.compareToSearch(apartmentNumber)
			);
		},
	},
	methods: {
		...mapMutations(["setApartments"]),

		compareToSearch(val) {
			if (val.toLowerCase().includes(this.searchStr.toLowerCase()))
				return true;
			return false;
		},

		onApartmentToggle(id, isChecked) {
			console.log(isChecked);
			if (isChecked) {
				this.selectedApartments.push(id);
			} else {
				this.selectedApartments = this.selectedApartments.filter(
					(el) => {
						return el !== id;
					}
				);
			}
		},
		onStatusFilterChange(selectedStatusArr) {
			this.localArrApartments = this.apartments;

			if (selectedStatusArr.length) {
				this.localArrApartments = this.localArrApartments.filter(
					(apartment) =>
						selectedStatusArr.some(
							(status) => apartment.status == status
						)
				);
			}
		},

		onDeleteCheckedItems() {
			this.localArrApartments = this.localArrApartments.filter(
				(el) => !this.selectedApartments.includes(el.id.toString())
			);

			this.setApartments(this.localArrApartments);

			this.selectedApartments = [];
		},

		onClearCart() {
			this.setApartments([]);
		},
	},
	async mounted() {
		try {
			let resp = await axios.get("/apartments.json");
			this.setApartments(resp.data);
			this.localArrApartments = this.apartments;
			this.isLoaded = true;
		} catch (err) {
			console.log(err);
		}
	},
};
</script>

<style lang="scss">
.cart-section {
	padding: 85px 0;

	.column {
		margin-bottom: 24px;
	}
}

.main-search {
	&__top {
		margin-bottom: 32px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	&__bottom {
		padding: 0 25px;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-bottom: 20px;
	}

	&__top,
	&__bottom {
		& > * {
			&:not(:last-child) {
				margin-right: 10px;
			}
		}
	}
}
</style>
