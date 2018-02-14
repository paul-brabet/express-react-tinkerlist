# Tinkerlist

This is a personal project for managing Spotify playlists. It uses an Express server to handle Spotify authentication, and passes the access token that Spotify provides to the Redux state on the React front end. From there on interaction with Spotify endpoints is handled by the front end.

## Goals

At this stage, the goal is to allow a user to create a 'Superlist' - a playlist that contains every track of every playlist. The Spotify app doesn't have a feature that allows you to randomly play songs from all playlists at once.

Further planned features include:
- Displaying data about what a playlists' tracks, i.e. genre and decade. Often times with discover playlists or other people's playlists where I don't know the music, I want to know more about the 10 to 100 songs that I'm listening to. But it's not easy to know this without looking at each individual song's album or artist page.
- An extension of the above, but for most commonly played and most recently played.
- Displaying data on how popular (or unpopular) the music you've been listening to is. This is partly for the novelty of a 'how hipster are you' gag feature, and partly out of genuine interest. I will likely employ two different ways of viewing this data, one simplisitic one for the gag feature, and something more in depth for the genuine interest.

## Status

This project is still in its early stages. However the basic structure is there, allowing a user to authenticate with Spotify, and can access playlist data it would otherwise be unable to.

## Thanks

The project used a Dev Academy project written by joshuavial, don-smith, and richchurcher as an an Express/React/Webpack boilerplate.

## License

This project is licensed under the terms of the MIT license.