<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInputStore, type Machine } from '../stores/inputs.js'

const inputStore = useInputStore();
const { clusterName, masters, workers } = storeToRefs(inputStore);

const agentConfig = `
apiVersion: v1beta1
kind: AgentConfig
metadata:
  name: ${clusterName.value}
rendezvousIP: ${masters.value[0].ipAddress}
hosts:
${masters.value.map(machine => {
return `  - hostname: ${machine.hostname}
    interfaces:
      - name: ${machine.interfaceName}
        macAddress: ${machine.macAddress}
    rootDeviceHints:
      deviceName: ${machine.deviceHintName}
    networkConfig:
      interfaces:
        - name: ${machine.interfaceName}
          type: ethernet
          state: up
          mac-address: ${machine.macAddress}
          ipv4:
            enabled: true
            address:
              - ip: ${machine.ipAddress}
                prefix-length: 23
            dhcp: false
      dns-resolver:
        config:
          server:
            - ${machine.dnsServer}
      routes:
        config:
          - destination: 0.0.0.0/0
            next-hop-address: ${machine.defaultRoute}
            next-hop-interface: ${machine.interfaceName}
            table-id: 254`
})}
${workers.value.map(machine => `  - hostname: ${machine.hostname}
    interfaces:
      - name: ${machine.interfaceName}
        macAddress: ${machine.macAddress}
    rootDeviceHints:
      deviceName: ${machine.deviceHintName}
    networkConfig:
      interfaces:
        - name: ${machine.interfaceName}
          type: ethernet
          state: up
          mac-address: ${machine.macAddress}
          ipv4:
            enabled: true
            address:
              - ip: ${machine.ipAddress}
                prefix-length: 23
            dhcp: false
      dns-resolver:
        config:
          server:
            - ${machine.dnsServer}
      routes:
        config:
          - destination: 0.0.0.0/0
            next-hop-address: ${machine.defaultRoute}
            next-hop-interface: ${machine.interfaceName}
            table-id: 254`)}
`

</script>

<template>
  <VCodeBlock
      :code="agentConfig"
      label="agent-config.yaml"
      highlightjs
      lang="yaml"
      theme="neon-bunny"
  />
</template>
