
# Swift

Swift is an app designed for nurses to easily trade shifts in real-time. The app offers automated approvals and a user-friendly interface, streamlining the process and saving time. Swift benefits both nurses and managers by improving productivity and allowing more focus on critical tasks.


## Author

- Aunjrya Fleming [@ParisianMist](https://www.github.com/ParisianMist)

## Screenshots
Nurse, Molly Weasley, can log in using their compnay email and password:
![login demo](./src/assets/images/demo/swift-demo-login.png)
Nurse Molly will then be brought to their personal calendar view:
![login demo](./src/assets/images/demo/swift-demo-user-view.png)
Nurse Molly can then post a shift:
![login demo](./src/assets/images/demo/swift-demo-post-shift.png)
A modal will let Nurse Molly know the shift has been posted and '*' will appear beside the shift to indicate that it is actively up for grabs. Should Molly choose to take the shift back they can easily click on the shift to unpost it:
![login demo](./src/assets/images/demo/swift-demo-unpost-shift.png)
Nurse, Luna Lovegood, can log into their account, view and accept any available shift:
![login demo](./src/assets/images/demo/swift-demo-accept-shift.png)
Nurse Molly will no longer see the shift in their schedule and can consult the notification center for confirmation: 
![login demo](./src/assets/images/demo/swift-demo-notification.png)

All successful switches are logged and the schedule changed immediately. Management and charge Nurses have access to infallible schedules and the log of switches should they want to review. 


## Installation

To install Swift, first clone the front and back-end repository by running the following command:

```bash
  $git clone git@github.com:ParisianMist/swift.git
  $git clone git@github.com:ParisianMist/swift-api.git
```
Then navigate to the project directories and run the following command:
```bash
  $npm install
```
This will install all the necessary dependencies listed in the package.json file.
## Usage

To use Swift, first create a .env file based on the .env.sample file provided. You will need to fill in the necessary environment variables.

Once your environment is set up, you can start the app by running:

```
$npm start
or
$npm run dev
```
This will start the app in development mode.
## Tech Stack

Swift was built using the following technologies:

- SQL
- Axios
- Express
- Moment.js
- Node
- React
- React-Big-Calendar