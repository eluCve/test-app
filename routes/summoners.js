const express = require('express');
const router = express.Router();
const axios = require('axios');

const RIOT_API_KEY = process.env.RIOT_API_KEY;

router.get('/:region/:riotName/:riotTag', async (req, res) => {
    try {
        let { region, riotName, riotTag } = req.params;
        console.log(new Date().toISOString(), region, riotName, riotTag);

        const encodedriotName = encodeURIComponent(riotName);
        const encodedTag = encodeURIComponent(riotTag);
        const encodedRegion = encodeURIComponent(region);

        const searchAccount = await axios.get(`https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodedriotName}/${encodedTag}?api_key=${RIOT_API_KEY}`);
        const puuid = searchAccount.data.puuid;

        const searchSummoner = await axios.get(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`);
        const encryptedSummonerId = searchSummoner.data.id;

        const searchRanked = await axios.get(`https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${encryptedSummonerId}?api_key=${RIOT_API_KEY}`);
        const accountInfo = searchRanked.data.find(entry => entry.queueType === 'RANKED_SOLO_5x5');

        
        const accountTier = accountInfo.tier;
        const accountRank = accountInfo.rank;
        const accountLP = accountInfo.leaguePoints;
        const accountWins = accountInfo.wins;
        const accountLosses = accountInfo.losses;
        const accountWinrate = Math.round((accountWins / (accountWins + accountLosses)) * 100);
        const summonerIcon = searchSummoner.data.profileIconId;
        const summonerLevel = searchSummoner.data.summonerLevel;

        if (!searchAccount.data.puuid && searchAccount.status !== 200) {
            res.render('summonerNotFound', {
                page: 'summonerNotFound',
            });
        }

        if (puuid) {
            res.render('summoners', {
                page: 'summoners',
                region: encodedRegion,
                riotName: encodedriotName,
                riotTag: encodedTag,
                puuid: puuid,
                accountTier: accountTier,
                accountRank: accountRank,
                accountLP: accountLP,
                accountWins: accountWins,
                accountLosses: accountLosses,
                accountWinrate: accountWinrate,
                summonerIcon: summonerIcon,
                summonerLevel: summonerLevel,
            });
        } else {
            res.render('summonerNotFound', {
                page: 'summonerNotFound',
            });
        }

    } catch (error) {
        console.log(error);
        res.render('summonerNotFound', {
            page: 'summonerNotFound',
        });
    }
});

module.exports = router;