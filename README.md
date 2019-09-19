# squad.gruppe-adler.de

Gruppe Adler Squad-XML, which is dynamically generated with data from [`sso.gruppe-adler.de`](https://github.com/gruppe-adler/sso.gruppe-adler.de).

The `squad.xml` is hosted directly in the root with no filename needed. (So just add `https://squad.gruppe-adler.de` to your arma profile)

## Setup
A docker image is available on [Docker Hub](https://hub.docker.com/r/gruppeadler/squad).  
- The container obviously should be reachable via Port 80/443.  
- There is one volume `/usr/src/app/resources`, which can be used to configure (basically) everything.

## Configuration

The `/usr/src/app/resources` volume holds the following files/directories: 
 - `logo.paa`: paa file of the squad logo (duh!)
 - `squad.dtd`: mandatory file ([see here](https://community.bistudio.com/wiki/squad.xml#How_to_publish_it))
 - `template.xml`: Which is the squad.xml but with no members (because they are generated dynamically)
 - `web/`-directory: Contains next to the `squad.xsl` ([see here](https://community.bistudio.com/wiki/squad.xml#How_to_publish_it)) everything that is needed for the web representation of the Squad-XML

## Development
To setup a development enviornment jsut clone this repository, install all dependencies with `npm install` and then start the development server with `npm run serve`.
