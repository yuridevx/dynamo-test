# Deployment

1. Install nodejs, yarn, make, aws sam cli, aws cli
2. sam build
3. sam deploy

# Testing

1. You can run `request/test-catalog.http`
2. Endpoint url is the first line in the file

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
* The correct way to implement it would be to load data from AWS secret manager, instead of ENV variable and
  cloudformation parameter