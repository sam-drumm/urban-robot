## Setup
- Please set the .env variables based on the supplied DB user and password. 
- Please set the port number and host in db.ts configuration

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development

```
npm run start

```
## API Documentation

### Paths    
    /postcode/{postcode}:
        get:
        summary: Get addressess that match specific postcode
### Parameters:
        - name: postcode
        in: path
        required: true
        description: The postcode to get address information
        schema:
            type: string
            format: 
                - Starts with a single letter (either uppercase or lowercase).
                - Followed by a single digit between 1 and 9.
                - Followed by a single space.
                - Followed by a single digit between 1 and 9.
                - Ends with exactly two letters (either uppercase or lowercase).

### Responses:
        '200':
        description: A list of addresses for the given postcode
        content:
            application/json:
            schema:
                type: object
                properties:
                data:
                    type: array
                    items:
                    type: string
        '400':
        description: Format is invalid
        '404':
        description: No matching records found for the given postcode
        '500':
        description: Unexpected error occurred
