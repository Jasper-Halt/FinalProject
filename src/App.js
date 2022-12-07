import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import "./components/CRUD.css";
import TodoList from "./components/TodoList";
import Slider from "./components/Slider";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

export default function App() {
  const posts = [
    {
      id: 1,
      title: "Walmart Supercenter",
      address: "2501 US-180",
      address2: "Silver City, NM  88061",
      phone: "(575) 538 - 2222",
      website: <a href="https://www.walmart.com/store/1357-silver-city-nm">https://www.walmart.com/store/1357-silver-city-nm</a>,
      purpose: "Groceries, toiletries, minor furniture, general shopping."
    },
    {
      id: 2,
      title: "Albertsons",
      address: "1956 US-180",
      address2: "Silver City, NM  88061",
      phone: "(575) 388 - 1909",
      website: <a href="https://local.albertsons.com/nm/silver-city.html">https://local.albertsons.com/nm/silver-city.html</a>,
      purpose: "Groceries, toiletries. Better meat/deli than Walmart, but less overall stock."
    },
    {
      id: 3,
      title: "Ace Hardware",
      address: "3025 US-180 E",
      address2: "Silver City, NM  88061",
      phone: "(575) 534 - 0782",
      website: <a href="https://www.acehardware.com/store-details/14590">https://www.acehardware.com/store-details/14590</a>,
      purpose: "Tools, gardening supplies, items for minor DIY and household repair."
    },
    {
      id: 4,
      title: "CVS Pharmacy",
      address: "610 Silver Heighs Blvd.",
      address2: "Silver City, NM  88061",
      phone: "(575) 388 - 1614",
      website: <a href="https://www.cvs.com/store-locator/silver-city-nm-pharmacies/610-silver-heights-blvd-silver-city-nm-88061/storeid=10449">https://www.cvs.com/store-locator/silver-city-nm-pharmacies/610-silver-heights-blvd-silver-city-nm-88061/storeid=10449</a>,
      purpose: "Prescription refills."
    },
    {
      id: 5,
      title: "Tractor Supply Co.",
      address: "2707 Silver Heights Blvd., Hwy 180 East",
      address2: "Silver City, NM  88061",
      phone: "(575) 534 - 9634",
      website: <a href="https://www.tractorsupply.com/tsc/store_SilverCity-NM-88061_1651">https://www.tractorsupply.com/tsc/store_SilverCity-NM-88061_1651</a>,
      purpose: "Gardening supplies, fresh soil, gardening tools."
    },
    {
      id: 6,
      title: "Arenas Valley Animal Clinic",
      address: "11865 Hwy 180 E",
      address2: "Arenas Valley, NM  88022",
      phone: "(575) 388 - 1993",
      website: <a href="https://www.avacnm.com/">https://www.avacnm.com/</a>,
      purpose: "Veterinary services. Refill of dog's prescription (quarterly), nail trimming (quarterly), exam (semi-annual)"
    },
    {
      id: 7,
      title: "Post Office",
      address: "500 N. Hudson Street",
      address2: "Silver City, NM  88061",
      phone: "(575) 538 - 2831",
      website: <a href="https://tools.usps.com/find-location.htm?location=1381664">https://tools.usps.com/find-location.htm?location=1381664</a>,
      purpose: "Dropping off and/or collecting mail."
    }
  ];

  return (
    <Container>
    <Router>
      <div>
        <center><ButtonGroup>
          <Button variant="custom">
            <Link to="/"><h4>Home</h4></Link>
          </Button>
          <Button variant="custom">
          <Link to="/posts"><h4>Local Resources</h4></Link>
          </Button>
          <Button variant="custom">
          <Link to="/highlights"><h4>Local Highlights</h4></Link>
          </Button>
        </ButtonGroup></center>
        
        <Switch>
          <Route path="/posts">
            <Posts posts={posts} />
          </Route>
          <Route path="/highlights">
            <Highlights names={[<a href="https://www.visitsilvercity.org/explore.html">Outdoors & Recreation</a>, 
            <a href="https://www.visitsilvercity.org/eat.html">Dining</a>, 
            <a href="https://www.visitsilvercity.org/arts.html">Arts & Culture</a>]} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  </Container>
  );
}

function Home() {
  return (
    <div className="todo-app">
      <TodoList />                            
    </div>                                    //instantiates "To Do List"
  );
}

function Posts({ posts }) {
  const match = useRouteMatch();
  const findPostById = (id) =>
    posts.filter((post) => post.id == id)[0];

  return (
    <div>
      <h2><strong>Local Resources:</strong></h2>
      <h4>Local businesses likely to be used when completing the To Do List.</h4>
        {posts.map((post, index) => {
          return (
            <Alert key={index} variant="primary"> 

              <Link to={`${match.url}/${post.id}`}>
                {post.title}
              </Link>
            </Alert>
          );
        })}
      <Switch>
        <Route
          path={`${match.path}/:postId`}
          render={(props) => (
            <Post
              {...props}
              data={findPostById(props.match.params.postId)}
          />
        )}
      />
       </Switch>
    </div>
  );
}

function Post(props) {
  const { data } = props;
  return (
    <Card>
      <Card.Header><strong>{data.title}</strong></Card.Header>
      <Card.Body>
      <Card.Subtitle>{data.address}</Card.Subtitle>
      <Card.Subtitle>{data.address2}</Card.Subtitle>
      <Card.Subtitle>{data.phone}</Card.Subtitle>
      <Card.Subtitle>{data.website}</Card.Subtitle>
      <br />
      <Card.Text><b>Useful For: </b><br />{data.purpose}</Card.Text>
      </Card.Body>
    </Card>
  );
}

function Highlights(props) {
  const { names } = props;

  return (
    <div><Slider />
      <h2>Local Highlights and Areas of Interest:</h2>
      <h4>Recreation for When All Tasks Are Finished.</h4>
      <ul><h5>
        {names.map((highlight, index) => (
          <li key={index}>{highlight}</li>
        ))}
      </h5></ul>
    </div>
  );
}

