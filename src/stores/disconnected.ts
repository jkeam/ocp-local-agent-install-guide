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
    - name: rhods-operator
      channels:
      - name: fast
        minVersion: 2.19.0
        maxVersion: 2.19.0
  additionalImages: 
   - name: registry.redhat.io/ubi8/ubi:latest
   - name: quay.io/modh/codeserver@sha256:1fd51b0e8a14995f1f7273a4b0b40f6e7e27e225ab179959747846e54079d61e
   - name: quay.io/modh/codeserver@sha256:92f2a10dde5c96b29324426b4325401e8f4a0d257e439927172d5fe909289c44
   - name: quay.io/modh/codeserver@sha256:b1a048f3711149e36a89e0eda1a5601130fb536ecc0aabae42ab6e4d26977354
   - name: quay.io/modh/cuda-notebooks@sha256:00c53599f5085beedd0debb062652a1856b19921ccf59bd76134471d24c3fa7d
   - name: quay.io/modh/cuda-notebooks@sha256:0e57a0b756872636489ccd713dc9f00ad69d0c481a66ee0de97860f13b4fedcd
   - name: quay.io/modh/cuda-notebooks@sha256:3da74d732d158b92eaada0a27fb7067fa18c8bde5033c672e23caed0f21d6481
   - name: quay.io/modh/cuda-notebooks@sha256:55598c7de919afc6390cf59595549dc4554102481617ec42beaa3c47ef26d5e4
   - name: quay.io/modh/cuda-notebooks@sha256:6fadedc5a10f5a914bb7b27cd41bc644392e5757ceaf07d930db884112054265
   - name: quay.io/modh/cuda-notebooks@sha256:81484fafe7012792ecdda28fef89287219c21b99c4e79a504aff0b265d94b429
   - name: quay.io/modh/cuda-notebooks@sha256:88d80821ff8c5d53526794261d519125d0763b621d824f8c3222127dab7b6cc8
   - name: quay.io/modh/cuda-notebooks@sha256:99d3fb964e635873214de4676c259a96c2ea25f3f79cc4bead5bc9f39aba34c0
   - name: quay.io/modh/cuda-notebooks@sha256:a484d344f6feab25e025ea75575d837f5725f819b50a6e3476cef1f9925c07a5
   - name: quay.io/modh/cuda-notebooks@sha256:f6cdc993b4d493ffaec876abb724ce44b3c6fc37560af974072b346e45ac1a3b
   - name: quay.io/modh/odh-anaconda-notebook@sha256:acfa4bc06bbd0b4640844c5403272d6138070f391264dba238441c5dc64de505
   - name: quay.io/modh/odh-base-rhel9@sha256:1d6f2e3c0ee7962d92c3b933f3bbfabeee24d314a2ce5f8ec2d9f18d5b6723d4
   - name: quay.io/modh/odh-generic-data-science-notebook@sha256:39853fd63555ebba097483c5ac6a375d6039e5522c7294684efb7966ba4bc693
   - name: quay.io/modh/odh-generic-data-science-notebook@sha256:3e51c462fc03b5ccb080f006ced86d36480da036fa04b8685a3e4d6d51a817ba
   - name: quay.io/modh/odh-generic-data-science-notebook@sha256:76e6af79c601a323f75a58e7005de0beac66b8cccc3d2b67efb6d11d85f0cfa1
   - name: quay.io/modh/odh-generic-data-science-notebook@sha256:d0ba5fc23e2b3846763f60e8ade8a0f561cdcd2bf6717df6e732f6f8b68b89c4
   - name: quay.io/modh/odh-generic-data-science-notebook@sha256:e2cab24ebe935d87f7596418772f5a97ce6a2e747ba0c1fd4cec08a728e99403
   - name: quay.io/modh/odh-minimal-notebook-container@sha256:2217d8a9cbf84c2bd3e6c6dc09089559e8a3905687ca3739e897c4b45e2b00b3
   - name: quay.io/modh/odh-minimal-notebook-container@sha256:39068767eebdf3a127fe8857fbdaca0832cdfef69eed6ec3ff6ed1858029420f
   - name: quay.io/modh/odh-minimal-notebook-container@sha256:4ba72ae7f367a36030470fa4ac22eca0aab285c7c3f1c4cdcc33dc07aa522143
   - name: quay.io/modh/odh-minimal-notebook-container@sha256:e2296a1386e4d9756c386b4c7dc44bac6f61b99b3b894a10c9ff2d8d5602ca4e
   - name: quay.io/modh/odh-minimal-notebook-container@sha256:eec50e5518176d5a31da739596a7ddae032d73851f9107846a587442ebd10a82
   - name: quay.io/modh/odh-pytorch-notebook@sha256:20f7ab8e7954106ea5e22f3ee0ba8bc7b03975e5735049a765e021aa7eb06861
   - name: quay.io/modh/odh-pytorch-notebook@sha256:2403b3dccc3daf5b45a973c49331fdac4ec66e2e020597975fcd9cb4a625099b
   - name: quay.io/modh/odh-pytorch-notebook@sha256:806e6524cb46bcbd228e37a92191c936bb4c117100fc731604e19df80286b19d
   - name: quay.io/modh/odh-pytorch-notebook@sha256:97b346197e6fc568c2eb52cb82e13a206277f27c21e299d1c211997f140f638b
   - name: quay.io/modh/odh-pytorch-notebook@sha256:b68e0192abf7d46c8c6876d0819b66c6a2d4a1e674f8893f8a71ffdcba96866c
   - name: quay.io/modh/odh-trustyai-notebook@sha256:70fe49cee6d5a231ddea7f94d7e21aefd3d8da71b69321f51c406a92173d3334
   - name: quay.io/modh/odh-trustyai-notebook@sha256:8c5e653f6bc6a2050565cf92f397991fbec952dc05cdfea74b65b8fd3047c9d4
   - name: quay.io/modh/odh-trustyai-notebook@sha256:a1b863c2787ba2bca292e381561ed1d92cf5bc25705edfb1ded5e0720a12d102
   - name: quay.io/modh/odh-trustyai-notebook@sha256:fe883d8513c5d133af1ee3f7bb0b7b37d3bada8ae73fc7209052591d4be681c0
   - name: quay.io/modh/rocm-notebooks@sha256:199367d2946fc8427611b4b96071cb411433ffbb5f0988279b10150020af22db
   - name: quay.io/modh/rocm-notebooks@sha256:1f0b19b7ae587d638e78697c67f1290d044e48bfecccfb72d7a16faeba13f980
   - name: quay.io/modh/rocm-notebooks@sha256:f94702219419e651327636b390d1872c58fd7b8f9f6b16a02c958ffb918eded3
   - name: quay.io/modh/runtime-images@sha256:19ef5491d4dc059bbc93bb9e4e2579c5729ae65463771e32f325e3f925ac8363
   - name: quay.io/modh/runtime-images@sha256:2169bfa864e84895e1c1938411f72ed8e1c7520ab106d58544fafb9a1d7a538c
   - name: quay.io/modh/runtime-images@sha256:41ecbf1bee41c7d12238996eca4fd90ec035fba70914bd0fa93f08dd8543af20
   - name: quay.io/modh/runtime-images@sha256:45bcb3da04e8aff42ff6afdd7cd161a368e7ae7f2e033a57d6d23347bf7c97d8
   - name: quay.io/modh/runtime-images@sha256:6dfad809a78f23354fb580feddf44ff7e4adb3766ac7f402ddccc8355ae961ab
   - name: quay.io/modh/runtime-images@sha256:7594c7bee34dff3eace25f9053632b84ddb4036e81fc64425b7e9c533368d22e
   - name: quay.io/modh/runtime-images@sha256:9fc4124323e75a97b789fa60376c252d55d3c34ce37104b0d6751b235324c441
   - name: quay.io/modh/runtime-images@sha256:a2f09f6095e3ba6bc6cf3b8d702fcdd4814f9d4c43e076795bfcdeb334ef9978
   - name: quay.io/modh/runtime-images@sha256:df1adec7e0623afd07fbe2d6fd6f759800d93c136c33a5b322ed347cbbbd70aa
   - name: quay.io/modh/runtime-images@sha256:e46fd90085206b1d77a18635db5784bca1f34e69c87ffbc13c6bffd65fd3c9d5
   - name: quay.io/modh/must-gather@sha256:f74b3bf513aa32fa5b60bef431849de1b77bb9b6686c52208fe7f92447937325`
  
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
