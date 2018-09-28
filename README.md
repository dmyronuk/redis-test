# Redis Primer

## Overview
* Runs on server-side like a conventional database but data is stored in RAM instead of to disk
* Linux recommended for deployment [link](https://redis.io/topics/introduction)
* No official Windows support but Microsoft develops and maintains its own port [link](https://github.com/MicrosoftArchive/redis)
* Known for its speed

## Data Persistence
* A 'snapshot' of data is written periodically to disk so that it is not lost in the event of a server crash
* Data can also be manually written to disk using the SAVE or BGSAVE commands

## Use-Cases
* Session Cache
* Queues
* Leaderboards/Counting
* Pub/Sub
* Real time analysis + spam filtering

## Lua Scripting
* Lua interpreter is bundled with redis
* Scripts can be run directly on the server using the EVAL command
* [Redis Docs](https://redis.io/commands/eval)
* [Lua Docs](https://www.lua.org/docs.html)

## Clients
* [Full list of Java clients](https://redis.io/clients)
* [lettuce.io](https://lettuce.io/)
* [jedis](https://github.com/xetorthio/jedis)
* Demo uses NodeJS client [NodeRedis](https://www.npmjs.com/package/redis)

## Links
* [Twitter dev talks about using Redis to store latest tweets](https://www.infoq.com/presentations/Real-Time-Delivery-Twitter)
* [Accessible talk on Redis use-cases](https://www.youtube.com/watch?v=jTTlBc2-T9Q)

