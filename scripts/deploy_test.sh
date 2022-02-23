#!/bin/bash

craco build || exit 0;

firebase deploy --only hosting:channel:deploy testing || exit 0;

rm -r build
