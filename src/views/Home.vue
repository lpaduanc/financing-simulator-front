<template>
  <div class="container mt-3">
    <loader-component
      :loader="loader"
    />
    <h3>Simular Financiamento</h3>
    <hr>
    <b-form class="container">
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group
            label="Marca"
            for="marca"
            align="left"
          >
            <b-form-select
              id="vehicle"
              v-model="form.brand_id"
              :options="arrBrands"
              @change="getVehicleByBrandId"
            >
            </b-form-select>
          </b-form-group>
        </b-col>

        <b-col md="6" sm="12">
          <b-form-group
            label="Veículo"
            for="veiculo"
            align="left"
          >
            <b-form-select
              id="vehicle"
              v-model="form.vehicle_id"
              :options="arrVehicles"
              :disabled="form.brand_id == null || arrVehicles.length == 0"
              @change="getVehicleInformation"
            >
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <br>
    <div class="container mt-3">
      <b-row>
        <b-col md="12" sm="12">
          <vehicle-information-component
            :vehicleInformation="vehicleSelected"
            :show="showVehicleInformation"
            v-if="showVehicleInformation == true"
          />
        </b-col>
      </b-row>
    </div>
    <br>
    <div class="container mt-3" v-if="showVehicleInformation == true">
      <b-row>
        <b-col md="4" sm="12">
          <b-form-group
            label="Entrada"
            for="entrada"
            align="left"
          >
          </b-form-group>
          <b-form-input
            placeholder="Digite apenas números"
            type="text"
            v-model="form.money_deposit"
          >
          </b-form-input>
        </b-col>
        <b-col md="4" sm="12">
          <b-form-group
            label="Parcelas"
            for="parcelas"
            align="left"
          >
          </b-form-group>
          <b-form-select
            id="installments"
            v-model="form.installment"
            :options="arrInstallments"
            required
          >
          </b-form-select>
        </b-col>
        <b-col md="4" sm="12">
          <b-form-group
            label="Receber simulação no e-mail"
            for="receberSimulação"
            align="left"
          >
          </b-form-group>
          <b-form-input
            placeholder="Digite seu e-mail para receber a simulação"
            type="email"
            v-model="form.email"
          >
          </b-form-input>
        </b-col>
      </b-row>
    </div>
    <br>
    <div class="container mt-3" v-if="showVehicleInformation == true">
        <b-row>
        <b-col>
          <b-form-group
          >
          <b-button
            variant="outline-primary"
            block
            @click="runSimulation"
          >
            Simular
          </b-button>
          </b-form-group>
        </b-col>
      </b-row>
    </div>
    <br>
    <div class="container mt-3">
      <b-row>
        <b-col md="12" sm="12">
          <simulation-information-component
            :simulationResult="simulationResult"
            :show="showSimulationInformation"
            v-if="showSimulationInformation == true"
          />
        </b-col>
      </b-row>
    </div>
    <br>
    <div v-if="showSimulationInformation == true">
      <b-row>
        <b-col>
          <b-button
            variant="outline-danger"
            @click.prevent="limparDadosSimulacao"
          >
            Limpar Simulação
          </b-button>
        </b-col>
      </b-row>
    </div>
  </div>
  
</template>

<script>
  import loaderComponent from '../components/Loader.vue';
  import vehicleInformationComponent from '../components/VehicleInformation.vue';
  import simulationInformationComponent from '../components/SimulationInformation.vue';

  import { mapState, mapActions } from 'vuex';

  export default {   
    data() {
      return {
        form: {
          vehicle_id: null,
          brand_id: null,
          installment: null,
          money_deposit: 0,
          email: '',
        },
        loader: false,
        arrVehicles: [],
        arrBrands: [],
        arrInstallments: [],
        vehicleSelected: '',
        showVehicleInformation: false,
        showSimulationInformation: false,
        simulationResult: [],
      }
    },
    computed: {
      ...mapState({
        vehicles: state => state.vehicles,
        brands: state => state.brands,
        installments: state => state.installments,
      }),
    },

    components: {
      loaderComponent,
      vehicleInformationComponent,
      simulationInformationComponent,
    },

    mounted() {
      this.getAllBrands();
      this.getInstallments()
        .then(() => {
          this.mountInstalmmentsDropDown();
        });
    },

    methods: {
      ...mapActions([
        'getBrands',
        'getVehiclesByBrand',
        'getInstallments',
        'makeSimulation'
      ]),

      getAllBrands() {
        this.loader = true;

        this.getBrands()
          .then(() => {
            this.mountBrandsDropDown();
            this.loader = false;
          });
      },

      getVehicleByBrandId() {
        this.loader = true;

        this.getVehiclesByBrand(this.form.brand_id)
          .then(() => {
            this.mountVehicleDropDown();
            this.loader = false;
          })
      },

      mountVehicleDropDown() {
        this.arrVehicles = [];

        this.arrVehicles.push({
          value: null,
          text: 'Selecione um veículo',
        });

        this.vehicles.allVehicles.map(data => {
          this.arrVehicles.push({
            value: data.id,
            text: data.name,
          });
        })
      },

      mountBrandsDropDown() {
        this.arrBrands.push({
          value: null,
          text: 'Selecione uma marca',
        });

        this.brands.allBrands.map(data => {
          this.arrBrands.push({
            value: data.id,
            text: data.name,
          });
        })
      },

      mountInstalmmentsDropDown() {
        this.arrInstallments.push({
          value: null,
          text: 'Selecione a quantidade de parcelas',
        });

        this.installments.allInstallments.map(data => {
          this.arrInstallments.push({
            value: data.id,
            text: data.installment,
          });
        })
      },
      
      getVehicleInformation() {
        this.showVehicleInformation = true;
        this.vehicleSelected = this.vehicles.allVehicles.filter(vehicle => vehicle.id == this.form.vehicle_id);
      },

      runSimulation() {
        this.loader = true;
        return this.validateBeforeRunSimulation();   
      },

      validateBeforeRunSimulation() {
        if (this.checkIfMoneyDepositIsLower()) {
          alert('O valor da entrada não pode ser maior que o valor total do veículo.');
          this.loader = false;
          return false;
        }

        if (this.checkIfInstallmentIsNull()) {
          alert('Selecione a quantidade de parcelas.');
          this.loader = false;
          return false;
        }

        this.makeSimulation(this.form)
          .then(response => {
            if (response.status == 200) {
              this.simulationResult = response.data;
              this.showSimulationInformation = true;
            }
          })
          .finally(() => this.loader = false);
      },

      limparDadosSimulacao()
      {
        this.loader = true;

        this.form.brand_id = null;
        this.form.installment = null;
        this.form.vehicle_id = null;
        this.form.money_deposit = 0;
        this.form.email = '';
        this.arrVehicles = [],
        this.vehicleSelected = '',
        this.showVehicleInformation = false,
        this.showSimulationInformation = false,

        this.loader = false;
      },

      checkIfMoneyDepositIsLower() {
        if (parseFloat(this.form.money_deposit) > parseFloat(this.vehicleSelected[0].vehicle_value)) {
          return true;
        }
      },

      checkIfInstallmentIsNull() {
        if (this.form.installment == null) {
          return true;
        }
      }
    },
  }
</script>
