@echo off
set NODE_OPTIONS=--openssl-legacy-provider
yarn run craco-build-internal
