const express = require('express');
const router = express.Router();
const axios = require('axios');
const Summoner = require('../models/summoner');

const RIOT_API_KEY = process.env.RIOT_API_KEY;

router.get('/summoner/:region/:summoner/:tag', async (req, res) => {
    try {
        const { region, summoner, tag } = req.params;
        const encodedSummoner = encodeURIComponent(summoner);
        const encodedTag = encodeURIComponent(tag);
        const encodedRegion = encodeURIComponent(region);
        const existingSummoner = await Summoner.findOne({ summonerName: encodedSummoner, tag: encodedTag }).exec();

        if (existingSummoner) {
            res.render('livegame', {
                page: 'livegame',
                region: encodedRegion,
                summonerId: existingSummoner.summonerId,
                summonerName: summoner,
                tag: tag,
                summonerLevel: existingSummoner.summonerLevel,
                profileIconId: existingSummoner.profileIconId,
            });
        } else {
            // If the summoner does not exist, make the API calls
            const searchAccount = await axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodedSummoner}/${encodedTag}?api_key=${RIOT_API_KEY}`);
            if (searchAccount && searchAccount.status === 200) {
                const searchSummoner = await axios.get(`https://${encodedRegion}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${searchAccount.data.puuid}?api_key=${RIOT_API_KEY}`);
                if (searchSummoner && searchSummoner.status === 200) {
                    const newSummoner = new Summoner({
                        summonerId: searchSummoner.data.id,
                        summonerName: encodedSummoner,
                        summonerLevel: searchSummoner.data.summonerLevel,
                        profileIconId: searchSummoner.data.profileIconId,
                        tag: encodedTag,
                        region: encodedRegion,
                    });
                    await newSummoner.save();

                    res.render('livegame', {
                        page: 'livegame',
                        region: encodedRegion,
                        summonerId: searchSummoner.data.id,
                        summonerName: searchSummoner.data.name,
                        tag: encodedTag,
                        summonerLevel: searchSummoner.data.summonerLevel,
                        profileIconId: searchSummoner.data.profileIconId,
                    });
                } else {
                    throw new Error('Failed to retrieve summoner from Riot API');
                }
            } else {
                throw new Error('Failed to retrieve account from Riot API');
            }
        }
    }  catch (error) {
        if (error.response && error.response.status === 404) {
            res.render('errorPage', {
                page: 'errorPage',
                error: 'Summoner not found...'
            })
        } else {
            res.render('errorPage', {
                page: 'errorPage',
                error: 'Something went wrong, please try again.'
            })
        }
    }
});

router.get('/:summonerName/:region/:tag', async (req, res) => {
    const {summonerName, region, tag} = req.params;
    res.render('shareGame', {
        page: 'shareGame',
        summonerName: summonerName,
        region: region,
        tag: tag
    });
})

module.exports = router;