#!/usr/bin/env bash
docker build -t affine-foundry -f docker/dev.Dockerfile .
docker run --init -p 3000:80 affine-foundry
