<environment>
A Docker daemon is available to you. `DOCKER_HOST` and `COMPOSE_PROJECT_NAME` are already
set in your shell. Use them as they are, and do not pass `-p` to `docker compose`.
Host ports for this stack are in `LB_PORT`, `LLM_PORT`, `PG_PORT` and `REDIS_PORT`.
Ports the stack publishes are reachable at the host in `STACK_HOST`, not at `localhost`.
Stop the stack with `docker compose down -v` before you finish.
</environment>
