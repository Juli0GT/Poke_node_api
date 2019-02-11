# Poke_node_api

Node.js / express.js API using redis as a cashing layer.

## Instructions

Build an API that given a Pokemon’s name returns that Pokemon’s abilities:

* Use an external service for the API (e.g.  [http://pokeapi.co](http://pokeapi.co) )
* Cache external API responses (persistent cache)

What we expect:
1. Automated Tests with full coverage
2. Make API and Cache easily exchangeable for other services 
3. Document your code
4. Follow best practices for Node 
5. Clean/readable code 

## To Run the System

  - Install redis globally in your local machine: https://redis.io/topics/quickstart.
  - In './redis.conf' line 259 change path to your local path to the current repository, example:
    ```dir "/Users/juliogt/projects/Training/JS_Training/Poke_node_api"``` 
  - Run ```npm install```
  - Run ```npm run redis```
  - Run ```npm run start``` (with redis running in a different tab)
  - Test your application visiting http://localhost:3000/pokemon/:name
  - Example: ```http://localhost:3000/pokemon/pikachu```
  
## To Run the test suite

  - Run ```npm run test```
  
  
  



