# eldardap

RDAP client to retrieve information about domain names. Right now 1196 domain zones using RDAP, which will slowly replace WHOIS.

#What is RDAP
The Registration Data Access Protocol (RDAP) enables users to access current registration data and was created as an eventual replacement for the WHOIS protocol. RDAP was developed by the technical community in the Internet Engineering Task Force (IETF).

# Example of usage
To get information about domain:

```js
const rdap = require('eldardap');

const getDomain = async () => {
  const result = await rdap('e1dar.com', 'domain');  
  return result;
}
```

To get information about IP:
```js
const rdap = require('eldardap');

const getIP = async () => {
  const result = await rdap('8.8.8.8', 'ip');  
  return result;
}
```
# Return result
Return result depends of domain zone administrators, but it should comply with [RFC 7483](https://tools.ietf.org/html/rfc7483 "RFC 7483").