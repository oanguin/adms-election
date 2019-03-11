
 # Oneal Anguin
 # ID: 13157402
 ``I have read and understood the sections on plagiarism in the College Policy on assessment offences and confirm that the work is my own, with the work of others clearly acknowledged. I give my permission to submit my work to the plagiarism
testing database that the College is using and test it using plagiarism detection software, search engines or meta-searching software.``

## Running Application
1. Open the file `/build/index.html`
   1. Note that the it works in Firefox and Chrome to run in I.E. set compatability mode to 11.
      1. [I.E. Compatability Mode](https://www.k-state.edu/its/helpdesk/ie10-enable-compatibility-mode.html)

## `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Prerequisite
1. You must have a hosted instance of neo4j database.
1. For the elections example you have to import into neo4j and change the default database and set it to allow upgade by changing he neo4j.conf.
1. You also need to run migration script on the election database.
   1. `./neo4j-admin restore --from='/Users/onealanguin/Documents/Birkbeck/AdvancedDatabase/assignments/four/neo4j/electiondb' --mode=database --database=election.db --force=true`

## Repository
1. [Source Code](https://github.com/oanguin/adms-election)
