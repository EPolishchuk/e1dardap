const tld = require("./servers.json");
const ipbase = require("./ip.json");
const axios = require('axios');

const error = {
  NOTYPE: 'RDAP doesn\'t support this type',
  NOTLD: 'domain zone not found or don\'t support RDAP',
  NOIP: 'IP range not found or don\'t support RDAP'
};

const timeout = 2000;

const query = async (resource, type)  => {
  if (typeof type === 'undefined' || !(typeof type === 'string'))
    throw new Error(`${error.NOTYPE}. \nYou send type: ${type}`);

  switch (type.toLowerCase()) {
    case 'domain':       
      return domain(resource);
    case 'ip':
      return ip(resource); 
    default:
      throw new Error(`${error.NOTYPE}. \nYou send type: ${type}`);     
  }

}

const domain = async (domain) => {
  const tldName = domain.substring(domain.indexOf(".")+1);

  if (typeof tld[tldName] === 'undefined') {      
      throw new Error(`${error.NOTLD}. \n Try again later or check input
                      \nYour domain zone: ${tldName}`);
  }

  else {
    const query_url = tld[tldName] + 'domain/' + domain;   

    const res = await axios.get(query_url, {
      timeout,
      validateStatus: false,
      headers: {
        'Accept': 'application/rdap+json'
      }
    });

    if (res.status >= 400 && res.status < 500) {
      // TODO: report this condition properly
      console.error(JSON.stringify(res.data));
      throw new Error(`Error: ${res.status}. \nTry again later or check input`);        
    } else if (res.status != 200) {
      // TODO: report this condition properly
      console.error(JSON.stringify(res.data));
      throw new Error(`Error: ${res.status}. \nTry again later or check input`);       
    } else {
      return res.data;
    }
  }
}

const ip = async (ip) => {
  const firstOctet = ip.includes(':') ? ip.split(':')[0] : ip.split('.')[0];

  if (typeof ipbase[firstOctet] === 'undefined') {      
      throw new Error(`${error.NOIP}. \nTry again later or check input
                      \nFirst octet from your IP: ${firstOctet}`);
  }

  else {
    const query_url = ipbase[firstOctet] + 'ip/' + ip;   

    const res = await axios.get(query_url, {
      timeout,
      validateStatus: false,
      headers: {
        'Accept': 'application/rdap+json'
      }
    });

    if (res.status >= 400 && res.status < 500) {
      // TODO: report this condition properly
      console.error(JSON.stringify(res.data));
      throw new Error(`Error: ${res.status}. \nTry again later or check input`);        
    } else if (res.status != 200) {
      // TODO: report this condition properly
      console.error(JSON.stringify(res.data));
      throw new Error(`Error: ${res.status}. \nTry again later or check input`);       
    } else {
      return res.data;
    }
  }
}

module.exports = query;