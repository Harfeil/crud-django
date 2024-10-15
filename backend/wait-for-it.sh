#!/usr/bin/env bash

# Use this script to test if a service is up.
# Usage: wait-for-it.sh host:port [-t timeout] [-- command args]
# Example: wait-for-it.sh db:3306 -- python manage.py migrate

set -e

host_port="$1"
shift

# Extract host and port from the argument
host=$(echo "$host_port" | cut -d: -f1)
port=$(echo "$host_port" | cut -d: -f2)

# Default timeout of 15 seconds
timeout=15

# Parse optional -t timeout flag
if [ "$1" == "-t" ]; then
  timeout="$2"
  shift 2
fi

# Wait for the host and port to become available, with a timeout
echo "Waiting for $host:$port to become available (timeout: $timeout seconds)..."

end_time=$(($(date +%s) + timeout))

while ! nc -z "$host" "$port"; do
  sleep 1
  if [ $(date +%s) -ge $end_time ]; then
    echo "Timeout waiting for $host:$port after ${timeout} seconds"
    exit 1
  fi
done

echo "$host:$port is available!"

# Execute the following command if the connection was successful
exec "$@"
