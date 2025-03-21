<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInputStore, type Machine } from '../stores/inputs.js'

const inputStore = useInputStore();
const { dnsZone, clusterName, apiVip, ingressVip, pullSecret } = storeToRefs(inputStore);

const props = defineProps({
  mNumber: String,
  mType: String,
  hostName: String,
})


const model = defineModel<Machine>()

</script>

<template>
    <p>{{  mType }} {{ mNumber }}</p>
    <p>Hostname: <input type="text" required v-model="model.hostname"></p>
    <p>IP Address: <input type="text" required v-model="model.ipAddress"></p>
    <p>NIC Name: <input type="text" v-model="model.interfaceName"></p>
    <p>Install to Device: <input type="text" v-model="model.deviceHintName"></p>
    <p>DNS Server: <input type="text" v-model="model.dnsServer"></p>
    <p>Default Route: <input type="text" v-model="model.defaultRoute"></p>
</template>
