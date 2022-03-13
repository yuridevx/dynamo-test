# Deployment

1. Install nodejs, yarn, make, aws sam cli, aws cli
2. sam build
3. sam deploy

# Solution descriptions

## Authentication

Using X-API-KEY is vague, and why force X-* header name? Authentication could've been implemented using:

* Gateway API level: Lambda, Cognito, Oauth
* In the lambda function itself
    * With opaque tokens
    * JWT tokens
* ...

Implemented using :

* In lambda function
* Authentication: Bearer JWT
* HS256
* secret: secret