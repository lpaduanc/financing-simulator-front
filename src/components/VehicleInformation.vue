<template>
  <div>
		<h1>{{ informations }}</h1>
	</div>
</template>

<script>
	export default {
		props: {
			vehicleInformation: "",
			show: false,
		},		

		data() {
			return {
				informations: '',
			};
		},

		mounted() {
			this.informations = `${this.vehicleInformation[0].description}.
				${this.vehicleInformation[0].vehicle_value.toLocaleString('pt-BR', {currency: 'BRL', style: 'currency'})}`;
		},
	};
</script>