<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInputStore, type Machine } from '../stores/inputs.js'
import { onMounted, inject, ref } from 'vue'
import type { AxiosInstance } from 'axios'

const inputStore = useInputStore();
const { 
    operators, } = storeToRefs(inputStore);

const data = ref<any>(null);
const axios = inject('axios') as AxiosInstance;

const props = defineProps({
  mNumber: String,
  mType: String,
  hostName: String,
})

const selectedToAdd = defineModel<string>("selectedToAdd")
const selectedToRemove = defineModel<string>("selectedToRemove")

function addOperator() {
    const selectedOperator = data.value[selectedToAdd.value];
    operators.value.set(selectedOperator.packageName, selectedOperator)
}
function deleteOperator() {
    operators.value.delete(selectedToRemove.value)
}

onMounted(async () => {
    try {
        const response = await axios.get('/packages');

        // sort alphabetically
        const sortedArray = response.data.sort((n1,n2) => {
            if (n1.defaultDisplayName > n2.defaultDisplayName) {
                return 1;
            }

            if (n1.defaultDisplayName < n2.defaultDisplayName) {
                return -1;
            }

            return 0;
        });

        data.value = sortedArray;
    } catch(error) {
        console.error('Error fetching data:', error);
    }
});

</script>

<template>
    <BAccordionItem title="Operator Selection">
      <BRow v-if="data">
        <BCol>
          <select v-model="selectedToAdd">
            <option v-for="(operator, index) in data" v-bind:key="index" v-bind:value="index">{{ operator.defaultDisplayName }}</option>
          </select>
          <Button @click="addOperator">Add</Button>

          <br/>
          <select v-model="selectedToRemove">
            <option v-for="operator in operators" v-bind:key="operator[1].packageName" v-bind:value="operator[1].packageName">{{ operator[1].defaultDisplayName }}</option>
          </select>
          <Button @click="deleteOperator">Delete</Button>
        </BCol>
      </BRow>
      <BRow v-else>
        <BCol>
          Fetching operators...
        </BCol>
      </BRow>
    </BAccordionItem>
</template>
