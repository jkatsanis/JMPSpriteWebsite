const Config = () => {
    const port  =  8080;
    const externalPort = 8080;
    const domain = "http://localhost";
    const externalDomain = "http://localhost";
    
    return {
        port: parseInt(port.toString()),
        externalPort: parseInt(externalPort.toString()),
        domain: domain,
        externalDomain: externalDomain,
        address: `${domain}:${port}`,
        externalAddress: `${externalDomain}:${externalPort}`
    }
}
export default Config();