#!/bin/bash
cd /home/kavia/workspace/code-generation/emosense-pro-35618-d354b576/emospense_pro_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

