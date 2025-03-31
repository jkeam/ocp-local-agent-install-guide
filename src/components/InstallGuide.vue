<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInputStore } from '../stores/inputs.js'
import AgentConfigs from '@/components/AgentConfigs.vue';
import InstallConfig from '@/components/InstallConfig.vue';
import DisconnectedSteps from '@/components/DisconnectedSteps.vue';

const inputStore = useInputStore();
const { clusterName, dnsZone, pullSecret, publicKey, masters, workers, downloadUrls, disconnected, distType } = storeToRefs(inputStore);

const cliDownload = `curl -LO ${downloadUrls.value.oc}`;
const installerDownload = `curl -LO ${downloadUrls.value.installer}`;
const extractDownloads = `tar -xvzf ${downloadUrls.value.ocFilename }
tar -xvzf ${downloadUrls.value.installerFilename}`;
const createImage=`./openshift-install agent create image`
const fixpostgres=
`#!/bin/bash
sudo su -
sed -i "s#ExecStart=.*#ExecStart=/usr/bin/podman run --net host --user=postgres --cidfile=%t/%n.ctr-id --cgroups=no-conmon --log-driver=journald --rm --pod-id-file=%t/assisted-service-pod.pod-id --sdnotify=conmon --replace -d --name=assisted-db --env-file=/usr/local/share/assisted-service/assisted-db.env \\$SERVICE_IMAGE /bin/bash -c '/usr/bin/pg_ctl -D /tmp/postgres/data/ -l /tmp/postgres/logfile start -w -o \\"-k /tmp\\"; createuser -s admin -h localhost; createdb installer -h localhost; /usr/bin/pg_ctl -D /tmp/postgres/data/ -l /tmp/postgres/logfile stop -w -o \\"-k /tmp\\"; exec postgres -D /tmp/postgres/data/ -k /tmp'#g" /etc/systemd/system/assisted-service-db.service
systemctl daemon-reload && systemctl restart assisted-service-db
`

</script>

<template>
  <div class="scrollable">
    <ol>
       <DisconnectedSteps v-if="disconnected" />
        <li>
          Download the oc cli tool <br/>
          <VCodeBlock
                :code="cliDownload"
                highlightjs
                lang="bash"
                theme="neon-bunny"
            />
        </li>
        <li>
          Download the openshift installer <br/>
          <VCodeBlock
                :code="installerDownload"
                highlightjs
                lang="bash"
                theme="neon-bunny"
            />
        </li>
        <li>
          Extract the downloads <br/>
          <VCodeBlock
                :code="extractDownloads"
                highlightjs
                lang="bash"
                theme="neon-bunny"
            />
        </li>
        <li>
          Save the file
          <AgentConfigs />
        </li>
        <li>
          Save the file
          <InstallConfig />
        </li>
        <li>
          Create the agent iso for installation<br/>
          <VCodeBlock
                :code="createImage"
                highlightjs
                lang="bash"
                theme="neon-bunny"
            />
          <code>
            
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