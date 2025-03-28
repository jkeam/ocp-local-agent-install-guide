<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInputStore } from '../stores/inputs.js'
import { useDisconnectedStore } from '../stores/disconnected.js'
import AgentConfigs from '@/components/AgentConfigs.vue';
import InstallConfig from '@/components/InstallConfig.vue';
import DisconnectedSteps from '@/components/DisconnectedSteps.vue';
import { ref } from 'vue';

const inputStore = useInputStore();
const disconnectedStore = useDisconnectedStore();
const { pullSecret } = storeToRefs(inputStore);
const { inventoryContents, imageSetConfig } = storeToRefs(disconnectedStore);

</script>

<template>
    <div>
        <li>
            Create the ansible inventory file<br/>
            <VCodeBlock
                :code="inventoryContents"
                highlightjs
                label="inventory"
                theme="neon-bunny"
            />
        </li>
        <li>
            Create the pull secret file<br/>
            <VCodeBlock
                :code="pullSecret"
                highlightjs
                label="pullsecret.json"
                theme="neon-bunny"
                lang="json"
            />
        </li>
        <li>
            Create the image set config file<br/>
            <VCodeBlock
                :code="imageSetConfig"
                highlightjs
                label="imagesetconfig.yaml"
                theme="neon-bunny"
            />
        </li>
        <li>
            Build the container bundler<br/>
            <VCodeBlock
                code="podman build -t ocp-mirror -v pullsecret.json:/root/.docker/config.json:Z -v imagesetconfig.yaml:/home/cmirror/imagesetconfig.yaml:Z ."
                highlightjs
                theme="neon-bunny"
                lang="bash"
            />
        </li>
    </div>
</template>


<style scoped>
.scrollable {
  overflow-y: scroll;
  height: 100vh;
}
</style>