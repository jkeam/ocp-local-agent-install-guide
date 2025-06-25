import { ref, computed, watch } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import { useInputStore, type OperatorPackage } from './inputs';

function generateInventoryContents(mirrorHostName: string, mirrorHostUsername: string, quayRoot: string) {
  return`[mirrors]
${mirrorHostName}	ansible_user=${mirrorHostUsername} quay_root=${quayRoot}

[localhost]
localhost ansible_connection=local quay_hostname=${mirrorHostName}
`
}

function generateImageSetConfig(operators: Map<String, OperatorPackage>) {
let imageSetConfig = `kind: ImageSetConfiguration
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
      packages:`

// calculate the packages to add
operators.forEach((operator, packageName) => {
  imageSetConfig = imageSetConfig +
`
      - name: ${packageName}
        defaultChannel: ${operator.defaultChannel}`
});

imageSetConfig = imageSetConfig + `
  additionalImages:`

operators.forEach((operator, packageName) => {
  console.log(operator.channels)
  Object.values(operator.channels).forEach((channel, channelName) => {
    channel.additionalImages.forEach((additionalImage, imageName) => {
      imageSetConfig = imageSetConfig + `
  - name: ${additionalImage}`
    }) 
  })
})
  
   return imageSetConfig;
}

export const useDisconnectedStore = defineStore('disconnected', () => {
  const { mirrorHostName, mirrorHostUsername, quayRoot, operators } = storeToRefs(useInputStore());
  const inventoryContents = ref(generateInventoryContents(mirrorHostName.value, mirrorHostUsername.value, quayRoot.value));
  const imageSetConfig = ref(generateImageSetConfig(operators.value));

  watch(operators, (newM, oldM) => {
    imageSetConfig.value = generateImageSetConfig(newM)
  }, { deep: true });

  watch([mirrorHostName, mirrorHostUsername], (newM, oldM) => {
    inventoryContents.value = generateInventoryContents(mirrorHostName.value, mirrorHostUsername.value, quayRoot.value);
  });
  

  return { 
    inventoryContents,
    imageSetConfig
  }
})
