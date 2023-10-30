# danl-basic-http-listener

## Requirements
- Node.js >= 16

## How to run

1. Open command line to repo root
1. Run `npm install`
1. Run `npm start`

## How to add endpoints

Add a new function to `index.ts`:

```typescript
app.post("/my-url-goes-here", (request, response) => {
	// do stuff with the request
	console.log(request.body);

	// do stuff with the response
	response.send(200, {success: "true"})
});
```
- use `app.METHOD` (e.g. `app.get`, `app.post`)
- `request` is an object containing details about the [request](https://expressjs.com/en/5x/api.html#req)
- `response` exposes methods and data for the [response](https://expressjs.com/en/5x/api.html#res)
