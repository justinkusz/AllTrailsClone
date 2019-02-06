# MyTrails

A cross-platform mobile app for recording and tracking hikes. Written entirely in JavaScript using [React Native](https://facebook.github.io/react-native/) and [Expo](https://expo.io/).

Currently supports Android only; however, iOS support is also planned.

## About

MyTrails was inspired by [AllTrails](https://www.alltrails.com/), an app available on Android, iOS, and web for finding hikes and trails, and recording and sharing your own hikes.

(If you're an AllTrails user, feel free to [follow me](https://www.alltrails.com/members/justin-kusz) there!)

This project was started primarily as an excuse for me to learn React Native, in a domain I happen to personally enjoy very much: hiking!

## Features

* Current:
	* Hike recorder, including a map, showing the current hike time, distance, and pace, and a recording of the path taken drawn on the map
	* A saved summary of each hike, including a rating, title, and description/review.
	* List of all recorded/saved hikes, each showing the saved summary and hike date, as well as its recorded stats (total distance, time, and elevation gain)
	* User profile with lifetime stats (number of hikes, total distance, total elevation gain, etc)

* Planned:
	* Taking geo-tagged images associated with the hike
	* Sharing hike recordings via the web/social media/etc
	* Following other users of the app to easily see their shared recordings/reviews/photos/etc
	* A way to search for hikes/trails in a given area
    

## Screenshots

Hike Recorder                                 | Save Recording                      | My Hikes
--------------------------------------------- | ----------------------------------- | -----------------------------------------------
![Hike Recorder](/docs/img/hike-recorder.png) | ![Save Recording](/docs/img/save-recording.png) | ![My Hikes](/docs/img/my-hikes.png)


## Development

### Requirements

* [Node.js](https://nodejs.org/en/download/) >= v10
* [Expo](https://docs.expo.io/versions/latest/introduction/installation/)

### Get Started

1. Clone the repository: `git clone https://github.com/justinkusz/MyTrails`
2. Install dependencies: `cd MyTrails && npm install`
3. Start the development server: `npm start`