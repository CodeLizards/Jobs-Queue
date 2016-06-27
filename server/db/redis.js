var redis = require('redis');
module.exports = redis.createClient();

// export const sendMessage = (sender, recipient, message) => {
//   const [teacher, student] = teacherOrStudent(sender, recipient);
//   const chat = JSON.stringify(message);

//   client.on('error', (err) => (
//     console.log('Error connecting to redis server in sendMessage ', err)
//   ));

//   // put sent message into redis store
//   client.lpush(`${teacher}and${student}`, chat, (err, reply) => {
//     if (err) {
//       return console.log('Error pushing message to redis store');
//     }
//     return reply;
//   });
// };

