## StudyPortal Front-End

#### Pre-Requisites:

1. Node.js + npm
2. Apache2

#### Setup Instructions:

1. Clone the repository in the local system
2. Run these commands in the terminal
    ```
    cd studyportal-axion
    npm install
    ```
3. Run 
    ```
    sudo cp config/studyportal.sdslabs.local.conf /etc/apache2/sites-available && sudo cp config/nexus.sdslabs.local.conf /etc/apache2/sites-available
    ```
4. Enable the site using ```sudo a2ensite studyportal.sdslabs.local && sudo a2ensite nexus.sdslabs.local```

5. Add the both the domains to  ```/etc/hosts```

6. Restart apache2 server using ```sudo service apache2 restart```

#### Starting the application:

1. Run ```cd studyportal-axion && npm start```
    