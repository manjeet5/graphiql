Welcome to my version of graphiql!

## Installation and Usage
You can download this repo to play with the functionalities stated above

#### Clone the repo
```
https://github.com/manjeet5/graphiql.git
```

#### Install the packages
```
yarn install
```

#### Run the application locally
```
yarn run
```

#### Get Graphql endpoint
You can use [fakeQL](https://fakeql.com/) to deploy a fake graphql endpoint. They also provide you a list of sample queries that you can run on the graphql endpoint.

#### run tests
```
yarn test
```
When you add --coverage flag to the above command, many test results are failing. Please note that this a issue with the recent version of jest. Still working on resolving it

## Functionalities
- Choose the graphql endpoint against which you would like to run queries
- Write the query/mutation details in the query editor and click on the run button, to see results.
- The result of the query is formatted as follows:
    - indented to allow you to follow through nested data
    - string and numbers are color-coded
    - accentuated with line numbers
- Save the graphql queries using the save button. Please note that queries are saved in relation to the endpoint.
- History button will allow you to view the list of saved queries for a specific endpoint in a right-aligned modal
- You can delete the saved query
- You can make the saved query an active query in the query editor
- Query editor and result window can be resized as per your discretion
- You should be able to use keypad to navigate through the entire experience

Here is how the platform looks like
![graphiql platform](https://github.com/manjeet5/graphiql/blob/editor/public/graphiql.png)