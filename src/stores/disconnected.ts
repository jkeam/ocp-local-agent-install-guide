import { ref, computed, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import { useInputStore } from './inputs';

function generateInventoryContents(mirrorHostName: string, mirrorHostUsername: string) {
  return`[mirrors]
${mirrorHostName}	ansible_user=${mirrorHostUsername}
`
}

function generateImageSetConfig() {
  return `kind: ImageSetConfiguration
apiVersion: mirror.openshift.io/v2alpha1
mirror:
  platform:
    channels:
    - name: stable-4.18 
      minVersion: 4.18.2
      maxVersion: 4.18.2
    graph: true 
  operators:
    - catalog: registry.redhat.io/redhat/redhat-operator-index:v4.18 
      packages: 
       - name: node-observability-operator
  additionalImages: 
   - name: registry.redhat.io/ubi8/ubi:latest`
}

export const useDisconnectedStore = defineStore('disconnected', () => {
  const { mirrorHostName, mirrorHostUsername } = storeToRefs(useInputStore());
  const inventoryContents = ref(generateInventoryContents(mirrorHostName.value, mirrorHostUsername.value));
  const imageSetConfig = ref(generateImageSetConfig());

  watch([mirrorHostName, mirrorHostUsername], (newM, oldM) => {
    inventoryContents.value = generateInventoryContents(mirrorHostName.value, mirrorHostUsername.value);
  });
  

  return { 
    inventoryContents,
    imageSetConfig
  }
})
