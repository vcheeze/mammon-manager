# Mammon Manager
Manage your mammon, instead of letting your mammon manage you.

### Table of Contents
* [Pending Features](#pending-features)
* [Project Structure](#project-structure)
* [How to run](#how-to-run)
* [Useful Resources](#useful-resources)

### Pending Features
- [ ] allow currency change
- [ ] add reimbursable features - can set reimbursement periods
and due date
- [ ] visualization views: daily, monthly, yearly trends
- [ ] allow distributed view of large transaction (a spend of 12000
can be viewed as 1000 across a year, just for viewing purposes, to 
understand how much it will be if paid in monthly average amounts)
- [ ] allow transfer of funds from one budget category to the other
when there are insufficient funds
- [ ] reconcile monthly budgets
- [ ] each dollar gets a job
- [ ] age of money - what money you're using (when they are earned)
- [ ] views of how much money you actually have, and how much you
should have (discrepancy can happen due to pending reimbursements, 
lending people money, etc.)


### Project Structure 
The project is structured simply as client and server. The client
uses Vue.js, while the server uses Node-Express to provide a REST
API. MongoDB is the database employed. In a nutshell, this project
uses the MEVN stack - **M**ongoDB, **E**xpress, **V**ue.js, and
**N**ode.js.

### How to run
For the server, `cd` into the server directory in your terminal
and run `npm run start`.

### Useful Resources
MongoDB, Node-Express stack:
* https://getstream.io/blog/building-a-node-js-powered-api-with-express-mongoose-mongodb/

DB schema visualization (use contents of [this file](server/dataVis.txt)):
* https://app.quickdatabasediagrams.com/

Color pickers:
* https://flatuicolors.com
* http://colorsupplyyy.com/app
* https://colorhunt.co
    * https://colorhunt.co/palette/152688
    * https://colorhunt.co/palette/150168
    * https://colorhunt.co/palette/151976
* http://www.colr.org
* http://palettegenerator.com
* https://colourco.de
* https://javier.xyz/cohesive-colors
* https://www.canva.com/colors/color-palettes
* https://mycolor.space

Websites for reference:
* https://yousign.com/en-uk/api  
* http://species-in-pieces.com 
* http://chordsurfer.redbull.com
* https://wearebert.com
* http://www.ashortjourney.com
* http://locus-solus.studiogusto.com/en
* https://www.spaseekers.com/sunsets-around-the-world