export function getTokenInfo(token) {
    const tokenParts = token.split(".");
    const payloadBase64 = tokenParts[1]; 
  
    const payloadString = atob(payloadBase64);
    return JSON.parse(payloadString);
  }
  