const express = require('express');
const router = express.Router();
const axios = require('axios');
const Match = require('../models/matches');

const RIOT_API_KEY = process.env.RIOT_API_KEY;

router.post('/', async (req, res) => {
    try {
        let { region, puuid, start, end } = req.body;
        const encodedPuuid = encodeURIComponent(puuid);
        let encodedRegion = encodeURIComponent(region).toUpperCase();
        const encodedStart = encodeURIComponent(start);
        const encodedEnd = encodeURIComponent(end);
        let continent = "";
        if (encodedRegion === "NA1" || encodedRegion === "BR1" || encodedRegion === "LA1" || encodedRegion === "LA2") {
          continent = "AMERICAS";
        } else if (encodedRegion === "KR" || encodedRegion === "JP1") {
          continent = "ASIA";
        } else if (encodedRegion === "EUN1" || encodedRegion === "EUW1" || encodedRegion === "ME1" || encodedRegion === "TR1" || encodedRegion === "RU") {
          continent = "EUROPE";
        } else if (encodedRegion === "OCE1" || encodedRegion === "PH2" || encodedRegion === "SG2" || encodedRegion === "TH2" || encodedRegion === "TW2" || encodedRegion === "VN2") {
          continent = "ASIA";
        } else {
          return res.status(404).json({ message: 'Wrong Region' });
        }
        const matches = await axios.get(`https://${continent}.api.riotgames.com/lol/match/v5/matches/by-puuid/${encodedPuuid}/ids?type=ranked&start=${encodedStart}&count=${encodedEnd}&api_key=${RIOT_API_KEY}`);
        console.log(matches.data.length);
        if (!matches.data && matches.status !== 200) return res.status(404).json({ message: 'Matches not found' });
        if (matches.data.length === 0) return res.status(205).json({ message: 'No more matches to display' });

        const matchIds = matches.data;
        let response = [];
        for (const matchId of matchIds) {
          try {
              const matchExists = await Match.findOne({ matchId: matchId });
              if (matchExists) {
                  response.push(matchExists);
                  continue;
              }
              const match = await axios.get(`https://${continent}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${RIOT_API_KEY}`);
              const matchData = match.data;
              if (!validateMatchData(matchData)) continue;
              const matchJson = saveMatch(matchData);
              if (matchJson === null || matchJson === undefined) {
                console.log('MatchJson is null or undefined');
                continue;
              }
    
              const hasInvalidPlayer = [...Object.values(matchJson[100]), ...Object.values(matchJson[200])].some(
                player => player.riotIdGameName === null || player.riotIdGameName === undefined ||
                          player.riotTagLine === null || player.riotTagLine === undefined
              );
    
              if (hasInvalidPlayer) {
                console.log('Invalid player data found, ending request');
                return res.status(205).json({ message: 'No more matches to display' });
              }
    
              const winningTeam = matchData.info.teams.find(team => team.win === true).teamId;
              const newMatch = new Match({
                  matchId: matchId,
                  gameCreation: matchJson.gameCreation,
                  gameDuration: matchJson.gameDuration,
                  winningTeam: winningTeam,
                  blueTeam: Object.values(matchJson[100]).map(player => ({
                      puuid: player.puuid,
                      riotGameName: player.riotIdGameName,
                      riotTagLine: player.riotTagLine,
                      summonerName: player.summonerName,
                      profileIcon: player.profileIcon,
                      championName: player.championName,
                      individualPosition: player.individualPosition,
                      kda: player.kda,
                      laneDominanceScore: player.laneDominanceScore,
                      farmingEfficiencyScore: player.farmingEfficiencyScore,
                      objectiveControlScore: player.objectiveControlScore,
                      combatEffectivenessScore: player.combatEffectivenessScore,
                      teamfightContributionScore: player.teamfightContributionScore,
                      visionControlScore: player.visionControlScore,
                      totalScore: player.totalScore
                  })),
                  redTeam: Object.values(matchJson[200]).map(player => ({
                      puuid: player.puuid,
                      riotGameName: player.riotIdGameName,
                      riotTagLine: player.riotTagLine,
                      summonerName: player.summonerName,
                      profileIcon: player.profileIcon,
                      championName: player.championName,
                      individualPosition: player.individualPosition,
                      kda: player.kda,
                      laneDominanceScore: player.laneDominanceScore,
                      farmingEfficiencyScore: player.farmingEfficiencyScore,
                      objectiveControlScore: player.objectiveControlScore,
                      combatEffectivenessScore: player.combatEffectivenessScore,
                      teamfightContributionScore: player.teamfightContributionScore,
                      visionControlScore: player.visionControlScore,
                      totalScore: player.totalScore
                  }))
              });
              await newMatch.save();
              response.push(newMatch);
          };
        } catch (error) {
            if (error.response && error.response.status === 404) {
              console.log(`Match not found: ${matchId}`);
            } else {
              console.error(`Error processing match ${matchId}:`, error.message);
            }
            // Continue to the next match
            continue;
      }
      return res.status(200).json(response);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;


function saveMatch (matchData) {
  console.log('running saveMatch ', matchData.info.gameCreation);
    let participants = matchData.info.participants;

    let matchJson = {};
    matchJson[100] = {};
    matchJson[200] = {};

    // Averages
    let averageCsPerMinute =
      participants.reduce(
        (sum, participant) => sum + participant.totalMinionsKilled,
        0
      ) / 10;

      for (let participant of participants) {
      const individualPosition = participant.individualPosition;
      const teamId = participant.teamId;
      const enemyTeamId = teamId === 100 ? 200 : 100;
      
      const teamBaronKills = matchData.info.teams.find(
        (team) => team.teamId === teamId
      ).objectives.baron.kills;
      const teamDragonKills = matchData.info.teams.find(
        (team) => team.teamId === teamId
      ).objectives.dragon.kills;
      const firstDragon = matchData.info.teams.find(
        (team) => team.teamId === teamId
      ).objectives.dragon.first;
      const teamRiftHeraldKills = matchData.info.teams.find(
        (team) => team.teamId === teamId
      ).objectives.riftHerald.kills;
      const teamTurretKills = teamId === 100 ? participants[5].turretsLost : participants[0].turretsLost;


      const allyTeam = teamId === 100 ? matchData.info.participants.slice(0, 5) : matchData.info.participants.slice(5, 10);

      topTeamTakedownsFirstXMinutes = Math.max(
        ...allyTeam.map(
          (participant) => participant.challenges.takedownsFirstXMinutes
        )
      );
      topDamageTakenOnTeamPercentage = Math.max(
        ...allyTeam.map(
          (participant) => participant.challenges.damageTakenOnTeamPercentage
        )
      );
      topKillParticipation = Math.max(
        ...allyTeam.map(
          (participant) => participant.challenges.killParticipation
        )
      );
      topTeamDamagePercentage = Math.max(
        ...allyTeam.map(
          (participant) => participant.challenges.teamDamagePercentage
        )
      );

      participantKillAssist = participant.kills + (participant.assists/2);

      let teamKillAssistScore = {};
      allyTeam.forEach((player) => {
        teamKillAssistScore[player.puuid] = player.kills + (player.assists/2);
      });

      let topTeamKillAssist = Math.max(...Object.values(teamKillAssistScore));

      let topTeamDamageDealtToObjectives = Math.max(...allyTeam.map((participant) => participant.damageDealtToObjectives));

      const enemyLaner = matchData.info.participants.find(
        (participant) =>
          participant.teamId === enemyTeamId &&
          participant.individualPosition === individualPosition
      );

      if (allyTeam.length !== 5 || participant.gameEndedInEarlySurrender === true || enemyLaner === undefined || enemyLaner === null || typeof enemyLaner !== 'object') {
        console.error(
          `Could not find enemy laner for participant ${participant.puuid, participant.individualPosition}`
        );
        return null;
      }
      let participantJson = {};
      participantJson.puuid = participant.puuid;
      participantJson.riotIdGameName = participant.riotIdGameName;
      participantJson.riotTagLine = participant.riotIdTagline;
      participantJson.summonerName = participant.summonerName || " ";
      participantJson.championName = participant.championName;
      participantJson.profileIcon = participant.profileIcon;
      participantJson.individualPosition = participant.individualPosition;
      participantJson.kda = `${participant.kills}/${participant.deaths}/${participant.assists}`;

      participantJson.laneDominanceScore = laneDominanceScore(
        participant.challenges.laneMinionsFirst10Minutes,
        enemyLaner.challenges.laneMinionsFirst10Minutes,
        participant.challenges.jungleCsBefore10Minutes,
        enemyLaner.challenges.jungleCsBefore10Minutes,
        participant.challenges.earlyLaningPhaseGoldExpAdvantage,
        participant.challenges.turretPlatesTaken,
        enemyLaner.challenges.turretPlatesTaken,
        participant.challenges.takedownsFirstXMinutes,
        topTeamTakedownsFirstXMinutes,
        participant.firstBloodAssist,
        participant.firstBloodKill,
        participant.firstTowerAssist,
        participant.firstTowerKill,
        participant.challenges.killsOnOtherLanesEarlyJungleAsLaner,
        participant.challenges.initialBuffCount,
        enemyLaner.challenges.initialBuffCount,
        participant.challenges.initialCrabCount,
        enemyLaner.challenges.initialCrabCount,
        participant.individualPosition
      );

      participantJson.farmingEfficiencyScore = farmingEfficiencyScore(
        participant.totalMinionsKilled,
        averageCsPerMinute,
        participant.jungleMinionsKilled,
        enemyLaner.jungleMinionsKilled,
        participant.challenges.buffsStolen,
        enemyLaner.challenges.buffsStolen,
        participant.totalEnemyJungleMinionsKilled,
        enemyLaner.totalEnemyJungleMinionsKilled,
        participant.challenges.maxCsAdvantageOnLaneOpponent,
        enemyLaner.challenges.maxCsAdvantageOnLaneOpponent,
        participant.challenges.maxLevelLeadLaneOpponent,
        enemyLaner.challenges.maxLevelLeadLaneOpponent,
        participant.challenges.scuttleCrabKills,
        enemyLaner.challenges.scuttleCrabKills,
        participant.challenges.goldPerMinute,
        enemyLaner.challenges.goldPerMinute,
        participant.individualPosition
      );
  
      participantJson.objectiveControlScore = objectiveControlScore(
        participant.challenges.baronTakedowns,
        teamBaronKills,
        participant.challenges.dragonTakedowns,
        teamDragonKills,
        firstDragon,
        participant.challenges.perfectDragonSoulsTaken,
        participant.challenges.riftHeraldTakedowns,
        teamRiftHeraldKills,
        participant.challenges.epicMonsterSteals,
        participant.challenges.turretTakedowns,
        teamTurretKills,
        participant.damageDealtToObjectives,
        topTeamDamageDealtToObjectives,
        participant.individualPosition
      );
  
      participantJson.combatEffectivenessScore = combatEffectivenessScore(
        participantKillAssist,
        topTeamKillAssist,
        participant.bountyLevel,
        participant.challenges.killingSprees,
        participant.challenges.soloKills,
        participant.doubleKills,
        participant.tripleKills,
        participant.quadraKills,
        participant.pentaKills
      );
  
      participantJson.teamfightContributionScore = teamfightContributionScore(
        participant.challenges.damageTakenOnTeamPercentage,
        topDamageTakenOnTeamPercentage,
        participant.challenges.killParticipation,
        topKillParticipation,
        participant.challenges.teamDamagePercentage,
        topTeamDamagePercentage,
        participant.challenges.completeSupportQuestInTime,
        individualPosition
      );
  
      participantJson.visionControlScore = visionControlScore(
        participant.challenges.controlWardsPlaced,
        enemyLaner.challenges.controlWardsPlaced,
        participant.challenges.visionScorePerMinute,
        enemyLaner.challenges.visionScorePerMinute,
        participant.challenges.wardTakedownsBefore20M,
        enemyLaner.challenges.wardTakedownsBefore20M,
        participant.challenges.wardsGuarded,
        enemyLaner.challenges.wardsGuarded,
        participant.detectorWardsPlaced,
        enemyLaner.detectorWardsPlaced,
        participant.individualPosition
      );
      participantJson.totalScore = Math.round((participantJson.laneDominanceScore + participantJson.farmingEfficiencyScore + participantJson.objectiveControlScore + participantJson.combatEffectivenessScore + participantJson.teamfightContributionScore + participantJson.visionControlScore) / 6);
      // participantJson.negativeBehaviorScore = negativeBehaviorScore();
      matchJson[teamId][participant.puuid] = participantJson;
    };
  
    matchJson.gameCreation = matchData.info.gameCreation;
    matchJson.gameDuration = matchData.info.gameDuration;
    
    return matchJson;
  }

function laneDominanceScore(
laneMinionsFirst10Minutes,
enemyLaneMinionsFirst10Minutes,
jungleCsBefore10Minutes,
enemyJungleCsBefore10Minutes,
earlyLaningPhaseGoldExpAdvantage,
turretPlatesTaken,
enemyTurretPlatesTaken,
takedownsFirstXMinutes,
topTeamTakedownsFirstXMinutes,
firstBloodAssist,
firstBloodKill,
firstTowerAssist,
firstTowerKill,
killsOnOtherLanesEarlyJungleAsLaner,
initialBuffCount,
enemyInitialBuffCount,
initialCrabCount,
enemyInitialCrabCount,
individualPosition
) {
let valid_scores = [];
let valid_score_count = 0;

if (laneMinionsFirst10Minutes != null && enemyLaneMinionsFirst10Minutes != null && (laneMinionsFirst10Minutes + enemyLaneMinionsFirst10Minutes) != 0 && individualPosition !== "JUNGLE" && individualPosition !== "UTILITY") {
    let score_lane_minions_early_game = laneMinionsFirst10Minutes / (laneMinionsFirst10Minutes + enemyLaneMinionsFirst10Minutes);
    valid_scores.push(score_lane_minions_early_game);
    valid_score_count++;
}

if (jungleCsBefore10Minutes != null && enemyJungleCsBefore10Minutes != null && (jungleCsBefore10Minutes + enemyJungleCsBefore10Minutes) != 0 && individualPosition === "JUNGLE") {
    let score_jungle_cs_early_game = jungleCsBefore10Minutes / (jungleCsBefore10Minutes + enemyJungleCsBefore10Minutes);
    valid_scores.push(score_jungle_cs_early_game);
    valid_score_count++;
}
if (earlyLaningPhaseGoldExpAdvantage === 1) {
    let score_gold_exp_advantage = 1;
    valid_scores.push(score_gold_exp_advantage);
    valid_score_count++;
}

if (turretPlatesTaken != null && enemyTurretPlatesTaken != null && (turretPlatesTaken + enemyTurretPlatesTaken) != 0 && individualPosition !== "JUNGLE") {
    let score_turret_plates = turretPlatesTaken / (turretPlatesTaken + enemyTurretPlatesTaken);
    valid_scores.push(score_turret_plates);
    valid_score_count++;
}

if (takedownsFirstXMinutes != null && topTeamTakedownsFirstXMinutes != null && topTeamTakedownsFirstXMinutes != 0) {
    let score_takedowns_early_game = takedownsFirstXMinutes / topTeamTakedownsFirstXMinutes;
    if (firstBloodKill === true) {
    score_takedowns_early_game = score_takedowns_early_game * 1.3;
    }
    if (firstBloodAssist === true) {
    score_takedowns_early_game = score_takedowns_early_game * 1.2;
    }
    if (firstTowerKill === true) {
    score_takedowns_early_game = score_takedowns_early_game * 1.3;
    }
    if (firstTowerAssist === true) {
    score_takedowns_early_game = score_takedowns_early_game * 1.2;
    }
    valid_scores.push(score_takedowns_early_game);
    valid_score_count++;
}

if (killsOnOtherLanesEarlyJungleAsLaner > 0 && individualPosition !== "JUNGLE") {
    let score_kills_on_other_lanes_early_jungle_as_laner = killsOnOtherLanesEarlyJungleAsLaner;
    valid_scores.push(score_kills_on_other_lanes_early_jungle_as_laner);
    valid_score_count++;
}

if (initialBuffCount != null && enemyInitialBuffCount != null && (initialBuffCount + enemyInitialBuffCount) != 0 && individualPosition === "JUNGLE") {
    let score_initial_buffs = initialBuffCount / (initialBuffCount + enemyInitialBuffCount);
    valid_scores.push(score_initial_buffs);
    valid_score_count++;
}

if (initialCrabCount != null && enemyInitialCrabCount != null && (initialCrabCount + enemyInitialCrabCount) != 0 && individualPosition === "JUNGLE") {
    let score_initial_crabs = initialCrabCount / (initialCrabCount + enemyInitialCrabCount);
    valid_scores.push(score_initial_crabs);
    valid_score_count++;
}
let score = valid_scores.length ? valid_scores.reduce((a, b) => a + b, 0) / valid_scores.length : 0;
score = score * 2500;
score = Math.round(score);
return score;
}

function farmingEfficiencyScore(
totalMinionsKilled,
averageCsPerMinute,
jungleMinionsKilled,
enemyJungleMinionsKilled,
buffsStolen,
enemyBuffsStolen,
totalEnemyJungleMinionsKilled,
enemyTotalEnemyJungleMinionsKilled,
maxCsAdvantageOnLaneOpponent,
enemyMaxCsAdvantageOnLaneOpponent,
maxLevelLeadLaneOpponent,
enemyMaxLevelLeadLaneOpponent,
scuttleCrabKills,
enemyScuttleCrabKills,
goldPerMinute,
enemyGoldPerMinute,
individualPosition
) {
    let valid_scores = [];
    let valid_score_count = 0;
    if(totalMinionsKilled != null && averageCsPerMinute != null && averageCsPerMinute != 0 && individualPosition !== "UTILITY") {
    let score_cs_per_minute = totalMinionsKilled / averageCsPerMinute;
    valid_scores.push(score_cs_per_minute);
    valid_score_count++;
    }
    if(jungleMinionsKilled != null && enemyJungleMinionsKilled != null && enemyJungleMinionsKilled != 0 && individualPosition === "JUNGLE") {
    let score_jungle_cs_advantage = jungleMinionsKilled / enemyJungleMinionsKilled;
    valid_scores.push(score_jungle_cs_advantage);
    valid_score_count++;
    }
    if(buffsStolen != null && enemyBuffsStolen != null && (buffsStolen + enemyBuffsStolen) != 0 && individualPosition === "JUNGLE") {
    let score_buffs_stolen = buffsStolen / (buffsStolen + enemyBuffsStolen);
    valid_scores.push(score_buffs_stolen);
    valid_score_count++;
    }
    if(totalEnemyJungleMinionsKilled != null && enemyTotalEnemyJungleMinionsKilled != null && (totalEnemyJungleMinionsKilled + enemyTotalEnemyJungleMinionsKilled) != 0 && individualPosition === "JUNGLE") {
    let score_enemy_jungle_cs = totalEnemyJungleMinionsKilled / (totalEnemyJungleMinionsKilled + enemyTotalEnemyJungleMinionsKilled);
    valid_scores.push(score_enemy_jungle_cs);
    valid_score_count++;
    }
    if(maxCsAdvantageOnLaneOpponent != null && enemyMaxCsAdvantageOnLaneOpponent != null && (maxCsAdvantageOnLaneOpponent + enemyMaxCsAdvantageOnLaneOpponent) != 0 && individualPosition !== "JUNGLE" && individualPosition !== "UTILITY") {
    let score_cs_advantage = maxCsAdvantageOnLaneOpponent / (maxCsAdvantageOnLaneOpponent + enemyMaxCsAdvantageOnLaneOpponent);
    valid_scores.push(score_cs_advantage);
    valid_score_count++;
    }
    if(maxLevelLeadLaneOpponent != null && enemyMaxLevelLeadLaneOpponent != null && (maxLevelLeadLaneOpponent + enemyMaxLevelLeadLaneOpponent) != 0) {
    let score_level_lead = maxLevelLeadLaneOpponent / (maxLevelLeadLaneOpponent + enemyMaxLevelLeadLaneOpponent);
    valid_scores.push(score_level_lead);
    valid_score_count++;
    }
    if(scuttleCrabKills != null && enemyScuttleCrabKills != null && (scuttleCrabKills + enemyScuttleCrabKills) != 0 && individualPosition === "JUNGLE") {
    let score_scuttle_crabs = scuttleCrabKills / (scuttleCrabKills + enemyScuttleCrabKills);
    valid_scores.push(score_scuttle_crabs);
    valid_score_count++;
    }
    if(goldPerMinute != null && enemyGoldPerMinute != null && (goldPerMinute + enemyGoldPerMinute) != 0) {
    let score_gold_per_minute = goldPerMinute / (goldPerMinute + enemyGoldPerMinute);
    valid_scores.push(score_gold_per_minute);
    valid_score_count++;
    }
    let score = valid_scores.length ? valid_scores.reduce((a, b) => a + b, 0) / valid_scores.length : 0;
    score = score * 2500;
    score = Math.round(score);
    return score;
}

function objectiveControlScore(
baronTakedowns,
teamBaronKills,
dragonTakedowns,
teamDragonKills,
firstDragon,
perfectDragonSoulsTaken,
riftHeraldTakedowns,
teamRiftHeraldKills,
epicMonsterSteals,
turretTakedowns,
teamTurretKills,
damageDealtToObjectives,
topTeamDamageDealtToObjectives,
individualPosition
) {
    let epic_monster_scores = [];
    let epic_monster_score_count = 0;
    let valid_scores = [];
    let valid_score_count = 0;
    if(baronTakedowns != null && teamBaronKills != null && teamBaronKills != 0) {
        let score_baron_control = baronTakedowns / teamBaronKills;
        epic_monster_scores.push(score_baron_control);
        epic_monster_score_count++;
        }
    if(dragonTakedowns != null && teamDragonKills != null && teamDragonKills != 0) {
        let score_dragon_control = dragonTakedowns / teamDragonKills;
        if(firstDragon === true && individualPosition === "JUNGLE") {
            score_dragon_control = score_dragon_control * 1.2;
            }
        if(perfectDragonSoulsTaken === true && individualPosition === "JUNGLE") {
            score_dragon_control = score_dragon_control * 1.4;
            }
        epic_monster_scores.push(score_dragon_control);
        epic_monster_score_count++;
        }
    if(riftHeraldTakedowns != null && teamRiftHeraldKills != null && teamRiftHeraldKills != 0) {
        let score_rift_herald_control = riftHeraldTakedowns / teamRiftHeraldKills;
        epic_monster_scores.push(score_rift_herald_control);
        epic_monster_score_count++;
        }
    let final_epic_monster_participation = epic_monster_scores.length ? epic_monster_scores.reduce((a, b) => a + b, 0) / epic_monster_scores.length : 0;
    if (epicMonsterSteals > 0) {
        final_epic_monster_participation = final_epic_monster_participation * 1.5;
    }
        valid_scores.push(final_epic_monster_participation);
        valid_score_count++;
    if(turretTakedowns != null && teamTurretKills != null && teamTurretKills != 0) {
        let score_turret_control = turretTakedowns / teamTurretKills;
        valid_scores.push(score_turret_control);
        valid_score_count++;
        }
    if(topTeamDamageDealtToObjectives != null && topTeamDamageDealtToObjectives != 0) {
        let score_damage_dealt_to_objectives = damageDealtToObjectives / topTeamDamageDealtToObjectives;
        valid_scores.push(score_damage_dealt_to_objectives);
        valid_score_count++;
    }
    let score = valid_scores.length ? valid_scores.reduce((a, b) => a + b, 0) / valid_scores.length : 0;
    score = score * 2500;
    score = Math.round(score);
    return score;
}

function combatEffectivenessScore(
killAssist,
allyTeamAverageKillAssist,
bountyLevel,
killingSprees,
soloKills,
doubleKills,
tripleKills,
quadraKills,
pentaKills,
) {
    let score_killAssist = 0;
    if(killAssist != null && killAssist != 0) {
        score_killAssist = killAssist / allyTeamAverageKillAssist;
        }

    if(bountyLevel != null && bountyLevel != 0) {
      score_killAssist = score_killAssist + 0.01 * bountyLevel;
        }
    if(killingSprees != null) {
      score_killAssist = score_killAssist + 0.01  * killingSprees;
        }
    if(soloKills != null) {
      score_killAssist = score_killAssist + 0.01 * soloKills;
        }
    if(doubleKills != null) {
      score_killAssist = score_killAssist + 0.01 * doubleKills;
        }
    if(tripleKills != null) {
      score_killAssist = score_killAssist + 0.03 * tripleKills;
    }
    if(quadraKills != null) {
      score_killAssist = score_killAssist + 0.08 * quadraKills;
    }
    if(pentaKills != null) {
      score_killAssist = score_killAssist + 0.1 * pentaKills;
    }
    let score = score_killAssist;
    score = score * 2500;
    score = Math.round(score);
    return score;
}

function teamfightContributionScore(
damageTakenOnTeamPercentage,
topDamageTakenOnTeamPercentage,
killParticipation,
topKillParticipation,
teamDamagePercentage,
topTeamDamagePercentage,
completeSupportQuestInTime,
individualPosition
) {
    let overall_teamfight_contribution_score = 0;
    let count = 0;
    if(damageTakenOnTeamPercentage != null) {
        let damageTakenOnTeamPercentage_score = damageTakenOnTeamPercentage / topDamageTakenOnTeamPercentage;
        overall_teamfight_contribution_score =overall_teamfight_contribution_score + damageTakenOnTeamPercentage_score;
        count++
        }
    if(killParticipation != null) {
        let killParticipation_score = killParticipation / topKillParticipation;
        overall_teamfight_contribution_score = overall_teamfight_contribution_score + killParticipation_score;
        count++
        }
    if(teamDamagePercentage != null) {
        let teamDamagePercentage_score = teamDamagePercentage / topTeamDamagePercentage;
        overall_teamfight_contribution_score = overall_teamfight_contribution_score + teamDamagePercentage_score;
        count++
        }
    if(completeSupportQuestInTime === 1 && individualPosition === "UTILITY") {
        overall_teamfight_contribution_score = overall_teamfight_contribution_score + 1;
        count++
    }
    let score = overall_teamfight_contribution_score / count;
    score = score * 2500;
    score = Math.round(score);
    return score;
}

function visionControlScore(
controlWardsPlaced,
enemyControlWardsPlaced,
visionScorePerMinute,
enemyVisionScorePerMinute,
wardTakedownsBefore20M,
enemyWardTakedownsBefore20M,
wardsGuarded,
enemyWardsGuarded,
detectorWardsPlaced,
enemyDetectorWardsPlaced,
individualPosition
) {
    let valid_scores = [];
    let valid_score_count = 0;
    if(controlWardsPlaced != null && enemyControlWardsPlaced != null && (controlWardsPlaced + enemyControlWardsPlaced) != 0) {
        let score_control_wards = controlWardsPlaced / (controlWardsPlaced + enemyControlWardsPlaced);
        valid_scores.push(score_control_wards);
        valid_score_count++;
        }
    if(visionScorePerMinute != null && enemyVisionScorePerMinute != null && (visionScorePerMinute + enemyVisionScorePerMinute) != 0) {
        let score_vision_score_per_minute = visionScorePerMinute / (visionScorePerMinute + enemyVisionScorePerMinute);
        valid_scores.push(score_vision_score_per_minute);
        valid_score_count++;
        }
    if(wardTakedownsBefore20M != null && enemyWardTakedownsBefore20M != null && (wardTakedownsBefore20M + enemyWardTakedownsBefore20M) != 0 && individualPosition === "UTILITY") {
        let score_ward_takedowns = wardTakedownsBefore20M / (wardTakedownsBefore20M + enemyWardTakedownsBefore20M);
        valid_scores.push(score_ward_takedowns);
        valid_score_count++;
        }
    if(wardsGuarded != null && enemyWardsGuarded != null && (wardsGuarded + enemyWardsGuarded) != 0 && individualPosition === "UTILITY") {
        let score_wards_guarded = wardsGuarded / (wardsGuarded + enemyWardsGuarded);
        valid_scores.push(score_wards_guarded);
        valid_score_count++;
        }
    if(detectorWardsPlaced != null && enemyDetectorWardsPlaced != null && (detectorWardsPlaced + enemyDetectorWardsPlaced) != 0) {
        let score_detector_wards = detectorWardsPlaced / (detectorWardsPlaced + enemyDetectorWardsPlaced);
        valid_scores.push(score_detector_wards);
        valid_score_count++;
        }
    let score = valid_scores.length ? valid_scores.reduce((a, b) => a + b, 0) / valid_scores.length : 0;
    score = score * 2500;
    score = Math.round(score);
    return score;
}

// function negativeBehaviorScore() {}


function validateMatchData(matchData) {
  if (!matchData || typeof matchData !== 'object') {
    console.error('Invalid matchData: must be a non-null object');
    return false;
  }

  if (!matchData.info || typeof matchData.info !== 'object') {
    console.error('Invalid matchData: missing or invalid info object');
    return false;
  }

  const { info } = matchData;
  // Check participants
  if (!Array.isArray(info.participants) || info.participants.length !== 10) {
    console.error('Invalid matchData: participants must be an array of 10 players');
    return false;
  }

  // Check teams
  if (!Array.isArray(info.teams) || info.teams.length !== 2) {
    console.error('Invalid matchData: teams must be an array of 2 teams');
    return false;
  }

  // Check team objectives
  for (const team of info.teams) {
    const objectives = ['baron', 'dragon', 'riftHerald'];
    for (const obj of objectives) {
      if (!team.objectives[obj] || typeof team.objectives[obj].kills !== 'number') {
        console.error(`Invalid matchData: missing or invalid ${obj} kills for team ${team.teamId}`);
        return false;
      }
    }
    if (typeof team.objectives.dragon.first !== 'boolean') {
      console.error(`Invalid matchData: missing or invalid first dragon for team ${team.teamId}`);
      return false;
    }
  }
  const participants = matchData.info.participants;
  participants.forEach((participant) => {
    if (!participant.challenges || typeof participant.challenges !== 'object') {
      console.error('Invalid matchData: missing or invalid challenges object');
      return false;
    }
  });

  // If we've made it this far, all checks have passed
  return true;
}
