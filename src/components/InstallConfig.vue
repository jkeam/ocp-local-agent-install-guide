<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInputStore } from '../stores/inputs.js'

const inputStore = useInputStore();
const { clusterName, dnsZone, pullSecret, publicKey, masters, workers, machineCidr } = storeToRefs(inputStore);

</script>

<template>
  <div class="scrollable green">
    <pre>
apiVersion: v1
baseDomain: {{ dnsZone }} 
compute: 
- name: worker
  replicas: {{ workers.length }} 
  architecture: amd64
controlPlane: 
  name: master
  replicas: {{ masters.length }}
  architecture: amd64
metadata:
  name: {{ clusterName }}
networking:
  clusterNetwork:
  - cidr: 10.128.0.0/14 
    hostPrefix: 23 
  machineNetwork:
  - cidr: {{ machineCidr }}
  networkType: OVNKubernetes 
  serviceNetwork: 
  - 172.30.0.0/16
platform:
  none: {} 
fips: false 
pullSecret: '{{  pullSecret }}' 
sshKey: '{{  publicKey }}' </pre>
  </div>
</template>


<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 100vh;
}
</style>