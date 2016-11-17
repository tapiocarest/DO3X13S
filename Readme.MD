DO3X13S
===========

DO3X13S - CA World Session: Modernizing the Mainframe With APIs and CA API Management

This demo demonstrates CA APIM and Tapioca Plugin, exposing Mainframe CA System View API through Tapioca.

# Environment
1. AWS Image: ami-a7775db0
2. Web 

## AWS
The AWS image include:
1. docker ca-apim
2. docker hercules
3. docker c3270
4. apache (host) with ssl for the api.tapioca.rest and app.tapioca.rest domains

## URL
1. api.tapioca.rest: expose the API
2. app.tapioca.rest: dashboard web (user: admin@tapioca.rest and pass:admin)

## Web Deployment Process
1. Use the `build web` command to pack the web directory in a `.tar.gz` archive file.
2. `scp` it to the target server.
3. On the target server use the `update-web` script, to unpack the web archive file and automatically set it as the current version.

The server is configured to use a simple versioning strategy, based on symlinks. Rolling back a bad update requires only symlinking the `/var/www/master` path to the desired release directory inside `/var/www/branches/`.
