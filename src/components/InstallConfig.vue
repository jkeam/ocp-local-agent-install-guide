<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInputStore } from '../stores/inputs.js'

const inputStore = useInputStore();
const { clusterName, dnsZone, pullSecret, publicKey, masters, workers, machineCidr, disconnected, mirrorHostName } = storeToRefs(inputStore);

const installConfig =
`apiVersion: v1
baseDomain: ${dnsZone.value}
compute: 
- name: worker
  replicas: ${workers.value.length}
  architecture: amd64
controlPlane: 
  name: master
  replicas: ${masters.value.length}
  architecture: amd64
metadata:
  name: ${clusterName.value}
networking:
  clusterNetwork:
  - cidr: 10.128.0.0/14 
    hostPrefix: 23 
  machineNetwork:
  - cidr: ${machineCidr.value}
  networkType: OVNKubernetes 
  serviceNetwork: 
  - 172.30.0.0/16
platform:
  none: {} 
fips: false 
pullSecret: '${ disconnected ? `{"auths":{"${mirrorHostName.value}:8443":{"auth":"${btoa("init:SuperSecret")}"}}}` : pullSecret.value}'
${disconnected ? `imageContentSources:
  - mirrors:
    - ${mirrorHostName.value}:8443/openshift/release
    source: quay.io/openshift-release-dev/ocp-v4.0-art-dev
  - mirrors:
    - ${mirrorHostName.value}:8443/openshift/release-images
    source: quay.io/openshift-release-dev/ocp-release` : ''}
sshKey: '${publicKey.value}'`

</script>

<template>
  <VCodeBlock
      :code="installConfig"
      label="install-config.yaml"
      highlightjs
      lang="yaml"
      theme="neon-bunny"
  />
</template>


<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 100vh;
}
</style>