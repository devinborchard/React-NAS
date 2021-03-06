# React-NAS
This Project is a web application to turn a computer into a locally hosted network attached storage that can be accessed by any computer connected to the same network.
A user can access the application through a web browser and can upload and download files to the host computer.

The app is built using React and NodeJs to run the front and back end. The base of the React Component was generated using the built in npx create react app command.
All files stored on the hosts specified storage directory will apear to users as a list on the page. Each item on the list has a check box for selecting that item.
Once an item is selected the user can download or delete the item. New files can be added by using the file selection form at the top of the application.

Before starting the application the host computer's ip address has to be entered in the React-NAS/my-app/src/components/pages/Home.js file as the value for the ip variable. By default the app runs on ports 3000 and 3001 for the front and back end servers respectively. If you want to change these ports they will have to be changed in both the Home.js file and the batch files.

The application can be started using the batch files in the batch folder. The StartNode file will open a command prompt that runs the backend NodeJs server. The StartReact file will open a prompt that runs the React front end. The Run file will run both of these files at the same time to start the app with one file.

I know I could have achieved a very similar system with less work by setting up file-sharing between computers on my network, but this solution was much more fun, and let me
learn about file uploads and downloads in a React web application.

# Improvements
At the moment there is only a single file directory that holds all of the files that get uploaded. In the future I would like to implement a way for users to create new sub
directories so that they can upload whole files of data, or keep their files more organized. Another issue is that the files are not shown in the list in real time. If the
application is open in multiple windows, and only one client changes the file contents and updates the list the other client will not see these changes until they refresh the page, or use the refresh button at the top of the application.
The last major improvement I would like to make is to add some kind of user profiles and credentials. Currently, anyone connected to the network, that knows the computer's ip,
and what port the server is running on, can access the files in storage. I plan to add user profile creation with login information so that the system is more secure.
