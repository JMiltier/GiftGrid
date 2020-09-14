
# <img src="/src/assets/giftImage.png" alt="drawing" width="20"/>  Gift Grid

Technologies:
  - Create-react-app
  - React-bootstrap
  - React-redux
  - React-router
  - Axios

---
## Available Scripts
In the project directory, you can run:

#### `npm install`
Install all packages needed to run the application in development mode.

#### `npm start`
Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits. You will also see any lint errors in the console.

#### `nodemon server`
Runs the express server on [http://localhost:5000](http://localhost:5000), where all query routes are handled.
The page will reload if any edits are made to the server, with output for any errors.

#### [AWS EC2 instance](ec2-3-101-53-172.us-west-1.compute.amazonaws.com)
1. Once SSH'ing into the EC2 instance, cd into GridGrid `cd GiftGrid` and run `docker-compose up`.
2. To stop the service, press `Ctrl + C` and run `docker-compose down -v --rmi all` to remove all images and volumes.