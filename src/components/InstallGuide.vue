<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInputStore } from '../stores/inputs.js'
import AgentConfigs from '@/components/AgentConfigs.vue';
import InstallConfig from '@/components/InstallConfig.vue';
import DisconnectedSteps from '@/components/DisconnectedSteps.vue';

const inputStore = useInputStore();
const { clusterName, dnsZone, pullSecret, publicKey, masters, workers, downloadUrls, disconnected } = storeToRefs(inputStore);


</script>

<template>
  <div class="scrollable">
    <ol>
       <DisconnectedSteps v-if="disconnected" />
        <li>
          Download the oc cli tool <br/>
          <code>curl -LO {{ downloadUrls.oc }}</code>
        </li>
        <li>
          Download the openshift installer <br/>
          <code> curl -LO {{ downloadUrls.installer }}</code>
        </li>
        <li>
          Extract the downloads <br/>
          <code>
            tar -xvzf {{ downloadUrls.ocFilename }}
          </code><br/>
          <code>
            tar -xvzf {{ downloadUrls.installerFilename }}
          </code>
        </li>
        <li>
          Save the file contents below as agent-config.yaml
          <AgentConfigs />
        </li>
        <li>
          Save the file contents below as install-config.yaml
          <InstallConfig />
        </li>
        <li>
          Create the agent iso for installation<br/>
          <code>
            ./openshift-install agent create image
          </code>
        </li>
    </ol>
  </div>
</template>


<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 100vh;
}
</style>