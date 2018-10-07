## Setting Up Front End

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
2. Manage Jenkins -> Global Tool Configuration
3. Section for Git -> Point to your local git.exe
4. Add Item
5. Free Style Jobs
6. Open Job -> Configure
7. Add reference to your GIT Repo
8. Specify the branch
9. Under Build Section
   1. Execute Windows Batch Command
      1. `cd <angular_project_folder>`
      2. `npm install`
      3. `ng build --prod`
   2. Execute Windows Batch Command
      1. `cd <webapi_project_folder>`
      2. `dotnet publish -c Production -o publish`
   3. Execute Windows Batch Command
      1. `"C:\Program Files (x86)\IIS\Microsoft Web Deploy V3\msdeploy.exe" -verb:sync -source:IisApp='%WORKSPACE%\<path_to_publish_folder_specified_above>' -dest:iisapp='<site_name>',computerName='<your_PC_name>' -enableRule:AppOffline`
10. Build Now
