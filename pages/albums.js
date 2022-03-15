import { gql } from "@apollo/client";
import querystring from "querystring";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { Button, Card } from "react-bootstrap";
import { useState } from "react";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const ALBUMS_ENDPOINT = `http://localhost:4000/graphql`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export default function Albums(data) {
  const [state, setState] = useState(false);
  const [album, setAlbum] = useState();

  const albums = data?.queryArtists;
  const showList = (value) => {
    setState(true);
    setAlbum(value.albums);
  };

  return (
    <div style={{ background: "skyblue" }}>
      <h1 className="text-center my-5">Playlist</h1>
      <div className="row">
        {albums &&
          albums.map((value, index) => {
            return (
              <div className="col py-2" key={index}>
                <Card
                  style={{ width: "18rem", background: "dark" }}
                  className="col-md-2 px-2 py-2"
                >
                  <Card.Img variant="top" src={value?.image} />
                  <Card.Body>
                    <Card.Title>{value?.name}</Card.Title>
                    <Button
                      onClick={() => {
                        showList(value);
                      }}
                      variant="primary"
                    >
                      play
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </div>
      <h1 className="my-5 text-center">your album playlist</h1>
      <div className="row">
        {album &&
          album.map((value, index) => {
            return (
              <div className="col py-2">
                <Card
                  style={{ width: "18rem", background: "dark" }}
                  className="col-md-2 px-2 py-2"
                >
                  <Card.Img variant="top" src={value?.image} />
                  <Card.Body>
                    <Card.Title>{value?.name}</Card.Title>
                    <Button
                      onClick={() => {
                        showList(value);
                      }}
                      variant="primary"
                    >
                      play
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
      </div>
    </div>
  );
}

Albums.getInitialProps = async (ctx) => {
  const getAccessToken = async () => {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token,
      }),
    });
    return response.json();
  };

  let { access_token } = await getAccessToken();

  const client = new ApolloClient({
    uri: `${ALBUMS_ENDPOINT}`,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    fetch,
  });

  const { data } = await client.query({
    query: gql`
      query {
        queryArtists {
          name
          image
          albums {
            name
            id
            image
            tracks {
              name
              artists {
                name
              }
            }
          }
        }
      }
    `,
  });
  
  return data;
};
