const tld = require("./servers.js");
const axios = require('axios');

const error = {
  NOTLD: 'domain zone not found'
};

const RESULT = {
  TRUE: true,
  FALSE: false
}

const query = async (domain, {timeout = 2000} = {})  => {
  const tldName = domain.substring(domain.indexOf(".")+1);

  if (typeof tld[tldName] === 'undefined') {
    return {
      result: RESULT.FALSE,
      rdap: error.NOTLD,
      description: {
          dnszone: tldName
        }
      }
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
      throw new Error(`Error: ${res.status}. \n Try again later or check input`);        
    } else if (res.status != 200) {
      // TODO: report this condition properly
      console.error(JSON.stringify(res.data));
      throw new Error(`Error: ${res.status}. \n Try again later or check input`);       
    } else {
      return {
        result: RESULT.TRUE,
        rdap: res.data
      };
    }
  }
}

module.exports = query;