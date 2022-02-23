#!/bin/bash

craco build || exit 0;

firebase deploy --only hosting:bootspacetwo || exit 0;

rm -r build