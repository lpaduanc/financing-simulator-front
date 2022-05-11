<template>
  <div class="container mt-3">
		<h3>Dados da Simulação</h3>
		<div class="container mt-3">
			<b-row>
				<b-col>
					<b>Valor do Veículo: </b>R$ {{ vehicleValue }}<br>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<b>Entrada: </b>{{ simulationResult.simulation.money_deposit }}<br>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<b>Parcelas: </b>{{ simulationResult.simulation.installment }}<br>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<b>Valor das Parcelas:</b>R$ {{ simulationResult.simulation.simulation_value }}
				</b-col>
			</b-row>
		</div>
		
	</div>
</template>

<script>
	export default {
		props: {
			simulationResult: [],
			show: false,
		},
		
		data() {
			return {
				informations: '',
				vehicleValue: null,
			};
		},

		mounted() {
            debugger;
            console.log(this.simulationResult);
						this.vehicleValue =
							this.simulationResult.vehicle[0].vehicle_value.toLocaleString('pt-BR', {currency: 'BRL', style: 'currency'});
		},
	};
</script>