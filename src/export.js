const es = require("event-stream");

// Stream orders as CSV so big exports never sit in memory.
module.exports.ordersCsv = (orders) =>
  es.readArray(orders).pipe(es.map((o, cb) => cb(null, `${o.id},${o.total}\n`)));
