# Create a Custom Terminal Command 

## Mac Instructions

Once you get both the back-end and the front-end set up and working, you can do the following to create a terminal command `dwellingly` to re-seed the database, start the server, build the application, and launch it with all in one step by doing the follow. This is not required, but could save some time. This process can be used to set up other custom commands as well.

*Note that this has not been tested on Windows devices and the proccess will likely differ.

1. Open a terminal and navigate to your home folder with `~` or `cd ~`
2.  Vim into your rc folder, so for me the command was `vi .zshrc`  since my shell is zsh. If you have bash, I believe you'd use `vi .bashrc`.
    - If you're not sure what shell you're using, you can use the command `echo $SHELL` which will print a file path. The last part of that path is the name of your shell. Just add rc to that and a period before it and try the above command.
    - If that still doesn't work, use the command `find ~ -name "*shrc" -maxdepth 1` to search the top-level of home directory and display results ending in "shrc" (most, if not all, shells ends with "sh" and then we want the "rc" file). This should print an absolute path ending with your shells rc file. Alternatively, use `ls -a` to search through all files in your home directory, including hidden files (the rc file is a hidden file, meaning it will start with a ".").
3. The vi command in the previous step will open your rc file in Vim, a keyboard-based text editor. You'll want to navigate all the way to the bottom of the file. Since Vim is keyboard-only, you will not be able to scroll with a mouse or trackpad. Instead use the down arrow or the ENTER/RETURN button to scroll down to the end. By default, you'll start off in Vim's "edit" mode.
4. Once at the bottom, press "i" on your keyboard to enter "insert" mode, which will allow you to edit the file.
5. Create a new line with ENTER/RETURN and add the following command:

    `alias dwellingly='cd [absolute-path-to-dwellingly-backend here] && pipenv run python manage.py recreate && pipenv run flask run &; cd [absolute-path-to-dwellingly-app] && npm run build && npm start`

    Be sure to replace the square brackets with the actual absolute path to the back-end and front-end repos. For me, it looked like this in the end:

    `alias dwellingly="cd ~/CodeForPDX/dwellinglybackend && pipenv run python manage.py recreate && pipenv run flask run &; cd ~/CodeForPDX/dwellingly-app && npm start"`

6. Click "ESC" to exit "insert" mode and return to "edit" mode. Now type "ZZ" (capitals are important!) or :wq to exit vim.
7. You should be back in your shell. Here you have to source your rc file. Run the command source `~/.zshrc` or replace ".zshrc" with the name of the rc file for your shell from step 2
8. Congratulations! When you type in the command `dwellingly` it will re-seed your db, run the server in the background on port 5000, build the front-end, start the local server on port 3000, open your default browser, and navigate to localhost:3000 where you should see the Dwellingly application, all with one command!
    - When you run the command, you may be prompted with the message "Are you sure you want to lose all your data". This is because the command `pipenv run python manage.py recreate` in our alias will drop the database tables that are present in the database, but will recreate them and re-seed them. This is okay for development, but NOT something we should do once the application is launched (the production build). Type `y` and click enter to confirm and the process will continue.
    - This command will take a bit of time to run because of all the steps, particularly the build step. If you don't see an error stack or a prompt, it's probably still running the commands.
    - If you're getting an error stack, make sure there's no other processes running on ports 3000 and port 5000. You can check with the command lsof -i:3000 and lsof -i:5000 respectively. If nothing is running, nothing will be printed out, but if there is you should see a table with information about the process. If this is the case, you'll want to end the process on those ports before re-running the commands. There will be a column named "PID" with a number. Use that number with the following command `kill [PID]`, replacing "PID" with the one from the previous command and removing the square brackets.