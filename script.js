document.getElementById('subnetForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const ipAddress = document.getElementById('ipAddress').value;
    const numHosts = parseInt(document.getElementById('numHosts').value);
    const numSubnets = parseInt(document.getElementById('numSubnets').value);
    const resultDiv = document.getElementById('result');
  
    // Funzione per calcolare la subnet mask
    const calculateSubnetting = (ip, hosts, subnets) => {
      let subnetBits = Math.ceil(Math.log2(subnets));
      let hostBits = Math.ceil(Math.log2(hosts + 2)); // Aggiungiamo 2 per tenere conto del network e broadcast
      let totalBits = 32 - (subnetBits + hostBits);
  
      let mask = 32 - hostBits;
      let subnetMask = Array(4).fill(255).map((v, i) => i < Math.floor(mask / 8) ? 255 : 0)
        .map((v, i) => i === Math.floor(mask / 8) ? (256 - Math.pow(2, 8 - (mask % 8))) : v)
        .join('.');
  
      return {
        subnetMask: subnetMask,
        availableHosts: Math.pow(2, hostBits) - 2,
        subnetBits: subnetBits,
        totalSubnets: Math.pow(2, subnetBits)
      };
    };
  
    const { subnetMask, availableHosts, subnetBits, totalSubnets } = calculateSubnetting(ipAddress, numHosts, numSubnets);
  
    // Mostra i risultati
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
      <p><strong>Indirizzo IP:</strong> ${ipAddress}</p>
      <p><strong>Subnet Mask:</strong> ${subnetMask}</p>
      <p><strong>Host disponibili:</strong> ${availableHosts}</p>
      <p><strong>Numero di sottoreti:</strong> ${totalSubnets}</p>
    `;
  });
  