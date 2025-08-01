# Machina Labs Assignment

To build and run the Docker container:
```
docker compose up
```
then navigate to http://localhost:5173

### To change the port
Open `docker-compose.yml` and change the value before the colon under `ports`:
```yaml
ports:
  - "5173:5173"
```

### To change the remote server
Open `vite.config.ts` and change the `target` value in the proxy options:
```js
server: {
    proxy: {
      '/api': {
          target: 'http://challenge.machinalabs.ai',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
    }
  },
```


