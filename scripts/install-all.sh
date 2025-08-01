#!/usr/bin/env bash

set -e

npm --prefix=frontend install --legacy-peer-deps
npm --prefix=backend install
