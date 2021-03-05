# SWC Poker Standings

This react app is intended to be used for Twitch streams and will show a leaderboard of any ChefCatRadio tournaments being played on swcpoker.club.

<img src="https://raw.githubusercontent.com/dchrostowski/swc_tournament_rankings/master/widget_demo.png"/>

## How to use/run locally

I plan to eventually publish this app on my personal website, but until then here's how to make this work:

1. [Install yarn](https://classic.yarnpkg.com/en/docs/install)
2. `git clone https://github.com/dchrostowski/swc_tournament_rankings`
3. `cd swc_tournament_rankings`
4. `yarn install`
5. `yarn start`
6. Open OBS Studio, configure a new browser plugin source, set the URL to localhost:3000
7. Adjust as you see fit.

## Important note
If there are more than one running or completed ChefCat tournaments listed on swcpoker.club at any given time, you will need to tweak the regular expression on line 70 of `src/components/standings.js`:

```let re = new RegExp(/chefcat/,'i')```

For example, if you wanted to capture the Sunday Social tournament but not the Sunday Funday tournament, you should change the regular expression like so:

```let re = new RegExp(/sunday\ssocial/,'i')```



<img src="https://raw.githubusercontent.com/dchrostowski/swc_tournament_rankings/master/example_obs.png"/>


