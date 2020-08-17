const fs = require('fs');

export const cachePostInfo = post => {
  fs.writeFileSync('cache.json', JSON.stringify(post));
};
