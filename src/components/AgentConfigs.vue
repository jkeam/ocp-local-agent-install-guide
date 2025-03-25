<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInputStore } from '../stores/inputs.js'

const inputStore = useInputStore();
const { clusterName, masters, workers } = storeToRefs(inputStore);

</script>

<template>
  <div class="scrollable green">
    <pre>
apiVersion: v1beta1
kind: AgentConfig
metadata:
  name: {{ clusterName }}
rendezvousIP: {{ masters[0].ipAddress }}
hosts:</pre>
    <pre v-bind:key="index" v-for="(machine, index) in masters">
  - hostname: {{ machine.hostname }}
    interfaces:
      - name: {{ machine.interfaceName }}
        macAddress: {{ machine.macAddress }}
    rootDeviceHints:
      deviceName: {{ machine.deviceHintName }}
    networkConfig:
      interfaces:
        - name: {{ machine.interfaceName }}
          type: ethernet
          state: up
          mac-address: {{ machine.macAddress }}
          ipv4:
            enabled: true
            address:
              - ip: {{ machine.ipAddress }}
                prefix-length: 23
            dhcp: false
      dns-resolver:
        config:
          server:
            - {{ machine.dnsServer }}
      routes:
        config:
          - destination: 0.0.0.0/0
            next-hop-address: {{ machine.defaultRoute }}
            next-hop-interface: {{ machine.interfaceName }}
            table-id: 254</pre>
<pre v-bind:key="index" v-for="(machine, index) in workers">
  - hostname: {{ machine.hostname }}
    interfaces:
      - name: {{ machine.interfaceName }}
        macAddress: {{ machine.macAddress }}
    rootDeviceHints:
      deviceName: {{ machine.deviceHintName }}
    networkConfig:
      interfaces:
        - name: {{ machine.interfaceName }}
          type: ethernet
          state: up
          mac-address: {{ machine.macAddress }}
          ipv4:
            enabled: true
            address:
              - ip: {{ machine.ipAddress }}
                prefix-length: 23
            dhcp: false
      dns-resolver:
        config:
          server:
            - {{ machine.dnsServer }}
      routes:
        config:
          - destination: 0.0.0.0/0
            next-hop-address: {{ machine.defaultRoute }}
            next-hop-interface: {{ machine.interfaceName }}
            table-id: 254</pre>
  </div>
</template>


<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 100vh;
}
</style>
