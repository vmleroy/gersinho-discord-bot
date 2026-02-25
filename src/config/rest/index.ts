import { REST } from 'discord.js';
import { config } from '@/config';

const restOptions = { version: '10', retryLimit: 3 };

// Validate retry options
if (typeof restOptions.retryLimit !== 'number' || restOptions.retryLimit < 0) {
  console.warn('[REST] | Invalid retryLimit, using default value of 3');
  restOptions.retryLimit = 3;
}

const Rest = new REST(restOptions).setToken(config.token);

// Monkey-patch request method to log retries
const origRequest = Rest.request.bind(Rest);
Rest.request = async function (...args) {
  let attempt = 0;
  const maxRetries = restOptions.retryLimit ?? 3;
  while (true) {
    try {
      const response = await origRequest(...args);
      return response;
    } catch (err) {
      if (attempt < maxRetries) {
        attempt++;
        console.log(`\t[REST] | Retry attempt ${attempt} for request`, args[0]);
      } else {
        throw err;
      }
    }
  }
};

export { Rest };
