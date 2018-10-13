## Setting Up Project and Infrastructure

### Setting Up Front End

1. Download & Install Node.js
   1. Update NPM -> `npm i -g npm`
1. Download Angular CLI -> `npm install -g @angular/cli`
1. Setup Angular Project -> `ng new <project_name>`
1. Building the project -> `ng build`
   1. For Prod -> `ng build --prod`
1. Running the project -> `npm start`
1. After setting up WebApi
   1. Open _angular.json_
   1. Change _outputPath_ to `<your_web_api_wwwroot_folder>`

### Setting Up Dot Net Core Web API

1. Download & Install .Net Core
   1. Download .Net Core SDK
2. Download & Install .Net Core Runtime
3. Setup .Net Core Web API
   1. Install C# Plugin in VSCode
   2. CD into `<webapi_folder>`
   3. `dotnet new webapi`
4. Building the API -> `dotnet build`
5. Running the API -> `dotnet run`

### Debugging Front End in VSCode

1. Install Debugger for Chrome Extension
2. Goto Debug Menu
3. Hit Add Configuration
4. Select Chrome: Launch
5. Change the Url -> `<your_localhost_url>`
6. Change the webRoot
   1. If mutiple folders in same workspace then point to Angular Project Folder
   2. For example
   3. I have ClientSide and WebApi in the same workspace, I point webRoot to -> `"${workspaceFolder}/ClientSide"`
7. Open Termninal -> CD to Angular Project -> `npm start`
8. Add breakpoints, Launch from Debug Menu & _et voila!_

### Debugging WebApi in VSCode

1. Goto Debug Menu
2. Hit Add Configuration
3. Select .Net Core: Launch
4. Change the program -> `<path_to_dll>`
5. Change the cwd (if multiple folders in same workspace) -> `"${workspaceFolder}/WebApi"`
6. Add breakpoints, Launch from Debug Menu & _et voila!_
7. Hit Add Configuration
8. Select .NetCore: Attach
9. Save Launch.json

### Debugging Front End & WebApi both at the same time

1. Open Termninal -> CD to Angular Project -> `npm start`
2. Open Launch.json
   1. In Chrome Launch Configuration -> change url -> `<your_web_api_localhost_url>`
3. Launch from Debug Menu
4. Click 3 dots in Debug Menu, select _Start additional session_
5. Select .NetCore: Attach
6. Select the dotnet process pointing to `<your_webapi_dll>`
7. Add Breakpoints & _et voila!_

### Setting up Infrastructure (Local)

#### IIS

1. Goto Control Panel -> Uninstall a program
2. Click Turn Windows Features On or Off
3. Open IIS
4. Turn features on for IIS
5. Add new Website or an app under Default Website
6. Change new AppPool or DefaultAppPool Basic Settings -> .Net CLR Version ---> No Managed Code
7. Download & Install WebDeploy

#### Jenkins

1. Download & Install Jenkins
2. Manage Jenkins -> Install Cloud Foundry Plugin
3. Manage Jenkins -> Global Tool Configuration
   1. Section for Git -> Point to _on premise_ git.exe
4. Add Item
5. Free Style Jobs
6. Open Job -> Configure
7. Add reference to your GIT Repo
8. Specify the branch
9. Under Build Section
   1. Execute Windows Batch Command
      1. `cd <angular_project_folder>`
      2. `npm install`
   2. Execute Windows Batch Command
      1. cd <angular_project_folder>
      2. `npm run build -- --prod --vendor-chunk`
   3. Execute Windows Batch Command
      1. `cd <webapi_project_folder>`
      2. `dotnet publish -c Production -o publish`
10. Under Post Build Actions
    1. Deploy to local IIS
       1. Execute Windows Batch Command
       2. `"C:\Program Files (x86)\IIS\Microsoft Web Deploy V3\msdeploy.exe" -verb:sync -source:IisApp='%WORKSPACE%\<path_to_publish_folder_specified_above>' -dest:iisapp='<site_name>',computerName='<your_PC_name>' -enableRule:AppOffline`
    2. Deploy to PCF
       1. Add a post build action -> Push to Cloud Foundry -> Fill the details
       2. If you do not have a manifest.yml file -> select Enter configuration in Jenkins -> Fill Details
       3. Apply & Save
11. Build Now

#### Continous Integration & Continous Deployment

##### Trigger jobs in Jenkins on Push & Pull events in your GitHub Repo

1. Setting up GitHub

   1. Create Secret Token
      1. Goto Account Settings -> Developer Settings
      2. Goto Personal Access Token -> Create Token
      3. Give All Access except Delete Repo -> Create
      4. Copy the Secret Text (as it won't be available later)
   2. Create WebHook
      1. Goto Repo Settings -> Webhooks
      2. Create a webhook
      3. Enter your jenkins hook URL -> `<http(s)://your_jenkins_url/github-webhook/>`
      4. Enter Secret Text in the text field
      5. Choose from Individual Events -> Push Events & Pull Request Events
      6. Save

2. Setting up Jenkins

   1. Configure GitHub in Jenkins
      1. Goto Manage Jenkins -> Configure System
      2. Goto GitHub Server -> Add Server
      3. Add Credentials -> Choose Secret Text
      4. Copy the secret text copied from GitHub
      5. If Manage Hooks -> Enabled (Jenkins will create hook URL for you which is mentioned above).
      6. If Manage Hooks -> Disabled -> Enable Override default hook URL -> Enter `<your_webhook_url>` configured in GitHub Webhook
      7. Save
   2. Open Freestyle Job -> Configure
      1. Enable `GitHub hook trigger for GITScm polling` (Under Build Triggers)
      2. Well, that's it! You are all setup for CI/CD.

3. Setting up your local Jenkins

   1. This step is for localhost Jenkins, if you do not have an online Jenkins server
   2. Download ngrok for Windows
   3. Launch ngrok.exe -> ngrok http `<your_jenkins_port>`
   4. Copy the genrated URL to your GitHub Webhook -> URL -> Hit Update
   5. Now GitHub would be able to find your lcoal Jenkins on Internet and Jenkins would receive GitHub events.
