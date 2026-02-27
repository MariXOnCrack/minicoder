# Use a lightweight Python image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the project files to the container
COPY . .

# Expose the port that the application runs on
EXPOSE 9000

# Run the Python server on container start
# -u for unbuffered output to see logs in Docker
# --directory /app ensures we serve the correct folder even in Portainer/Stacks
CMD ["python", "-u", "-m", "http.server", "9000", "--directory", "/app"]
