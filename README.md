# React-NAS
This Project is a web application to turn a computer into a locally hosted and network attached storage that can be accessed by any computer connected to the same network.
A user can access the application through a web browser and can upload and download files to the host computer.

The app is build using React and NodeJs to run the from and back end. The base of the React Component was generated using the built in npx create react app command.
All files stored on the hosts specified storage directory will apear to users as a list on the page. Each item on the list has a check box for selecting that item.
Once an item is selected the user can download or delete the item. New files can be added by using the file selection form at the top of the application.

I know I could have achieved a very similar system with less work by setting up filesharing between computers on my network, but this solution was much more fun, and let me
learn about file uploads, and downloads, in a React web application.

# Improvements
At the moment there is only a single file directory that holds all of the files that get uploaded. In the future I would like to implement a way for users to create new sub
directories so that they can upload while files of data, or keep their files more organized. Another issue is that the files are not shown in the list in real time. If the
application is open in multiple windows, and onlt one client changes the file contents and updates the list the other client will not see these changes until they refresh the page.
The last major improvement I would like to make is to add some kind of user profiles and credentials. Currently, anyone connected to the network, and knows the computers ip,
and what port the server is running on, can access the files in storage. I plan to add user profile creation with logic information so that the system is more secure.
