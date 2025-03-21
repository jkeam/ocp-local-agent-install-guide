<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInputStore } from '../stores/inputs.js'
import Machine from './Machines.vue'

const inputStore = useInputStore()
const {
  dnsZone,
  clusterName,
  apiVip,
  ingressVip,
  pullSecret,
  masters,
  workers,
  clusterType,
  showVips,
  workerCount
} = storeToRefs(inputStore)

function output() {
  console.log(masters.value)
}
</script>

<template>
  <BAccordion>
    <BAccordionItem title="Cluster Basics" visible>
      <BRow>
        <BCol>
          <label for="cluster-type">Name:</label>
          <select id="cluster-type" v-model="clusterType">
            <option value="sno">Single Node</option>
            <option value="compact">Compact</option>
            <option value="standard">Standard</option>
          </select>
        </BCol>
      </BRow>
      <BRow>
        <BCol>
          <label for="cluster-name">Cluster Name:</label>
          <input id="cluster-name" type="text" v-model="clusterName" />
        </BCol>
      </BRow>
      <BRow>
        <BCol>
          <label for="pull-secret">Pull Secret:</label>
          <input id="pull-secret" type="text" v-model="pullSecret" />
        </BCol>
      </BRow>
    </BAccordionItem>
    <BAccordionItem title="DNS" visible>
      <BRow>
        <BCol>
          <label for="dns-zone">DNS Zone:</label>
          <input id="dns-zone" type="text" required v-model="dnsZone" />
        </BCol>
      </BRow>
      <BRow>
        <BCol>
          <label for="api-vip">API VIP:</label>
          <input id="api-vip" type="text" v-model="apiVip" />
        </BCol>
      </BRow>
      <BRow>
        <BCol>
          <label for="ingress-vip">Ingress VIP:</label>
          <input id="ingress-vip" type="text" v-model="ingressVip" />
        </BCol>
      </BRow>
    </BAccordionItem>

    <BAccordionItem title="Master Machines" visible>
      <BRow v-bind:key="index" v-for="(master, index) in masters">
        <BCol>
          <Machine m-type="Master" :m-number="(index + 1).toString()" v-model="masters[index]" /> 
        </BCol>
      </BRow>
    </BAccordionItem>
    <BAccordionItem title="Worker Machines" visible>
      <BRow>
        <BCol>
          <label for="worker-count">Worker Count:</label>
          <input id="worker-count" type="text" v-model="workerCount" />
        </BCol>
      </BRow>
      <BRow v-bind:key="index" v-for="(worker, index) in workers">
        <BCol>
          <Machine m-type="Worker" :m-number="(index + 1).toString()" v-model="workers[index]" /> 
        </BCol>
      </BRow>
    </BAccordionItem>
  </BAccordion>
</template>
