# LibQuality API
LibQuality is an application whose main goal is to measure the quality of famous open source projects.

## Running the project
Prerequisites: npm

```bash
# clone repository
git clone https://github.com/rivaelRodriguesJr/lib-quality-api.git

# enter the project directory
cd lib-quality-api

# install depencies
npm instal

# run migrations
npm run knex:migrate

# run seeds
npm run knex:seed

# run project
npm run dev
```
Go to the folder _src/config_ and overwrite de files _auth.ts_ and _gitHubAuth.ts_ with your own *TOKEN_SECRET* and *PERSONAL_ACCESS_TOKEN*.


## Data model

### Issues only (Phase 1)

![Alt text](assets/lib-p1-data.png?raw=true "Title")

### Issues Stars, Forks and Contributors (Phase 3)
![Alt text](assets/lib-p3-data.png?raw=true "Title")

