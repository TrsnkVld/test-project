import Vue from 'vue';
import VueSvgIcon from 'vue-svgicon';
import '../assets/svg/bundle';

Vue.use(VueSvgIcon, {
	tagName: 'svgicon',
	isOriginalDefault: true,
});
