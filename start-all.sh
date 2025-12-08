#!/bin/bash
echo "Starting API server on port 8082..."
node server/index.js &
API_PID=$!
echo "API server started with PID $API_PID"
sleep 2
echo "Starting Expo development server..."
npm run dev

trap "kill $API_PID 2>/dev/null" EXIT
