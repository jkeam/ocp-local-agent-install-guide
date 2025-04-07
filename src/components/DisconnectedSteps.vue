<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInputStore } from '../stores/inputs.js'
import { useDisconnectedStore } from '../stores/disconnected.js'
import AgentConfigs from '@/components/AgentConfigs.vue'
import InstallConfig from '@/components/InstallConfig.vue'
import DisconnectedSteps from '@/components/DisconnectedSteps.vue'
import { ref } from 'vue'

const inputStore = useInputStore()
const disconnectedStore = useDisconnectedStore()
const { pullSecret } = storeToRefs(inputStore)
const { inventoryContents, imageSetConfig } = storeToRefs(disconnectedStore)
</script>

<template>
  <div>Run the following commands on a machine that has internet access.</div>
  <ol>
    <li>
      Download the playbooks and container file
      <VCodeBlock highlightjs lang="bash" code="curl -LO https://github.com/mathianasj/ocp-mirror-automation/archive/refs/heads/master.zip
unzip master.zip
cp -r ocp-mirror-automation-master/* ."/>
    </li>
    <li>
      Create the ansible inventory file<br />
      <VCodeBlock :code="inventoryContents" highlightjs label="inventory" theme="neon-bunny" />
    </li>
    <li>
      Create the pull secret file<br />
      <VCodeBlock
        :code="pullSecret"
        highlightjs
        label="pullsecret.json"
        theme="neon-bunny"
        lang="json"
      />
    </li>
    <li>
      Create the image set config file<br />
      <VCodeBlock
        :code="imageSetConfig"
        highlightjs
        label="imagesetconfig.yaml"
        theme="neon-bunny"
      />
    </li>
    <li>
      Build the container bundler<br />
      <VCodeBlock
        code="podman build -t ocp-mirror -v $(pwd)/pullsecret.json:/home/cmirror/.docker/config.json:Z ."
        highlightjs
        theme="neon-bunny"
        lang="bash"
      />
    </li>
    <li>
      Export the tar image to run in the restricted network<br />
      <VCodeBlock
        code="podman save -o ocpmirror.tar ocp-mirror:latest"
        highlightjs
        theme="neon-bunny"
        lang="bash"
      />
    </li>
    <li>Copy the tar file to a machine that has access to the specified mirror hostname</li>
  </ol>
  <div>
    Complete the remaining steps on the host you copied the tar file to in the previous step
  </div>
</template>

<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 100vh;
}
</style>
