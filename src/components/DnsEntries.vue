<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInputStore } from '../stores/inputs.js'

const inputStore = useInputStore();
const { dnsZone, clusterName, apiVip, ingressVip, pullSecret } = storeToRefs(inputStore);

</script>

<template>
    <p>Create the following DNS entries based on your inputs</p>
    <table>
        <tbody>
            <tr>
                <td>Entry</td>
                <td>Type</td>
                <td>Value</td>
            </tr>
            <tr>
                <td>*.apps.{{  clusterName }}.{{ dnsZone }}</td>
                <td>A</td>
                <td>{{ ingressVip }}</td>
            </tr>
            <tr>
                <td>api.{{  clusterName }}.{{ dnsZone }}</td>
                <td>A</td>
                <td>{{ apiVip }}</td>
            </tr>
            <tr>
                <td>api-int.{{  clusterName }}.{{ dnsZone }}</td>
                <td>A</td>
                <td>{{ apiVip }}</td>
            </tr>
        </tbody>
    </table>
</template>
