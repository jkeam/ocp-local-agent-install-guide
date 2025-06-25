import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export interface Machine {
  hostname: string,
  interfaceName: string,
  macAddress: string,
  deviceHintName: string,
  ipAddress: string,
  dnsServer: string,
  defaultRoute: string,
}

export interface OperatorChannel {
  csvName: string,
  displayName: string,
  additionalImages: string[],
}

export interface OperatorPackage {
  defaultDisplayName: string,
  packageName: string,
  defaultChannel: string,
  channels: Map<String, OperatorChannel>,
}

interface IDownloadUrl {
  oc: string,
  ocFilename?: string,
  installer: string,
  installerFilename?: string
}

interface IOptions {
  [propName: string]: IDownloadUrl
}

export const useInputStore = defineStore('inputs', () => {
  const dnsZone = ref("example.com");
  const clusterName = ref("testcluster");
  const apiVip = ref("192.168.6.20");
  const ingressVip = ref("192.168.6.21");
  const pullSecret = ref("{}")
  const clusterType = ref("standard");
  const showVips = ref(true);
  const workerCount = ref(2);
  const publicKey = ref("");
  const machineType = ref("mac_64");
  const downloadUrls = ref<IDownloadUrl>({
    oc:"",
    ocFilename: "",
    installer: "",
    installerFilename: ""
  });
  const machineCidr = ref("192.168.6.0/24")
  const disconnected = ref(false);
  const mirrorHostName = ref("");
  const mirrorHostUsername = ref("");
  const distType = ref("ocp");
  const quayRoot = ref("/quay")

  const operators = ref<Map<String, OperatorPackage>>(new Map<String, OperatorPackage>())

  const regex : RegExp = /(?:.*:\/\/)(?:.*\/)(.*)/gm;

  const workers = ref<Machine[]>([
    {
      hostname: "worker-0",
      interfaceName: 'eno1',
      macAddress: '',
      deviceHintName: '/dev/vdb',
      ipAddress: '192.168.100.5',
      dnsServer: '192.168.100.1',
      defaultRoute: '192.168.100.1'
    },
    {
      hostname: "worker-1",
      interfaceName: 'eno1',
      macAddress: '',
      deviceHintName: '/dev/vdb',
      ipAddress: '192.168.100.6',
      dnsServer: '192.168.100.1',
      defaultRoute: '192.168.100.1'
    },
  ])
  
  const masters = ref<Machine[]>([
    {
      hostname: "master-0",
      interfaceName: 'eno1',
      macAddress: '',
      deviceHintName: '/dev/vdb',
      ipAddress: '192.168.100.2',
      dnsServer: '192.168.100.1',
      defaultRoute: '192.168.100.1'
    },
    {
      hostname: "master-1",
      interfaceName: 'eno1',
      macAddress: '',
      deviceHintName: '/dev/vdb',
      ipAddress: '192.168.100.3',
      dnsServer: '192.168.100.1',
      defaultRoute: '192.168.100.1'
    },
    {
      hostname: "master-2",
      interfaceName: 'eno1',
      macAddress: '',
      deviceHintName: '/dev/vdb',
      ipAddress: '192.168.100.4',
      dnsServer: '192.168.100.1',
      defaultRoute: '192.168.100.1'
    }
  ])

  function setDownloadUrl(newM: string) {
    const staticOCPUrls : IOptions = {
      mac_64: {
        oc: "https://mirror.openshift.com/pub/openshift-v4/x86_64/clients/ocp/stable/openshift-client-mac.tar.gz",
        installer: "https://mirror.openshift.com/pub/openshift-v4/x86_64/clients/ocp/stable/openshift-install-mac.tar.gz"
      },
      mac_arm: {
        oc: "https://mirror.openshift.com/pub/openshift-v4/aarch64/clients/ocp/stable/openshift-client-mac-arm64.tar.gz",
        installer: "https://mirror.openshift.com/pub/openshift-v4/x86_64/clients/ocp/stable/openshift-install-mac-arm64.tar.gz"
      },
      linux_64: {
        oc: "https://mirror.openshift.com/pub/openshift-v4/x86_64/clients/ocp/stable/openshift-client-linux.tar.gz",
        installer: "https://mirror.openshift.com/pub/openshift-v4/x86_64/clients/ocp/stable/openshift-install-linux.tar.gz"
      },
      rhel8_64: {
        oc: "https://mirror.openshift.com/pub/openshift-v4/x86_64/clients/ocp/stable/openshift-client-linux-amd64-rhel8.tar.gz",
        installer: "https://mirror.openshift.com/pub/openshift-v4/x86_64/clients/ocp/stable/openshift-install-linux.tar.gz"
      },
      rhel9_64: {
        oc: "https://mirror.openshift.com/pub/openshift-v4/x86_64/clients/ocp/stable/openshift-client-linux-amd64-rhel9.tar.gz",
        installer: "https://mirror.openshift.com/pub/openshift-v4/x86_64/clients/ocp/stable/openshift-install-linux.tar.gz"
      },
    }
    const staticOKDUrls : IOptions = {
      mac_64: {
        oc: "https://github.com/okd-project/okd-scos/releases/download/4.19.0-okd-scos.ec.6/openshift-client-mac-4.19.0-okd-scos.ec.6.tar.gz",
        installer: "https://github.com/okd-project/okd-scos/releases/download/4.19.0-okd-scos.ec.6/openshift-install-mac-4.19.0-okd-scos.ec.6.tar.gz"
      },
      mac_arm: {
        oc: "https://github.com/okd-project/okd-scos/releases/download/4.19.0-okd-scos.ec.6/openshift-client-mac-arm64-4.19.0-okd-scos.ec.6.tar.gz",
        installer: "https://github.com/okd-project/okd-scos/releases/download/4.19.0-okd-scos.ec.6/openshift-install-mac-arm64-4.19.0-okd-scos.ec.6.tar.gz"
      },
      linux_64: {
        oc: "https://github.com/okd-project/okd-scos/releases/download/4.19.0-okd-scos.ec.6/openshift-client-linux-4.19.0-okd-scos.ec.6.tar.gz",
        installer: "https://github.com/okd-project/okd-scos/releases/download/4.19.0-okd-scos.ec.6/openshift-install-linux-4.19.0-okd-scos.ec.6.tar.gz"
      },
      rhel8_64: {
        oc: "https://github.com/okd-project/okd-scos/releases/download/4.19.0-okd-scos.ec.6/openshift-client-linux-amd64-rhel8-4.19.0-okd-scos.ec.6.tar.gz",
        installer: "https://github.com/okd-project/okd-scos/releases/download/4.19.0-okd-scos.ec.6/openshift-install-linux-4.19.0-okd-scos.ec.6.tar.gz"
      },
      rhel9_64: {
        oc: "https://github.com/okd-project/okd-scos/releases/download/4.19.0-okd-scos.ec.6/openshift-client-linux-amd64-rhel9-4.19.0-okd-scos.ec.6.tar.gz",
        installer: "https://github.com/okd-project/okd-scos/releases/download/4.19.0-okd-scos.ec.6/openshift-install-linux-4.19.0-okd-scos.ec.6.tar.gz"
      },
    }
    
    switch(distType.value) {
      case "ocp":
        downloadUrls.value = staticOCPUrls[newM];
        break;
      case "okd":
        downloadUrls.value = staticOKDUrls[newM];
        break;
    }
    
    
    const [[, ocFilename]] = downloadUrls.value.oc.matchAll(regex);
    const [[, installerFilename]] = downloadUrls.value.installer.matchAll(regex);

    downloadUrls.value.ocFilename = ocFilename;
    downloadUrls.value.installerFilename = installerFilename;
  }

  watch(machineType, (newM, oldM) => {
    setDownloadUrl(newM);
  })

  watch(distType, (n, o) => {
    setDownloadUrl(machineType.value);
  })
  
  watch(workerCount, (newCount, oldCount) => {
    const newWorkers = []

    let i = 0;
    while(i < newCount) {
      if(i >= oldCount) {
        newWorkers[i] = {
          hostname: "",
          interfaceName: '',
          macAddress: '',
          deviceHintName: '',
          ipAddress: '',
          dnsServer: '',
          defaultRoute: ''
        }
      } else {
        newWorkers[i] = workers.value[i];
      }
      i++;
    }

    workers.value = newWorkers;
  })

  // update vips
  watch([clusterType, masters], ([oldType, oldMachines], [newType, newMachines]) => {
    showVips.value = newType == "standard" || newType == "compact";

    if(!showVips.value) {
      apiVip.value = masters.value[0].ipAddress
      ingressVip.value = masters.value[0].ipAddress
    }

    if(oldType === "sno" && newType !== oldType) {
      apiVip.value = ""
      ingressVip.value = ""
    }
  }, {deep: true})

  watch(clusterType, (newType, oldType) => {
    const localShowVips = newType == "standard" || newType == "compact";

    if(!localShowVips) {
      masters.value = [masters.value[0]]
      workers.value = []
      apiVip.value = masters.value[0].ipAddress
      ingressVip.value = masters.value[0].ipAddress
    } else {
      masters.value = [masters.value[0],masters.value[0],masters.value[0]]

      if(newType === "compact") {
        workers.value = []
      } else {
        workers.value = [
          {
              hostname: "",
              interfaceName: '',
              macAddress: '',
              deviceHintName: '',
              ipAddress: '',
              dnsServer: '',
              defaultRoute: ''
          },
          {
            hostname: "",
            interfaceName: '',
            macAddress: '',
            deviceHintName: '',
            ipAddress: '',
            dnsServer: '',
            defaultRoute: ''
          }
        ]
      }
    }
  });

  setDownloadUrl(machineType.value);

  return { 
    dnsZone,
    clusterName,
    apiVip,
    ingressVip,
    pullSecret,
    masters,
    clusterType,
    showVips,
    workers,
    workerCount,
    publicKey,
    machineType,
    downloadUrls,
    machineCidr,
    disconnected,
    mirrorHostName,
    mirrorHostUsername,
    distType,
    quayRoot,
    operators
  }
})
