# SPIKE branch for real time data sync for itinerary

- This code chunk will query and provide almost real-time data. 
- It queries every 100 ms, so whenever a change is made, it is practically real time
- This might provide us ways for others to make changes and see results immediately, especially for sharing itineraries
- I think query might be costly, so going to comment out for now, but it is possible
- Only changes we would need to make is get rid of local json instance and basically just feed in `testData` from the example below. We can give it a test soon.

```
  const { data: testData } = useQuery(FIND_MONGODB_ITINERARY, {
    client: mongodbClient,
    pollInterval: 100,
    variables: {
      id: data['findItineraryByPublicIdentifier']['mongoid'],
    },
  });

  useEffect(() => {
    console.log(testData);
  }, [testData]);
```

Mirador web front end

## Installation

Use the package manager [yarn](https://classic.yarnpkg.com/en/docs/install) to install all dependencies.

Run ```yarn install```

## Run development server

To run our development server

Run ```yarn start:dev``` in the root folder of the project

## Front Libraries

We mainly use chakra but only use bootstrap when we cannot do it in Chakra.

Chakra https://chakra-ui.com/docs/getting-started

React bootstrap https://react-bootstrap.github.io/getting-started/introduction

## TODO
- [ ] Adding lazy loading to our route components

## Contributors

<table>
  <tr>
    <td align="center">
        <a href="https://github.com/baileyg2016" target="_blank"><img src="https://avatars3.githubusercontent.com/u/23178729?s=460&v=4" width="100px;" alt=""/>
            <br />
            <sub><b text-align="center">Bailey Spell</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/geomin76" target="_blank"><img src="https://avatars2.githubusercontent.com/u/31418725?s=460&v=4" width="100px;" alt=""/>
            <br />
            <sub><b text-align="center">Geo Min</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/kaityhallman" target="_blank"><img src="https://avatars2.githubusercontent.com/u/10733854?s=460&v=4" width="100px;" alt=""/>
            <br />
            <sub><b text-align="center">Kaity Hallman</b></sub>
        </a>
    </td>
  </tr>
</table>
