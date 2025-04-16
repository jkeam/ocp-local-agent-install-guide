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
  workerCount,
  publicKey,
  machineType,
  machineCidr,
  disconnected,
  mirrorHostName,
  mirrorHostUsername,
  distType,
  quayRoot
} = storeToRefs(inputStore)

</script>

<template>
  <BAccordion>
    <BAccordionItem title="Cluster Basics" visible>
      <BRow>
        <BCol>
          <label for="cluster-type">Distribution Type:</label>
          <select id="cluster-type" v-model="distType">
            <option value="ocp">OpenShift</option>
            <option value="okd">OKD</option>
          </select>
        </BCol>
      </BRow>
      <BRow>
        <BCol>
          <label for="cluster-type">Install Machine O/S:</label>
          <select id="cluster-type" v-model="machineType">
            <option value="mac_64">MacOS x86_64</option>
            <option value="mac_arm">MacOS aarch64</option>
            <option value="linux_64">Linux x86_64</option>
            <option value="rhel8_64">Linux RHEL 8 x86_64</option>
            <option value="rhel9_64">Linux RHEL 9 x86_64</option>
          </select>
        </BCol>
      </BRow>
      <BRow>
        <BCol>
          <label for="cluster-type">Internet Access:</label>
          <select id="cluster-type" v-model="disconnected">
            <option value="false">Yes</option>
            <option value="true">No</option>
          </select>
        </BCol>
      </BRow>
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
      <BRow>
        <BCol>
          <label for="pull-secret">Public SSH Key:</label>
          <input id="pull-secret" type="text" v-model="publicKey" />
        </BCol>
      </BRow>
      <BRow>
        <BCol>
          <label for="pull-secret">Host Network CIDR:</label>
          <input id="pull-secret" type="text" v-model="machineCidr" />
        </BCol>
      </BRow>
    </BAccordionItem>
    <BAccordionItem title="Disconnected Details" v-if="disconnected">
      <BRow>
        <BCol>
          <label for="pull-secret">Hostname for mirror registry:</label>
          <input id="pull-secret" type="text" v-model="mirrorHostName" />
        </BCol>
      </BRow>
      <BRow>
        <BCol>
          <label for="pull-secret">Mirror Host Username for SSH/Ansible:</label>
          <input id="pull-secret" type="text" v-model="mirrorHostUsername" />
        </BCol>
      </BRow>
      <BRow>
        <BCol>
          <label for="pull-secret">Quay storage path:</label>
          <input id="pull-secret" type="text" v-model="quayRoot" />
        </BCol>
      </BRow>
    </BAccordionItem>
    <BAccordionItem title="DNS">
      <BRow>
        <BCol>
          <label for="dns-zone">DNS Zone:</label>
          <input id="dns-zone" type="text" required v-model="dnsZone" />
        </BCol>
      </BRow>
      <BRow v-if="showVips">
        <BCol>
          <label for="api-vip">API VIP:</label>
          <input id="api-vip" type="text" v-model="apiVip" />
        </BCol>
      </BRow>
      <BRow v-if="showVips">
        <BCol>
          <label for="ingress-vip">Ingress VIP:</label>
          <input id="ingress-vip" type="text" v-model="ingressVip" />
        </BCol>
      </BRow>
    </BAccordionItem>

    <BAccordionItem title="Master Machines">
      <BRow v-bind:key="index" v-for="(master, index) in masters">
        <BCol>
          <Machine m-type="Master" :m-number="(index + 1).toString()" v-model="masters[index]" />
        </BCol>
      </BRow>
    </BAccordionItem>
    <BAccordionItem title="Worker Machines">
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
