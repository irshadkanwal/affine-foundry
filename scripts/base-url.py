#! /usr/bin/env python3

import fileinput
import re
import os

# This script goes through the provided file,
# and replaces "##BASE_URL##" with the $BASE_URL environment variable.
#
# Note that if the $BASE_URL environment variable is not set, the value will be set to an empty string.
#
# Example:
#
# $ ./scripts/base-url.py src/config.js
base_url = os.environ['BASE_URL']
p = re.compile(r'(export const BASE_URL) = .+')
for line in fileinput.input(inplace=1):
    line =  p.sub(r'\1 = "{}";'.format(base_url),line.rstrip())
    print(line)
