# Goals for the boilerplate

* Testability of the code outside of AWS lambda
    * By using proper patterns and abstractions
    * Leveraging some DI principles
        * Using dependency inversion (env config, dynamodb config)
        * Not using DI framework to keep it simple
* Input validation
    * Using fastify schema
* Error handling
    * Custom code in fastify error handler