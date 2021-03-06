const redis = require('redis');

const client = redis.createClient();

client.on('connect', () => {
  console.log(`connected to redis`);
});
client.on('error', err => {
  console.log(`Error: ${err}`);
});

const get = ({
  path,
  client,
}) => new Promise((resolve, reject) => {
  try {
    client.get(path, (err, value) => {
      if (err) reject(err);
  
      if (value) {
        console.log('Pokemon abilities exist')
        const json = JSON.parse(value);
  
         resolve(json);
      } else {
        console.log('Pokemon abilities dont exist')
  
         resolve(false);
      }
    });
  } catch (err) {
    resolve(err)
  }
});

const set = ({
  path,
  data,
  status,
  client,
}) => {
  const value = {
    data,
    status,
  };

  const valueTostore = JSON.stringify(value);

  client.set(path, valueTostore, (err, reply) => {
    if (err) console.log(err);
    console.log('REPLY', reply);
  })
}


module.exports = {
  get,
  set,
  client,
};

