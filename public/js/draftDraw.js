const topFilter = ["Aatrox", "Akali", "Camille", "Chogath", "Darius", "DrMundo", "Fiora", "Gangplank", "Garen", "Gnar", "Gragas", "Gwen", "Heimerdinger", "Illaoi", "Irelia", "Jax", "Jayce", "Kayle", "Kennen", "Kled", "KSante", "Malphite", "Mordekaiser", "Nasus", "Ornn", "Olaf", "Pantheon", "Quinn", "Renekton", "Riven", "Rumble","Sett", "Shen", "Singed", "Sion", "Skarner", "TahmKench", "Teemo", "Trundle",  "Tryndamere", "Urgot", "Vayne", "Volibear", "Yasuo", "Yone", "Yorick", "Zac"]
const jungleFilter = ["Amumu", "Belveth", "Brand", "Briar", "Diana", "Ekko", "Elise", "Evelynn", "Fiddlesticks", "Gragas", "Graves", "Hecarim", "Ivern", "JarvanIV", "Jax", "Karthus", "Kayn", "KhaZix", "Kindred", "Lee Sin", "Lillia", "MasterYi", "Nidalee", "Nocturne", "Nunu", "Poppy", "Rammus", "RekSai", "Rengar", "Sejuani", "Shaco", "Shyvana", "Skarner", "Sylas", "Taliyah", "Udyr", "Vi", "Viego", "Volibear", "Warwick", "MonkeyKing", "Xin Zhao", "Zac"]
const midFilter = ["Ahri", "Akali", "Akshan", "Anivia", "Annie", "Aurelion Sol", "Azir", "Cassiopeia", "Corki", "Diana", "Ekko", "Fizz", "Galio", "Hwei", "Irelia", "Jayce", "Kassadin", "Katarina", "Leblanc", "Lissandra", "Lux", "Malphite", "Malzahar", "Naafiri", "Orianna", "Qiyana", "Ryze", "Sylas", "Syndra", "Taliyah", "Talon", "Tristana","TwistedFate", "Veigar", "Vex", "Viktor", "Vladimir", "Xerath", "Yasuo", "Yone", "Zed", "Zoe"]
const adcFilter = ["Aphelios", "Ashe", "Caitlyn", "Draven", "Ezreal", "Jhin", "Jinx", "Kaisa", "Kalista", "KogMaw", "Lucian", "MissFortune", "Nilah", "Samira", "Sivir", "Smolder", "Tristana", "Twitch", "Varus", "Vayne", "Xayah", "Yasuo", "Zeri", "Ziggs"]
const supportFilter = ["Alistar", "Ashe", "Bard", "Blitzcrank", "Brand", "Braum","Camille", "Hwei", "Janna", "Karma", "Leona", "Lulu", "Lux", "Maokai", "Milio", "Morgana", "Nami", "Nautilus", "Neeko", "Pantheon", "Pyke", "Rakan", "Rell", "Renata","Senna", "Seraphine", "Shaco", "Sona", "Soraka", "Swain", "Taric", "Thresh", "Velkoz", "Xerath","Yuumi", "Zilean", "Zyra"]

const championPositions = {
    "Aatrox": {
      "champion": "Aatrox",
      "positions": {
        "top": "95.49%",
        "mid": "2.88%",
        "jungle": "0.69%",
        "support": "0.66%",
        "adc": "0.28%"
      }
    },
    "Ahri": {
      "champion": "Ahri",
      "positions": {
        "mid": "96.85%",
        "support": "1.56%",
        "top": "1.09%",
        "adc": "0.47%",
        "jungle": "0.03%"
      }
    },
    "Akali": {
      "champion": "Akali",
      "positions": {
        "mid": "73.12%",
        "top": "26.14%",
        "support": "0.53%",
        "adc": "0.17%",
        "jungle": "0.05%"
      }
    },
    "Akshan": {
      "champion": "Akshan",
      "positions": {
        "mid": "78.39%",
        "top": "15.83%",
        "adc": "4.37%",
        "support": "0.92%",
        "jungle": "0.49%"
      }
    },
    "Alistar": {
      "champion": "Alistar",
      "positions": {
        "support": "96.87%",
        "top": "1.77%",
        "mid": "0.90%",
        "jungle": "0.30%",
        "adc": "0.16%"
      }
    },
    "Amumu": {
      "champion": "Amumu",
      "positions": {
        "jungle": "83.70%",
        "support": "13.29%",
        "top": "2.59%",
        "mid": "0.32%",
        "adc": "0.10%"
      }
    },
    "Anivia": {
      "champion": "Anivia",
      "positions": {
        "mid": "82.46%",
        "support": "10.90%",
        "top": "4.29%",
        "adc": "2.25%",
        "jungle": "0.10%"
      }
    },
    "Annie": {
      "champion": "Annie",
      "positions": {
        "mid": "80.26%",
        "support": "15.89%",
        "top": "2.29%",
        "adc": "1.43%",
        "jungle": "0.12%"
      }
    },
    "Aphelios": {
      "champion": "Aphelios",
      "positions": {
        "adc": "98.68%",
        "mid": "0.68%",
        "top": "0.52%",
        "jungle": "0.06%",
        "support": "0.06%"
      }
    },
    "Ashe": {
      "champion": "Ashe",
      "positions": {
        "adc": "76.77%",
        "support": "21.32%",
        "top": "1.20%",
        "mid": "0.65%",
        "jungle": "0.06%"
      }
    },
    "AurelionSol": {
      "champion": "AurelionSol",
      "positions": {
        "mid": "92.43%",
        "top": "3.22%",
        "adc": "3.05%",
        "support": "0.97%",
        "jungle": "0.32%"
      }
    },
    "Azir": {
      "champion": "Azir",
      "positions": {
        "mid": "93.49%",
        "top": "4.67%",
        "adc": "0.91%",
        "support": "0.86%",
        "jungle": "0.07%"
      }
    },
    "Bard": {
      "champion": "Bard",
      "positions": {
        "support": "97.69%",
        "top": "0.79%",
        "mid": "0.73%",
        "adc": "0.48%",
        "jungle": "0.31%"
      }
    },
    "Belveth": {
      "champion": "Belveth",
      "positions": {
        "jungle": "96.34%",
        "top": "1.89%",
        "support": "0.82%",
        "mid": "0.77%",
        "adc": "0.18%"
      }
    },
    "Blitzcrank": {
      "champion": "Blitzcrank",
      "positions": {
        "support": "99.17%",
        "mid": "0.31%",
        "jungle": "0.27%",
        "top": "0.17%",
        "adc": "0.08%"
      }
    },
    "Brand": {
      "champion": "Brand",
      "positions": {
        "support": "40.61%",
        "jungle": "28.92%",
        "mid": "24.25%",
        "adc": "4.48%",
        "top": "1.74%"
      }
    },
    "Braum": {
      "champion": "Braum",
      "positions": {
        "support": "99.31%",
        "top": "0.39%",
        "jungle": "0.13%",
        "mid": "0.10%",
        "adc": "0.07%"
      }
    },
    "Briar": {
      "champion": "Briar",
      "positions": {
        "jungle": "90.54%",
        "top": "5.74%",
        "mid": "2.71%",
        "support": "0.71%",
        "adc": "0.30%"
      }
    },
    "Caitlyn": {
      "champion": "Caitlyn",
      "positions": {
        "adc": "96.84%",
        "mid": "1.62%",
        "top": "0.78%",
        "support": "0.73%",
        "jungle": "0.03%"
      }
    },
    "Camille": {
      "champion": "Camille",
      "positions": {
        "top": "71.06%",
        "support": "25.96%",
        "mid": "1.70%",
        "jungle": "0.90%",
        "adc": "0.39%"
      }
    },
    "Cassiopeia": {
      "champion": "Cassiopeia",
      "positions": {
        "mid": "68.50%",
        "top": "22.66%",
        "adc": "7.94%",
        "support": "0.80%",
        "jungle": "0.09%"
      }
    },
    "Chogath": {
      "champion": "Chogath",
      "positions": {
        "top": "69.45%",
        "mid": "15.74%",
        "support": "6.23%",
        "jungle": "4.55%",
        "adc": "4.02%"
      }
    },
    "Corki": {
      "champion": "Corki",
      "positions": {
        "mid": "93.50%",
        "adc": "3.41%",
        "top": "2.27%",
        "support": "0.47%",
        "jungle": "0.34%"
      }
    },
    "Darius": {
      "champion": "Darius",
      "positions": {
        "top": "93.77%",
        "jungle": "3.44%",
        "mid": "1.33%",
        "support": "0.80%",
        "adc": "0.66%"
      }
    },
    "Diana": {
      "champion": "Diana",
      "positions": {
        "jungle": "63.94%",
        "mid": "34.57%",
        "top": "0.97%",
        "support": "0.41%",
        "adc": "0.11%"
      }
    },
    "Draven": {
      "champion": "Draven",
      "positions": {
        "adc": "96.94%",
        "top": "1.53%",
        "mid": "1.32%",
        "jungle": "0.12%",
        "support": "0.08%"
      }
    },
    "DrMundo": {
      "champion": "DrMundo",
      "positions": {
        "top": "92.87%",
        "jungle": "3.99%",
        "mid": "1.77%",
        "support": "0.90%",
        "adc": "0.48%"
      }
    },
    "Ekko": {
      "champion": "Ekko",
      "positions": {
        "jungle": "58.31%",
        "mid": "39.30%",
        "top": "1.35%",
        "support": "0.80%",
        "adc": "0.23%"
      }
    },
    "Elise": {
      "champion": "Elise",
      "positions": {
        "jungle": "94.18%",
        "support": "3.23%",
        "mid": "1.35%",
        "top": "1.09%",
        "adc": "0.14%"
      }
    },
    "Evelynn": {
      "champion": "Evelynn",
      "positions": {
        "jungle": "98.59%",
        "support": "0.81%",
        "mid": "0.32%",
        "top": "0.23%",
        "adc": "0.06%"
      }
    },
    "Ezreal": {
      "champion": "Ezreal",
      "positions": {
        "adc": "94.69%",
        "mid": "3.65%",
        "support": "0.94%",
        "top": "0.52%",
        "jungle": "0.20%"
      }
    },
    "Fiddlesticks": {
      "champion": "Fiddlesticks",
      "positions": {
        "jungle": "77.15%",
        "support": "13.83%",
        "top": "4.39%",
        "mid": "4.34%",
        "adc": "0.28%"
      }
    },
    "Fiora": {
      "champion": "Fiora",
      "positions": {
        "top": "98.08%",
        "mid": "1.32%",
        "adc": "0.29%",
        "support": "0.21%",
        "jungle": "0.09%"
      }
    },
    "Fizz": {
      "champion": "Fizz",
      "positions": {
        "mid": "95.74%",
        "top": "1.77%",
        "support": "1.55%",
        "jungle": "0.51%",
        "adc": "0.43%"
      }
    },
    "Galio": {
      "champion": "Galio",
      "positions": {
        "mid": "77.76%",
        "support": "16.29%",
        "top": "5.03%",
        "jungle": "0.53%",
        "adc": "0.39%"
      }
    },
    "Gangplank": {
      "champion": "Gangplank",
      "positions": {
        "top": "87.96%",
        "mid": "11.33%",
        "adc": "0.36%",
        "support": "0.23%",
        "jungle": "0.12%"
      }
    },
    "Garen": {
      "champion": "Garen",
      "positions": {
        "top": "88.97%",
        "mid": "7.07%",
        "jungle": "3.13%",
        "adc": "0.45%",
        "support": "0.38%"
      }
    },
    "Gnar": {
      "champion": "Gnar",
      "positions": {
        "top": "97.65%",
        "mid": "1.09%",
        "adc": "0.64%",
        "support": "0.40%",
        "jungle": "0.22%"
      }
    },
    "Gragas": {
      "champion": "Gragas",
      "positions": {
        "top": "43.32%",
        "jungle": "41.60%",
        "mid": "10.83%",
        "support": "3.95%",
        "adc": "0.31%"
      }
    },
    "Graves": {
      "champion": "Graves",
      "positions": {
        "jungle": "86.89%",
        "mid": "7.26%",
        "top": "4.97%",
        "adc": "0.68%",
        "support": "0.19%"
      }
    },
    "Gwen": {
      "champion": "Gwen",
      "positions": {
        "top": "80.95%",
        "jungle": "15.77%",
        "mid": "2.97%",
        "adc": "0.22%",
        "support": "0.09%"
      }
    },
    "Hecarim": {
      "champion": "Hecarim",
      "positions": {
        "jungle": "99.23%",
        "top": "0.58%",
        "mid": "0.10%",
        "support": "0.05%",
        "adc": "0.04%"
      }
    },
    "Heimerdinger": {
      "champion": "Heimerdinger",
      "positions": {
        "top": "51.91%",
        "mid": "23.50%",
        "support": "17.73%",
        "adc": "6.28%",
        "jungle": "0.58%"
      }
    },
    "Hwei": {
      "champion": "Hwei",
      "positions": {
        "mid": "69.05%",
        "support": "25.56%",
        "adc": "4.18%",
        "top": "1.15%",
        "jungle": "0.05%"
      }
    },
    "Illaoi": {
      "champion": "Illaoi",
      "positions": {
        "top": "96.01%",
        "mid": "2.94%",
        "support": "0.73%",
        "adc": "0.26%",
        "jungle": "0.06%"
      }
    },
    "Irelia": {
      "champion": "Irelia",
      "positions": {
        "top": "50.26%",
        "mid": "48.45%",
        "adc": "1.02%",
        "support": "0.17%",
        "jungle": "0.10%"
      }
    },
    "Ivern": {
      "champion": "Ivern",
      "positions": {
        "jungle": "86.28%",
        "support": "9.59%",
        "top": "2.40%",
        "mid": "1.32%",
        "adc": "0.42%"
      }
    },
    "Janna": {
      "champion": "Janna",
      "positions": {
        "support": "98.95%",
        "mid": "0.49%",
        "top": "0.44%",
        "adc": "0.07%",
        "jungle": "0.05%"
      }
    },
    "JarvanIV": {
      "champion": "JarvanIV",
      "positions": {
        "jungle": "91.57%",
        "support": "4.13%",
        "top": "2.19%",
        "mid": "1.53%",
        "adc": "0.58%"
      }
    },
    "Jax": {
      "champion": "Jax",
      "positions": {
        "top": "57.72%",
        "jungle": "40.18%",
        "mid": "1.22%",
        "support": "0.64%",
        "adc": "0.24%"
      }
    },
    "Jayce": {
      "champion": "Jayce",
      "positions": {
        "top": "64.41%",
        "mid": "34.14%",
        "adc": "0.65%",
        "support": "0.45%",
        "jungle": "0.35%"
      }
    },
    "Jhin": {
      "champion": "Jhin",
      "positions": {
        "adc": "98.07%",
        "mid": "1.19%",
        "top": "0.35%",
        "support": "0.32%",
        "jungle": "0.07%"
      }
    },
    "Jinx": {
      "champion": "Jinx",
      "positions": {
        "adc": "99.57%",
        "mid": "0.26%",
        "top": "0.10%",
        "support": "0.03%",
        "jungle": "0.03%"
      }
    },
    "Kaisa": {
      "champion": "Kaisa",
      "positions": {
        "adc": "96.11%",
        "mid": "2.58%",
        "top": "0.84%",
        "jungle": "0.23%",
        "support": "0.23%"
      }
    },
    "Kalista": {
      "champion": "Kalista",
      "positions": {
        "adc": "91.93%",
        "top": "4.49%",
        "support": "1.79%",
        "mid": "1.69%",
        "jungle": "0.09%"
      }
    },
    "Karma": {
      "champion": "Karma",
      "positions": {
        "support": "77.51%",
        "mid": "17.36%",
        "top": "4.57%",
        "adc": "0.51%",
        "jungle": "0.04%"
      }
    },
    "Karthus": {
      "champion": "Karthus",
      "positions": {
        "jungle": "80.12%",
        "adc": "10.08%",
        "mid": "6.24%",
        "top": "2.05%",
        "support": "1.50%"
      }
    },
    "Kassadin": {
      "champion": "Kassadin",
      "positions": {
        "mid": "97.05%",
        "top": "2.59%",
        "adc": "0.13%",
        "jungle": "0.12%",
        "support": "0.11%"
      }
    },
    "Katarina": {
      "champion": "Katarina",
      "positions": {
        "mid": "96.43%",
        "top": "1.72%",
        "adc": "1.14%",
        "support": "0.55%",
        "jungle": "0.16%"
      }
    },
    "Kayle": {
      "champion": "Kayle",
      "positions": {
        "top": "85.52%",
        "mid": "12.80%",
        "support": "0.68%",
        "adc": "0.61%",
        "jungle": "0.39%"
      }
    },
    "Kayn": {
      "champion": "Kayn",
      "positions": {
        "jungle": "96.11%",
        "top": "3.27%",
        "mid": "0.46%",
        "support": "0.11%",
        "adc": "0.06%"
      }
    },
    "Kennen": {
      "champion": "Kennen",
      "positions": {
        "top": "74.80%",
        "mid": "18.89%",
        "support": "4.77%",
        "adc": "1.37%",
        "jungle": "0.17%"
      }
    },
    "Khazix": {
      "champion": "Khazix",
      "positions": {
        "jungle": "99.20%",
        "top": "0.40%",
        "mid": "0.26%",
        "support": "0.09%",
        "adc": "0.05%"
      }
    },
    "Kindred": {
      "champion": "Kindred",
      "positions": {
        "jungle": "97.22%",
        "adc": "1.59%",
        "mid": "0.72%",
        "top": "0.32%",
        "support": "0.15%"
      }
    },
    "Kled": {
      "champion": "Kled",
      "positions": {
        "top": "88.08%",
        "mid": "8.58%",
        "support": "1.68%",
        "adc": "1.27%",
        "jungle": "0.39%"
      }
    },
    "KogMaw": {
      "champion": "KogMaw",
      "positions": {
        "adc": "93.63%",
        "mid": "4.28%",
        "support": "1.05%",
        "top": "0.96%",
        "jungle": "0.07%"
      }
    },
    "KSante": {
      "champion": "KSante",
      "positions": {
        "top": "93.60%",
        "mid": "5.04%",
        "support": "0.71%",
        "adc": "0.45%",
        "jungle": "0.19%"
      }
    },
    "Leblanc": {
      "champion": "Leblanc",
      "positions": {
        "mid": "88.50%",
        "support": "9.29%",
        "top": "1.68%",
        "adc": "0.43%",
        "jungle": "0.09%"
      }
    },
    "LeeSin": {
      "champion": "LeeSin",
      "positions": {
        "jungle": "94.78%",
        "top": "2.37%",
        "mid": "1.32%",
        "support": "1.28%",
        "adc": "0.24%"
      }
    },
    "Leona": {
      "champion": "Leona",
      "positions": {
        "support": "99.12%",
        "top": "0.40%",
        "jungle": "0.22%",
        "mid": "0.17%",
        "adc": "0.09%"
      }
    },
    "Lillia": {
      "champion": "Lillia",
      "positions": {
        "jungle": "93.60%",
        "top": "4.92%",
        "mid": "0.85%",
        "support": "0.52%",
        "adc": "0.11%"
      }
    },
    "Lissandra": {
      "champion": "Lissandra",
      "positions": {
        "mid": "89.44%",
        "support": "6.43%",
        "top": "3.43%",
        "adc": "0.58%",
        "jungle": "0.12%"
      }
    },
    "Lucian": {
      "champion": "Lucian",
      "positions": {
        "adc": "94.74%",
        "mid": "3.68%",
        "top": "1.41%",
        "support": "0.11%",
        "jungle": "0.06%"
      }
    },
    "Lulu": {
      "champion": "Lulu",
      "positions": {
        "support": "98.98%",
        "mid": "0.51%",
        "top": "0.38%",
        "adc": "0.08%",
        "jungle": "0.05%"
      }
    },
    "Lux": {
      "champion": "Lux",
      "positions": {
        "support": "61.78%",
        "mid": "35.73%",
        "adc": "2.01%",
        "top": "0.43%",
        "jungle": "0.05%"
      }
    },
    "Malphite": {
      "champion": "Malphite",
      "positions": {
        "top": "59.64%",
        "mid": "29.70%",
        "support": "7.13%",
        "jungle": "3.21%",
        "adc": "0.32%"
      }
    },
    "Malzahar": {
      "champion": "Malzahar",
      "positions": {
        "mid": "90.89%",
        "top": "5.38%",
        "support": "2.08%",
        "adc": "1.40%",
        "jungle": "0.25%"
      }
    },
    "Maokai": {
      "champion": "Maokai",
      "positions": {
        "support": "70.64%",
        "jungle": "17.43%",
        "top": "10.73%",
        "mid": "0.61%",
        "adc": "0.58%"
      }
    },
    "MasterYi": {
      "champion": "MasterYi",
      "positions": {
        "jungle": "94.74%",
        "top": "3.25%",
        "mid": "1.25%",
        "support": "0.40%",
        "adc": "0.36%"
      }
    },
    "Milio": {
      "champion": "Milio",
      "positions": {
        "support": "99.82%",
        "mid": "0.10%",
        "top": "0.05%",
        "adc": "0.02%",
        "jungle": "0.01%"
      }
    },
    "MissFortune": {
      "champion": "MissFortune",
      "positions": {
        "adc": "93.01%",
        "support": "5.36%",
        "mid": "1.39%",
        "top": "0.22%",
        "jungle": "0.02%"
      }
    },
    "MonkeyKing": {
      "champion": "MonkeyKing",
      "positions": {
        "jungle": "56.83%",
        "top": "36.78%",
        "mid": "4.01%",
        "support": "1.70%",
        "adc": "0.69%"
      }
    },
    "Mordekaiser": {
      "champion": "Mordekaiser",
      "positions": {
        "top": "88.69%",
        "jungle": "6.62%",
        "mid": "3.48%",
        "support": "0.72%",
        "adc": "0.49%"
      }
    },
    "Morgana": {
      "champion": "Morgana",
      "positions": {
        "support": "88.66%",
        "mid": "5.91%",
        "jungle": "4.15%",
        "top": "0.75%",
        "adc": "0.53%"
      }
    },
    "Naafiri": {
      "champion": "Naafiri",
      "positions": {
        "mid": "78.60%",
        "top": "12.51%",
        "jungle": "7.23%",
        "support": "0.90%",
        "adc": "0.76%"
      }
    },
    "Nami": {
      "champion": "Nami",
      "positions": {
        "support": "99.79%",
        "mid": "0.11%",
        "adc": "0.05%",
        "top": "0.04%",
        "jungle": "0.01%"
      }
    },
    "Nasus": {
      "champion": "Nasus",
      "positions": {
        "top": "86.71%",
        "mid": "7.37%",
        "jungle": "3.93%",
        "support": "1.54%",
        "adc": "0.45%"
      }
    },
    "Nautilus": {
      "champion": "Nautilus",
      "positions": {
        "support": "96.09%",
        "top": "2.00%",
        "jungle": "0.76%",
        "mid": "0.67%",
        "adc": "0.48%"
      }
    },
    "Neeko": {
      "champion": "Neeko",
      "positions": {
        "support": "58.22%",
        "mid": "33.91%",
        "top": "3.81%",
        "jungle": "2.68%",
        "adc": "1.38%"
      }
    },
    "Nidalee": {
      "champion": "Nidalee",
      "positions": {
        "jungle": "92.74%",
        "support": "3.49%",
        "top": "2.26%",
        "mid": "1.21%",
        "adc": "0.31%"
      }
    },
    "Nilah": {
      "champion": "Nilah",
      "positions": {
        "adc": "98.66%",
        "top": "0.58%",
        "mid": "0.48%",
        "jungle": "0.22%",
        "support": "0.05%"
      }
    },
    "Nocturne": {
      "champion": "Nocturne",
      "positions": {
        "jungle": "97.04%",
        "top": "1.57%",
        "mid": "1.24%",
        "support": "0.11%",
        "adc": "0.05%"
      }
    },
    "Nunu": {
      "champion": "Nunu",
      "positions": {
        "jungle": "88.06%",
        "mid": "7.67%",
        "support": "3.07%",
        "top": "0.72%",
        "adc": "0.49%"
      }
    },
    "Olaf": {
      "champion": "Olaf",
      "positions": {
        "top": "76.94%",
        "jungle": "21.33%",
        "mid": "1.24%",
        "adc": "0.33%",
        "support": "0.17%"
      }
    },
    "Orianna": {
      "champion": "Orianna",
      "positions": {
        "mid": "95.77%",
        "support": "2.59%",
        "top": "0.91%",
        "adc": "0.70%",
        "jungle": "0.03%"
      }
    },
    "Ornn": {
      "champion": "Ornn",
      "positions": {
        "top": "92.67%",
        "support": "2.86%",
        "mid": "2.45%",
        "adc": "1.09%",
        "jungle": "0.93%"
      }
    },
    "Pantheon": {
      "champion": "Pantheon",
      "positions": {
        "support": "43.09%",
        "top": "32.61%",
        "mid": "15.84%",
        "jungle": "7.12%",
        "adc": "1.33%"
      }
    },
    "Poppy": {
      "champion": "Poppy",
      "positions": {
        "jungle": "51.71%",
        "top": "28.32%",
        "support": "18.69%",
        "mid": "1.00%",
        "adc": "0.28%"
      }
    },
    "Pyke": {
      "champion": "Pyke",
      "positions": {
        "support": "96.14%",
        "mid": "2.88%",
        "adc": "0.53%",
        "top": "0.25%",
        "jungle": "0.20%"
      }
    },
    "Qiyana": {
      "champion": "Qiyana",
      "positions": {
        "mid": "84.84%",
        "jungle": "9.78%",
        "top": "3.60%",
        "support": "1.30%",
        "adc": "0.48%"
      }
    },
    "Quinn": {
      "champion": "Quinn",
      "positions": {
        "top": "80.69%",
        "mid": "11.27%",
        "adc": "3.43%",
        "jungle": "2.56%",
        "support": "2.05%"
      }
    },
    "Rakan": {
      "champion": "Rakan",
      "positions": {
        "support": "99.01%",
        "mid": "0.68%",
        "top": "0.22%",
        "jungle": "0.05%",
        "adc": "0.04%"
      }
    },
    "Rammus": {
      "champion": "Rammus",
      "positions": {
        "jungle": "82.39%",
        "top": "14.10%",
        "support": "2.27%",
        "mid": "0.93%",
        "adc": "0.30%"
      }
    },
    "RekSai": {
      "champion": "RekSai",
      "positions": {
        "jungle": "84.37%",
        "top": "13.82%",
        "support": "0.82%",
        "mid": "0.80%",
        "adc": "0.19%"
      }
    },
    "Rell": {
      "champion": "Rell",
      "positions": {
        "support": "97.89%",
        "jungle": "1.38%",
        "top": "0.52%",
        "mid": "0.15%",
        "adc": "0.05%"
      }
    },
    "Renata": {
      "champion": "Renata",
      "positions": {
        "support": "99.43%",
        "top": "0.22%",
        "mid": "0.22%",
        "adc": "0.10%",
        "jungle": "0.02%"
      }
    },
    "Renekton": {
      "champion": "Renekton",
      "positions": {
        "top": "92.21%",
        "mid": "7.15%",
        "adc": "0.28%",
        "support": "0.20%",
        "jungle": "0.16%"
      }
    },
    "Rengar": {
      "champion": "Rengar",
      "positions": {
        "jungle": "81.25%",
        "top": "15.06%",
        "adc": "2.00%",
        "support": "1.57%",
        "mid": "0.12%"
      }
    },
    "Riven": {
      "champion": "Riven",
      "positions": {
        "top": "91.06%",
        "mid": "6.56%",
        "jungle": "1.50%",
        "support": "0.47%",
        "adc": "0.41%"
      }
    },
    "Rumble": {
      "champion": "Rumble",
      "positions": {
        "top": "60.26%",
        "support": "14.52%",
        "jungle": "13.90%",
        "mid": "10.81%",
        "adc": "0.50%"
      }
    },
    "Ryze": {
      "champion": "Ryze",
      "positions": {
        "mid": "75.81%",
        "top": "22.59%",
        "adc": "0.85%",
        "support": "0.45%",
        "jungle": "0.30%"
      }
    },
    "Samira": {
      "champion": "Samira",
      "positions": {
        "adc": "98.76%",
        "mid": "0.79%",
        "top": "0.36%",
        "jungle": "0.05%",
        "support": "0.04%"
      }
    },
    "Sejuani": {
      "champion": "Sejuani",
      "positions": {
        "jungle": "89.83%",
        "top": "6.90%",
        "support": "2.09%",
        "mid": "0.81%",
        "adc": "0.36%"
      }
    },
    "Senna": {
      "champion": "Senna",
      "positions": {
        "support": "88.92%",
        "adc": "9.34%",
        "top": "1.09%",
        "mid": "0.62%",
        "jungle": "0.03%"
      }
    },
    "Seraphine": {
      "champion": "Seraphine",
      "positions": {
        "support": "82.62%",
        "adc": "10.74%",
        "mid": "6.35%",
        "top": "0.25%",
        "jungle": "0.05%"
      }
    },
    "Sett": {
      "champion": "Sett",
      "positions": {
        "top": "89.90%",
        "support": "4.47%",
        "mid": "4.09%",
        "jungle": "0.91%",
        "adc": "0.63%"
      }
    },
    "Shaco": {
      "champion": "Shaco",
      "positions": {
        "jungle": "72.20%",
        "support": "23.63%",
        "top": "3.39%",
        "mid": "0.53%",
        "adc": "0.24%"
      }
    },
    "Shen": {
      "champion": "Shen",
      "positions": {
        "top": "74.43%",
        "support": "12.17%",
        "mid": "10.31%",
        "jungle": "2.67%",
        "adc": "0.42%"
      }
    },
    "Shyvana": {
      "champion": "Shyvana",
      "positions": {
        "jungle": "88.58%",
        "top": "8.41%",
        "mid": "2.70%",
        "support": "0.24%",
        "adc": "0.08%"
      }
    },
    "Singed": {
      "champion": "Singed",
      "positions": {
        "top": "82.46%",
        "mid": "7.07%",
        "jungle": "4.90%",
        "support": "4.30%",
        "adc": "1.27%"
      }
    },
    "Sion": {
      "champion": "Sion",
      "positions": {
        "top": "77.37%",
        "mid": "11.98%",
        "jungle": "4.20%",
        "support": "4.17%",
        "adc": "2.28%"
      }
    },
    "Sivir": {
      "champion": "Sivir",
      "positions": {
        "adc": "98.30%",
        "mid": "1.24%",
        "top": "0.33%",
        "support": "0.09%",
        "jungle": "0.04%"
      }
    },
    "Skarner": {
      "champion": "Skarner",
      "positions": {
        "jungle": "51.41%",
        "top": "39.88%",
        "support": "7.14%",
        "mid": "1.26%",
        "adc": "0.32%"
      }
    },
    "Smolder": {
      "champion": "Smolder",
      "positions": {
        "adc": "85.43%",
        "mid": "7.05%",
        "top": "6.97%",
        "support": "0.50%",
        "jungle": "0.04%"
      }
    },
    "Sona": {
      "champion": "Sona",
      "positions": {
        "support": "98.84%",
        "mid": "0.57%",
        "adc": "0.36%",
        "top": "0.18%",
        "jungle": "0.04%"
      }
    },
    "Soraka": {
      "champion": "Soraka",
      "positions": {
        "support": "97.76%",
        "top": "1.11%",
        "mid": "0.69%",
        "adc": "0.33%",
        "jungle": "0.11%"
      }
    },
    "Swain": {
      "champion": "Swain",
      "positions": {
        "support": "60.17%",
        "mid": "20.94%",
        "adc": "9.80%",
        "top": "8.99%",
        "jungle": "0.10%"
      }
    },
    "Sylas": {
      "champion": "Sylas",
      "positions": {
        "mid": "66.52%",
        "jungle": "20.28%",
        "top": "6.51%",
        "support": "6.30%",
        "adc": "0.40%"
      }
    },
    "Syndra": {
      "champion": "Syndra",
      "positions": {
        "mid": "92.94%",
        "support": "3.29%",
        "adc": "2.61%",
        "top": "1.14%",
        "jungle": "0.02%"
      }
    },
    "TahmKench": {
      "champion": "TahmKench",
      "positions": {
        "top": "66.58%",
        "support": "23.59%",
        "adc": "6.84%",
        "mid": "2.51%",
        "jungle": "0.48%"
      }
    },
    "Taliyah": {
      "champion": "Taliyah",
      "positions": {
        "mid": "49.85%",
        "jungle": "44.80%",
        "support": "3.40%",
        "adc": "1.23%",
        "top": "0.71%"
      }
    },
    "Talon": {
      "champion": "Talon",
      "positions": {
        "mid": "68.40%",
        "jungle": "29.67%",
        "top": "1.43%",
        "support": "0.27%",
        "adc": "0.22%"
      }
    },
    "Taric": {
      "champion": "Taric",
      "positions": {
        "support": "93.02%",
        "jungle": "3.74%",
        "top": "1.96%",
        "adc": "0.69%",
        "mid": "0.59%"
      }
    },
    "Teemo": {
      "champion": "Teemo",
      "positions": {
        "top": "73.56%",
        "support": "10.64%",
        "jungle": "7.77%",
        "mid": "4.59%",
        "adc": "3.45%"
      }
    },
    "Thresh": {
      "champion": "Thresh",
      "positions": {
        "support": "99.14%",
        "top": "0.41%",
        "mid": "0.20%",
        "adc": "0.20%",
        "jungle": "0.05%"
      }
    },
    "Tristana": {
      "champion": "Tristana",
      "positions": {
        "adc": "60.90%",
        "mid": "35.81%",
        "top": "2.59%",
        "jungle": "0.39%",
        "support": "0.31%"
      }
    },
    "Trundle": {
      "champion": "Trundle",
      "positions": {
        "top": "80.93%",
        "jungle": "16.18%",
        "support": "1.28%",
        "mid": "1.04%",
        "adc": "0.57%"
      }
    },
    "Tryndamere": {
      "champion": "Tryndamere",
      "positions": {
        "top": "86.61%",
        "mid": "7.13%",
        "jungle": "5.71%",
        "adc": "0.36%",
        "support": "0.19%"
      }
    },
    "TwistedFate": {
      "champion": "TwistedFate",
      "positions": {
        "mid": "74.49%",
        "top": "18.50%",
        "adc": "3.38%",
        "support": "3.07%",
        "jungle": "0.56%"
      }
    },
    "Twitch": {
      "champion": "Twitch",
      "positions": {
        "adc": "85.87%",
        "support": "5.78%",
        "mid": "4.91%",
        "jungle": "3.06%",
        "top": "0.37%"
      }
    },
    "Udyr": {
      "champion": "Udyr",
      "positions": {
        "jungle": "64.83%",
        "top": "32.85%",
        "mid": "1.55%",
        "support": "0.55%",
        "adc": "0.21%"
      }
    },
    "Urgot": {
      "champion": "Urgot",
      "positions": {
        "top": "94.85%",
        "mid": "2.14%",
        "jungle": "1.52%",
        "adc": "0.78%",
        "support": "0.71%"
      }
    },
    "Varus": {
      "champion": "Varus",
      "positions": {
        "adc": "89.55%",
        "top": "5.52%",
        "mid": "3.63%",
        "support": "1.24%",
        "jungle": "0.06%"
      }
    },
    "Vayne": {
      "champion": "Vayne",
      "positions": {
        "adc": "67.40%",
        "top": "30.20%",
        "mid": "1.86%",
        "jungle": "0.35%",
        "support": "0.20%"
      }
    },
    "Veigar": {
      "champion": "Veigar",
      "positions": {
        "mid": "78.55%",
        "adc": "11.14%",
        "support": "7.59%",
        "top": "2.68%",
        "jungle": "0.03%"
      }
    },
    "Velkoz": {
      "champion": "Velkoz",
      "positions": {
        "support": "68.55%",
        "mid": "27.44%",
        "adc": "2.59%",
        "top": "1.38%",
        "jungle": "0.05%"
      }
    },
    "Vex": {
      "champion": "Vex",
      "positions": {
        "mid": "94.35%",
        "support": "3.97%",
        "top": "1.03%",
        "adc": "0.59%",
        "jungle": "0.05%"
      }
    },
    "Vi": {
      "champion": "Vi",
      "positions": {
        "jungle": "94.61%",
        "mid": "2.19%",
        "top": "2.03%",
        "support": "0.99%",
        "adc": "0.17%"
      }
    },
    "Viego": {
      "champion": "Viego",
      "positions": {
        "jungle": "97.70%",
        "mid": "1.08%",
        "top": "0.95%",
        "support": "0.19%",
        "adc": "0.08%"
      }
    },
    "Viktor": {
      "champion": "Viktor",
      "positions": {
        "mid": "94.99%",
        "top": "3.18%",
        "adc": "1.18%",
        "support": "0.62%",
        "jungle": "0.03%"
      }
    },
    "Vladimir": {
      "champion": "Vladimir",
      "positions": {
        "mid": "77.32%",
        "top": "21.45%",
        "adc": "1.01%",
        "support": "0.17%",
        "jungle": "0.05%"
      }
    },
    "Volibear": {
      "champion": "Volibear",
      "positions": {
        "jungle": "50.97%",
        "top": "47.28%",
        "mid": "1.12%",
        "support": "0.47%",
        "adc": "0.15%"
      }
    },
    "Warwick": {
      "champion": "Warwick",
      "positions": {
        "jungle": "71.94%",
        "top": "26.58%",
        "mid": "0.73%",
        "support": "0.59%",
        "adc": "0.16%"
      }
    },
    "Xayah": {
      "champion": "Xayah",
      "positions": {
        "adc": "99.33%",
        "mid": "0.37%",
        "top": "0.20%",
        "jungle": "0.05%",
        "support": "0.04%"
      }
    },
    "Xerath": {
      "champion": "Xerath",
      "positions": {
        "support": "56.89%",
        "mid": "41.05%",
        "adc": "1.68%",
        "top": "0.35%",
        "jungle": "0.03%"
      }
    },
    "XinZhao": {
      "champion": "XinZhao",
      "positions": {
        "jungle": "88.54%",
        "top": "6.98%",
        "mid": "2.85%",
        "support": "1.16%",
        "adc": "0.47%"
      }
    },
    "Yasuo": {
      "champion": "Yasuo",
      "positions": {
        "mid": "68.07%",
        "top": "16.65%",
        "adc": "14.35%",
        "support": "0.58%",
        "jungle": "0.35%"
      }
    },
    "Yone": {
      "champion": "Yone",
      "positions": {
        "mid": "51.82%",
        "top": "45.96%",
        "adc": "1.16%",
        "support": "0.59%",
        "jungle": "0.47%"
      }
    },
    "Yorick": {
      "champion": "Yorick",
      "positions": {
        "top": "90.53%",
        "mid": "4.48%",
        "jungle": "4.06%",
        "adc": "0.49%",
        "support": "0.43%"
      }
    },
    "Yuumi": {
      "champion": "Yuumi",
      "positions": {
        "support": "99.22%",
        "mid": "0.24%",
        "top": "0.23%",
        "jungle": "0.22%",
        "adc": "0.08%"
      }
    },
    "Zac": {
      "champion": "Zac",
      "positions": {
        "jungle": "56.98%",
        "top": "27.57%",
        "support": "11.35%",
        "mid": "3.81%",
        "adc": "0.29%"
      }
    },
    "Zed": {
      "champion": "Zed",
      "positions": {
        "mid": "85.79%",
        "jungle": "10.17%",
        "top": "3.05%",
        "support": "0.56%",
        "adc": "0.43%"
      }
    },
    "Zeri": {
      "champion": "Zeri",
      "positions": {
        "adc": "97.25%",
        "mid": "1.02%",
        "top": "0.91%",
        "jungle": "0.76%",
        "support": "0.05%"
      }
    },
    "Ziggs": {
      "champion": "Ziggs",
      "positions": {
        "adc": "49.98%",
        "mid": "38.26%",
        "support": "10.55%",
        "top": "1.17%",
        "jungle": "0.04%"
      }
    },
    "Zilean": {
      "champion": "Zilean",
      "positions": {
        "support": "88.39%",
        "mid": "8.73%",
        "top": "2.33%",
        "adc": "0.49%",
        "jungle": "0.06%"
      }
    },
    "Zoe": {
      "champion": "Zoe",
      "positions": {
        "mid": "84.43%",
        "support": "13.73%",
        "adc": "0.96%",
        "top": "0.84%",
        "jungle": "0.05%"
      }
    },
    "Zyra": {
      "champion": "Zyra",
      "positions": {
        "support": "90.56%",
        "jungle": "5.11%",
        "mid": "3.27%",
        "adc": "0.65%",
        "top": "0.41%"
      }
    }
  }
const logo = document.getElementById('logo').querySelector('img');
const logoLink = document.getElementById('logo').querySelector('a');
logoLink.href = '/draft-draw';
logo.src = '/assets/draft-draw.png';
logo.style.width = "300px";
navBtn.style.width = '120px';
navBtn.href = '/';
navBtn.innerHTML = '<span>Home</span>';
navBtn.classList.add('button-new');
navBtn.style.backgroundImage = 'none';
const colorMeaningBtn = document.createElement('a');
colorMeaningBtn.innerText = 'Colors & Comps Definitions';
colorMeaningBtn.classList.add('color-meaning-btn');

colorMeaningBtn.style.marginLeft = '70px';
colorMeaningBtn.addEventListener('click', () => {
  const colorMeaningPopup = document.getElementById('color-meaning-popup');
  colorMeaningPopup.style.display = "flex";
  const container = document.querySelector('.container');
  container.style.filter = "blur(5px)";
  document.addEventListener("click", (event) => {
    if (event.target !== colorMeaningBtn) {
      colorMeaningPopup.style.display = 'none';
      container.style.filter = "blur(0px)";
    }
  });
});
header.insertBefore(colorMeaningBtn, navBtn.parentNode.nextSibling);
let allChampionsColors;
let championComps;
document.addEventListener("DOMContentLoaded", () => {
    (async () => {
        try {
            const colorsData = await fetch("/data/champion-colors.json");
            allChampionsColors = await colorsData.json();
            const compsData = await fetch("/data/champion-comps.json");
            championComps = await compsData.json();
            generateChampionImages();
            addChampionContainerEventListeners();
            addSearchEventListeners();
            addLaneEventListeners();
            document.getElementById("complete-draft").addEventListener("click", () => {
                findTeamPositions();
            });
            document.getElementById("back-to-draft").addEventListener("click", () => {
                draftMode();
            });
            document.getElementById("team-submit").addEventListener("click", () => {
              analysisMode();
            });
            document.getElementById("edit-draft").addEventListener("click", () => {
              teamSetupMode();
            });
            document.getElementById("reset-draft").addEventListener("click", () => {
              window.location.reload();
            });
        } catch (error) {
            console.error(error);
        }
    })();
});

function addChampionContainerEventListeners() {
    const championImages = document.querySelectorAll(".champion-container");
    championImages.forEach((championImage) => {
        championImage.addEventListener("click", (e) => {
          toggleSelection(championImage);
          e.stopPropagation();
        });
        championImage.addEventListener("dragstart", handleDragStart);
        championImage.addEventListener("dragend", handleDragEnd);
        championImage.addEventListener("dragover", (e) => e.preventDefault());
    })
    const lanes = document.querySelectorAll(".lane-container");
    lanes.forEach((lane) => {
        lane.addEventListener("dragover", (e) => e.preventDefault());
        lane.addEventListener("drop", handleDrop);
    });
}

function toggleSelection(championContainer) {
    const selectedChampion = document.querySelector(".selected-champion");
    const championContainerImage = championContainer.querySelector(".champion-box");
    if (selectedChampion) {
        clearPopup();
        selectedChampion.classList.remove("selected-champion");
        if (selectedChampion !== championContainerImage) {
            championContainer.querySelector(".champion-box").classList.add("selected-champion");
            showPopup(championContainer);
        }
    } else {
        championContainer.querySelector(".champion-box").classList.add("selected-champion");
        showPopup(championContainer);
    }
}

function handleDragStart(e) {
    const removeIcons = document.querySelectorAll(".remove-icon");
    removeIcons.forEach((icon) => {
        icon.style.opacity = 1;
        icon.style.width = "120px";
        icon.style.height = "660px";
    });
    clearPopup();
    clearSelection();
    const image = e.target.querySelector("img") || e.target;
    if (!image) return;

    e.dataTransfer.setData("text", image.id);

    const container = image.closest('.champion-box');
    container.classList.add("selected-champion");
}

function handleDragEnd() {
    clearSelection();
    sortImages();
}

function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    const draggedImage = document.getElementById(id).parentNode.parentNode;
    const target = e.target;
    let targetBox;
    if (target.classList.contains("lane-container")) {
        targetBox = target;
    } else if (target.classList.contains("champion-tile")) {
        targetBox = target.parentNode.parentNode;
    } else {
        return;
    }

    if (targetBox.classList.contains("champion-container")){
      const sourceBox = draggedImage.parentNode;
      const laneContainer = targetBox.parentNode;
      sourceBox.appendChild(targetBox);
      laneContainer.appendChild(draggedImage);
    } else{
        targetBox.appendChild(draggedImage);
    }
    updateTeamComps();
    updateColorGraphs();
    sortImages();
}

document.addEventListener("dragover", (e) => {
    if (!e.target.classList.contains("lane-container")) {
        e.preventDefault();
    }
});

document.addEventListener("drop", handleDocumentDrop);

function handleDocumentDrop(e) {
  const removeIcons = document.querySelectorAll(".remove-icon");
    removeIcons.forEach((icon) => {
        icon.style.opacity = 0
        icon.style.width = "10px";
        icon.style.height = "10px";
    });
    if (e.target.classList.contains("remove-icon")    ) {
        e.preventDefault();
        const id = e.dataTransfer.getData("text");
        const draggedImage = document.getElementById(id);
        if (draggedImage) {
            let targetBox;
            const championImagesContainer = document.getElementById("champions-container");
            if (draggedImage.classList.contains("lane-container")) {
                targetBox = draggedImage;
            } else if (draggedImage.classList.contains("champion-tile")) {
                targetBox = draggedImage.parentNode.parentNode;
            } else {
                return;
            }
            championImagesContainer.appendChild(targetBox);
            updateTeamComps();
            updateColorGraphs();
            sortImages();
        }
    }
    if(document.querySelector("#top-one").querySelector(".champion-container") && document.querySelector("#jungle-one").querySelector(".champion-container") && document.querySelector("#mid-one").querySelector(".champion-container") && document.querySelector("#adc-one").querySelector(".champion-container") && document.querySelector("#support-one").querySelector(".champion-container") && document.querySelector("#top-two").querySelector(".champion-container") && document.querySelector("#jungle-two").querySelector(".champion-container") && document.querySelector("#mid-two").querySelector(".champion-container") && document.querySelector("#adc-two").querySelector(".champion-container") && document.querySelector("#support-two").querySelector(".champion-container")) {
      const draftComplete = document.getElementById("complete-draft");
      draftComplete.style.display = "flex";
      setTimeout(() => {
        draftComplete.style.opacity = 1;
        draftComplete.style.width = '200px';
        draftComplete.style.height = '40px';
    }, 10);
    } else {
      const draftComplete = document.getElementById("complete-draft");
      draftComplete.style.opacity = 0;
        draftComplete.style.width = '0px';
        draftComplete.style.height = '0px';
        setTimeout(() => {
        draftComplete.style.display = "none";
    }, 200);
    }
}

function clearSelection() {
    const selectedChampion = document.querySelector(".selected-champion");
    if (selectedChampion) {
        selectedChampion.classList.remove("selected-champion");
    }
}

function showPopup(image) {
    const existingPopup = document.querySelector(".popup");
    if (existingPopup) {
        existingPopup.remove();
    }
    const championName = image.querySelector(".champion-tile").getAttribute("champion_name");
    const championId = image.querySelector(".champion-tile").id;
    const popup = document.createElement("div");

    const championColors = allChampionsColors[championId];
    const popupContent = document.createElement("div");
    popupContent.className = "popup-content";
    const colorTitle = document.createElement("p");
    colorTitle.textContent = "Colors:";
    colorTitle.className = "color-title";
    popupContent.appendChild(colorTitle);
    Object.keys(championColors).forEach((color) => {
      const colorValue = parseInt(championColors[color], 10);
      if( colorValue !== 0) {
        const colorContainer = document.createElement("div");
        colorContainer.className = "color-container";
        const colorBar = document.createElement("div");
        const emptyBar = document.createElement("div");
        colorBar.style.flex = `${colorValue / 5}`;
        colorBar.style.borderRadius = "50px";
        if (color === "Red") {
          colorBar.style.backgroundColor = "#CC3E22";
        } else if (color === "Green") {
          colorBar.style.backgroundColor = "#3cc89b";
        } else if (color === "Blue") {
          colorBar.style.backgroundColor = "#3c9bc8";
        } else if (color === "Black") {
          colorBar.style.backgroundColor = "#000000";
        } else if (color === "White") {
          colorBar.style.backgroundColor = "#FFFFFF";
        }
        colorContainer.appendChild(colorBar);
        colorContainer.appendChild(emptyBar);
        popupContent.appendChild(colorContainer);
      }
    });
    const compTitle = document.createElement("p");
    compTitle.textContent = "Comps:";
    compTitle.className = "comp-title";
    popupContent.appendChild(compTitle);
    const primaryComp = championComps[championId].Comps.Primary;
    const [primaryName, primaryValue] = Object.entries(primaryComp)[0];
    const secondaryComp = championComps[championId].Comps.Secondary;
    const [secondaryName, secondaryValue] = Object.entries(secondaryComp)[0];
    const primaryCompContainer = document.createElement("div");
    primaryCompContainer.className = "comp-container";
    const primaryCompName = document.createElement("p");
    primaryCompName.className = "comp-name";
    if (primaryName === "Attack") {
      primaryCompName.style.color = "#CC3E22";
      primaryCompName.innerHTML = "<span style='color: #ffffff'>Primary:</span><span style='font-weight: 600;'> Attack </span><span style='color: #ffffff'>(" + primaryValue + ")</span>";
    } else if (primaryName === "Catch") {
      primaryCompName.style.color = "#FFE300";
      primaryCompName.innerHTML = "<span style='color: #ffffff'>Primary:</span><span style='font-weight: 600;'> Catch </span><span style='color: #ffffff'>(" + primaryValue + ")</span>";
    } else if (primaryName === "Protect") {
      primaryCompName.style.color = "#3cc89b";
      primaryCompName.innerHTML = "<span style='color: #ffffff'>Primary:</span><span style='font-weight: 600;'> Protect </span><span style='color: #ffffff'>(" + primaryValue + ")</span>";
    } else if (primaryName === "Siege") {
      primaryCompName.style.color = "#3c9bc8";
      primaryCompName.innerHTML = "<span style='color: #ffffff'>Primary:</span><span style='font-weight: 600;'> Siege </span><span style='color: #ffffff'>(" + primaryValue + ")</span>";
    } else if (primaryName === "Split") {
      primaryCompName.style.color = "#AB2DC0";
      primaryCompName.innerHTML = "<span style='color: #ffffff'>Primary:</span><span style='font-weight: 600;'> Split </span><span style='color: #ffffff'>(" + primaryValue + ")</span>";
    } else {
    primaryCompName.textContent = "";
    }
    primaryCompContainer.appendChild(primaryCompName);
    popupContent.appendChild(primaryCompContainer);
    const secondaryCompContainer = document.createElement("div");
    secondaryCompContainer.className = "comp-container";
    const secondaryCompName = document.createElement("p");
    secondaryCompName.className = "comp-name";
    if (secondaryName === "Attack") {
      secondaryCompName.style.color = "#CC3E22";
      secondaryCompName.innerHTML = "<span style='color: #ffffff'>Secondary:</span><span style='font-weight: 600;'> Attack </span><span style='color: #ffffff'>(" + secondaryValue + ")</span>";
    } else if (secondaryName === "Catch") {
      secondaryCompName.style.color = "#FFE300";
      secondaryCompName.innerHTML = "<span style='color: #ffffff'>Secondary:</span><span style='font-weight: 600;'> Catch </span><span style='color: #ffffff'>(" + secondaryValue + ")</span>";
    } else if (secondaryName === "Protect") {
      secondaryCompName.style.color = "#3cc89b";
      secondaryCompName.innerHTML = "<span style='color: #ffffff'>Secondary:</span><span style='font-weight: 600;'> Protect </span><span style='color: #ffffff'>(" + secondaryValue + ")</span>";
    } else if (secondaryName === "Siege") {
      secondaryCompName.style.color = "#3c9bc8";
      secondaryCompName.innerHTML = "<span style='color: #ffffff'>Secondary:</span><span style='font-weight: 600;'> Siege </span><span style='color: #ffffff'>(" + secondaryValue + ")</span>";
    } else if (secondaryName === "Split") {
      secondaryCompName.style.color = "#AB2DC0";
      secondaryCompName.innerHTML = "<span style='color: #ffffff'>Secondary:</span><span style='font-weight: 600;'> Split </span><span style='color: #ffffff'>(" + secondaryValue + ")</span>";
    } else {
      secondaryCompName.textContent = "";
    }
    secondaryCompContainer.appendChild(secondaryCompName);
    popupContent.appendChild(secondaryCompContainer);

    popup.appendChild(popupContent);
    popup.className = "popup";
    popup.innerHTML = `<p class="popup-title"">${championName}</p><hr style="margin-bottom: 8px;">
                      ${popupContent.innerHTML}
                      `;

    document.body.appendChild(popup);

    const rect = image.getBoundingClientRect();
    popup.style.left = `${rect.right + 10}px`;
    popup.style.top = `${rect.top}px`;
    popup.style.display = "block";
}

function clearPopup() {
    const popup = document.querySelector(".popup");
    if (popup) {
        popup.remove();
    }
}

document.body.addEventListener("click", () =>{
    clearSelection();
    clearPopup()
});
document.addEventListener('wheel', () => {
    clearSelection();
    clearPopup()
});

function sortImages() {
    const championImagesContainer = document.getElementById("champions-container");
    const images = Array.from(
      championImagesContainer.querySelectorAll(".champion-container")
    );

    images.sort((a, b) => {
        const nameA = a.querySelector('[champion_name]').getAttribute('champion_name').toUpperCase();
        const nameB = b.querySelector('[champion_name]').getAttribute('champion_name').toUpperCase();
        return nameA.localeCompare(nameB);
      });

    championImagesContainer.innerHTML = "";
    images.forEach((img) => championImagesContainer.appendChild(img));
}


function generateChampionImages() {
    const championsContainer = document.getElementById('champions-container');

    for (const championName in allChampionsColors) {
        if (allChampionsColors.hasOwnProperty(championName)) {
            const championData = allChampionsColors[championName];
            const championContainer = document.createElement('div');
            championContainer.className = 'champion-container';
            championContainer.draggable = true;
            const championBox = document.createElement('div');
            championBox.className = 'champion-box';
            championContainer.appendChild(championBox);
            const img = document.createElement('img');
            img.src = `https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${championName}.png`;
            img.className = 'champion-tile';
            img.id = championName;
            if(championName === 'MonkeyKing') {
                img.setAttribute('champion_name', 'Wukong');
            } else {
                img.setAttribute('champion_name', championName);
            }
            championBox.appendChild(img);
            const red = parseInt(championData.Red, 10);
            const green = parseInt(championData.Green, 10);
            const blue = parseInt(championData.Blue, 10);
            const black = parseInt(championData.Black, 10);
            const white = parseInt(championData.White, 10);
            const colorSum = red + green + blue + black + white;
            const redColorPercentage = red / colorSum;
            const greenColorPercentage = green / colorSum;
            const blueColorPercentage = blue / colorSum;
            const blackColorPercentage = black / colorSum;
            const whiteColorPercentage = white / colorSum;
            const colorsContainer = document.createElement('div');
            colorsContainer.className = 'champion-colors';
            const redColor = document.createElement('div');
            redColor.className = 'color-box red-color-box';
            redColor.style.flex = `${redColorPercentage * 100} 0 0`;
            colorsContainer.appendChild(redColor);
            const greenColor = document.createElement('div');
            greenColor.className = 'color-box green-color-box';
            greenColor.style.flex = `${greenColorPercentage * 100} 0 0`;
            colorsContainer.appendChild(greenColor);
            const blueColor = document.createElement('div');
            blueColor.className = 'color-box blue-color-box';
            blueColor.style.flex = `${blueColorPercentage * 100} 0 0`;
            colorsContainer.appendChild(blueColor);
            const blackColor = document.createElement('div');
            blackColor.className = 'color-box black-color-box';
            blackColor.style.flex = `${blackColorPercentage * 100} 0 0`;
            colorsContainer.appendChild(blackColor);
            const whiteColor = document.createElement('div');
            whiteColor.className = 'color-box white-color-box';
            whiteColor.style.flex = `${whiteColorPercentage * 100} 0 0`;
            colorsContainer.appendChild(whiteColor);
            championBox.appendChild(colorsContainer);
            const championNameDiv = document.createElement('div');
            championNameDiv.className = 'champion-name';
            if(championName === 'MonkeyKing') {
                championNameDiv.textContent = 'Wukong';
            } else {
                championNameDiv.textContent = championName;
            }
            championContainer.appendChild(championNameDiv);
            championsContainer.appendChild(championContainer);
        }
    }
}

function addSearchEventListeners() {
    const searchBox = document.getElementById("searchBox");
    searchBox.addEventListener('click', function () {
      this.select();
    });
    searchBox.addEventListener("input", () => {
        const searchText = searchBox.value.toLowerCase();
        const championImagesContainer = document.getElementById("champions-container");
        const championImages = championImagesContainer.querySelectorAll(".champion-container");

        championImages.forEach((champion) => {
        image = champion.querySelector("img");
        const name = image.getAttribute("champion_name").toLowerCase();
        if (name.includes(searchText)) {
            champion.style.display = "block";
        } else {
            champion.style.display = "none";
        }
        });
    });
    const clearBtn = document.getElementById("clear-search");

    clearBtn.addEventListener("click", () => {
        document.getElementById("searchBox").value = "";
        const championImagesContainer = document.getElementById("champions-container");
        const championImages = championImagesContainer.querySelectorAll(".champion-container");

        championImages.forEach((image) => image.style.display = "block");
    });
}

function addLaneEventListeners() {
    const lanes = document.querySelectorAll(".lane-filter");
    lanes.forEach((lane) => {
        lane.addEventListener("click", (e) => {
            const laneName = lane.getAttribute("lane");
            filterChampions(laneName);
            e.stopPropagation();
        });
    });
}

function filterChampions(lane) {
    const championImagesContainer = document.getElementById("champions-container");
    const championImages = championImagesContainer.querySelectorAll(".champion-container");
    championImages.forEach((champion) => {
        const name = champion.querySelector("img").getAttribute("champion_name");
        if (lane === "top") {
            if (topFilter.includes(name)) {
                champion.style.display = "block";
            } else {
                champion.style.display = "none";
            }
        } else if (lane === "jungle") {
            if (jungleFilter.includes(name)) {
                champion.style.display = "block";
            } else {
                champion.style.display = "none";
            }
        } else if (lane === "mid") {
            if (midFilter.includes(name)) {
                champion.style.display = "block";
            } else {
                champion.style.display = "none";
            }
        } else if (lane === "adc") {
            if (adcFilter.includes(name)) {
                champion.style.display = "block";
            } else {
                champion.style.display = "none";
            }
        } else if (lane === "support") {
            if (supportFilter.includes(name)) {
                champion.style.display = "block";
            } else {
                champion.style.display = "none";
            }
        } else {
            champion.style.display = "block";
        }
    });
    document.querySelector(".lane-filter.active").classList.remove("active");
    document.querySelector(`.lane-filter[lane=${lane}]`).classList.add("active");
}

function findTeamPositions() {
    const team1Champ1 = document.querySelector("#top-one").querySelector(".champion-container").querySelector("img").getAttribute("champion_name");
    const team1Champ2 = document.querySelector("#jungle-one").querySelector(".champion-container").querySelector("img").getAttribute("champion_name");
    const team1Champ3 = document.querySelector("#mid-one").querySelector(".champion-container").querySelector("img").getAttribute("champion_name");
    const team1Champ4 = document.querySelector("#adc-one").querySelector(".champion-container").querySelector("img").getAttribute("champion_name");
    const team1Champ5 = document.querySelector("#support-one").querySelector(".champion-container").querySelector("img").getAttribute("champion_name");
    const team2Champ1 = document.querySelector("#top-two").querySelector(".champion-container").querySelector("img").getAttribute("champion_name");
    const team2Champ2 = document.querySelector("#jungle-two").querySelector(".champion-container").querySelector("img").getAttribute("champion_name");
    const team2Champ3 = document.querySelector("#mid-two").querySelector(".champion-container").querySelector("img").getAttribute("champion_name");
    const team2Champ4 = document.querySelector("#adc-two").querySelector(".champion-container").querySelector("img").getAttribute("champion_name");
    const team2Champ5 = document.querySelector("#support-two").querySelector(".champion-container").querySelector("img").getAttribute("champion_name");

    const teamOne = [team1Champ1, team1Champ2, team1Champ3, team1Champ4, team1Champ5];
    const teamTwo = [team2Champ1, team2Champ2, team2Champ3, team2Champ4, team2Champ5];

    assignPositions('-one', teamOne);
    assignPositions('-two', teamTwo);
}


function assignPositions(team, champions) {
  let positionUsage = {};
  let assignments = {};

  let allPositions = champions
    .flatMap((champion) =>
      Object.entries(championPositions[champion].positions).map(
        ([position, percentage]) => ({
          champion,
          position,
          percentage: parseFloat(percentage),
        })
      )
    )
    .sort((a, b) => b.percentage - a.percentage); // Sort by highest percentage first

  // Assign positions to team based on the sorted preferences.
  allPositions.forEach(({ champion, position }) => {
    if (!assignments[champion] && !positionUsage[position]) {
      assignments[champion] = position;
      positionUsage[position] = true;
    }
  });

  Object.entries(assignments).forEach(([champion, position]) => {
    const positionContainer = document.querySelector(`#${position}${team}`);
    const championContainer = document.querySelector(`#${champion}`).parentNode
      .parentNode;
    positionContainer.appendChild(championContainer);
  });
  teamSetupMode();
}

function teamSetupMode () {
  document.querySelectorAll(".champion-container").forEach((champion) => {
    champion.addEventListener("dragstart", handleDragStart);
    champion.addEventListener("dragend", handleDragEnd);
    champion.addEventListener("dragover", (e) => e.preventDefault());
  });
  document.getElementById("draft-header").style.display = "none";
  document.addEventListener("drop", handleDocumentDrop)
  const draftIcons = document.querySelectorAll(".draft-icon");
  draftIcons.forEach((icon) => {
      icon.style.display = "none";
  });
  const laneIcons = document.querySelectorAll(".lane-icon");
  laneIcons.forEach((icon) => {
      icon.style.display = "block";
  });
  const workspace = document.getElementById("workspace");
  workspace.style.width = "0";
  workspace.style.height = "0";
  workspace.style.opacity = "0";
  workspace.style.display = "block";
  const submitBtns = document.getElementById("phase-2-btns");
  submitBtns.style.display = "flex";
  const removeIcons = document.querySelectorAll(".remove-icon");
  removeIcons.forEach((icon) => {
      icon.style.display = "none";
  });
  document.getElementById("complete-draft").style.display = "none";
  const teamContainer = document.querySelectorAll(".team-container");
  teamContainer.forEach((team) => {
      team.style.flexDirection = "row";
      team.style.gap = "30px";
      team.style.margin = "20px";
  });
  const container = document.getElementById("draft-container");
  container.style.flexDirection = "column";
  document.getElementById("top-one").style.margin = "0";
  document.getElementById("adc-one").style.margin = "0";
  document.getElementById("top-two").style.margin = "0";
  document.getElementById("adc-two").style.margin = "0";

  document.getElementById("draft-container").style.alignItems = "center";
  document.getElementById("team-comp-red").style.display = "none";
  document.getElementById("team-comp-blue").style.display = "none";
  document.getElementById("chart-red").style.display = "none";
  document.getElementById("chart-blue").style.display = "none";

  const draftAnalysis = document.getElementById("draft-analysis");
  draftAnalysis.style.opacity = 0;
  draftAnalysis.style.width = '0';
  setTimeout(() => {
      draftAnalysis.style.display = "none";
  }, 300);
}

function draftMode () {
  const draftIcons = document.querySelectorAll(".draft-icon");
  draftIcons.forEach((icon) => {
      icon.style.display = "block";
  });
  const laneIcons = document.querySelectorAll(".lane-icon");
  laneIcons.forEach((icon) => {
      icon.style.display = "none";
  });
  const workspace = document.getElementById("workspace");
  workspace.style.width = "728px";
  workspace.style.height = "630px";
  workspace.style.opacity = "1";
  const submitBtns = document.getElementById("phase-2-btns");
  submitBtns.style.display = "none";
  const removeIcons = document.querySelectorAll(".remove-icon");
  removeIcons.forEach((icon) => {
      icon.style.display = "block";
  });
  document.getElementById("complete-draft").style.display = "flex";
  const teamContainer = document.querySelectorAll(".team-container");
  teamContainer.forEach((team) => {
      team.style.flexDirection = "column";
      team.style.gap = "10px";
      team.style.margin = "0";
  });

  document.getElementById("draft-container").style.alignItems = "flex-start";
  document.getElementById("team-comp-red").style.display = "block";
  document.getElementById("team-comp-blue").style.display = "block";
  document.getElementById("chart-red").style.display = "block";
  document.getElementById("chart-blue").style.display = "block";

  const container = document.getElementById("draft-container");
  container.style.flexDirection = "row";
  document.getElementById("top-one").style.marginTop = "20px";
  document.getElementById("adc-one").style.marginTop = "20px";
  document.getElementById("top-two").style.marginTop = "20px";
  document.getElementById("adc-two").style.marginTop = "20px";
}

function analysisMode () {
  document.querySelectorAll(".champion-container").forEach((champion) => {
      champion.removeEventListener("dragstart", handleDragStart);
      champion.removeEventListener("dragend", handleDragEnd);
      champion.removeEventListener("dragover", (e) => e.preventDefault());
  });
  document.getElementById("draft-header").style.display = "flex";
  document.removeEventListener("drop", handleDocumentDrop)
  const workspace = document.getElementById("workspace");
  workspace.style.display = "none";
  const teamContainer = document.querySelectorAll(".team-container");
  teamContainer.forEach((team) => {
      team.style.flexDirection = "column";
      team.style.gap = "10px";
      team.style.margin = "0";
  });

  document.getElementById("draft-container").style.alignItems = "flex-start";
  document.getElementById("team-comp-red").style.display = "block";
  document.getElementById("team-comp-blue").style.display = "block";
  document.getElementById("chart-red").style.display = "block";
  document.getElementById("chart-blue").style.display = "block";

  const draftAnalysis = document.getElementById("draft-analysis");
  draftAnalysis.style.display = "flex";
  document.getElementById("complete-draft").style.display = "none";
  setTimeout(() => {
      draftAnalysis.style.opacity = 1;
      draftAnalysis.style.width = '70vw';
  }, 10);
  const submitBtns = document.getElementById("phase-2-btns");
  submitBtns.style.display = "none";
  const container = document.getElementById("draft-container");
  container.style.flexDirection = "row";
  setTimeout(() => {
    analysisBoardStart();
  }, 300);
}

function updateColorGraphs() {
  const teamOne = document.querySelectorAll(".team-one .champion-container");
  let gameData = {
    red_team_power: [0, 0, 0, 0, 0],
    blue_team_power: [0, 0, 0, 0, 0],
  };
  if (teamOne.length) {
    teamOne.forEach((champion) => {
      const name = champion.querySelector("img").getAttribute("champion_name");
      const red = parseInt(allChampionsColors[name].Red, 10);
      const green = parseInt(allChampionsColors[name].Green, 10);
      const blue = parseInt(allChampionsColors[name].Blue, 10);
      const black = parseInt(allChampionsColors[name].Black, 10);
      const white = parseInt(allChampionsColors[name].White, 10);
      gameData.blue_team_power[0] += red;
      gameData.blue_team_power[1] += green;
      gameData.blue_team_power[2] += blue;
      gameData.blue_team_power[3] += white;
      gameData.blue_team_power[4] += black;
    });
    const maxPercentage = Math.max(...Object.values(gameData.blue_team_power));
    console.log(maxPercentage);
    gameData.blue_team_power.forEach((value, index) => {
      gameData.blue_team_power[index] = value / maxPercentage * 100;
    });
    blueChart.data.datasets[0].data = gameData.blue_team_power;
    blueChart.update();
  } else {
    blueChart.data.datasets[0].data = [0, 0, 0, 0, 0];
    blueChart.update();
  }
  
  
  const teamTwo = document.querySelectorAll(".team-two .champion-container");
  if (teamTwo.length) {
    teamTwo.forEach((champion) => {
      const name = champion.querySelector("img").getAttribute("champion_name");
      const red = parseInt(allChampionsColors[name].Red, 10);
      const green = parseInt(allChampionsColors[name].Green, 10);
      const blue = parseInt(allChampionsColors[name].Blue, 10);
      const black = parseInt(allChampionsColors[name].Black, 10);
      const white = parseInt(allChampionsColors[name].White, 10);
      gameData.red_team_power[0] += red;
      gameData.red_team_power[1] += green;
      gameData.red_team_power[2] += blue;
      gameData.red_team_power[3] += white;
      gameData.red_team_power[4] += black;
    });
    const maxPercentage = Math.max(...Object.values(gameData.red_team_power));
    gameData.red_team_power.forEach((value, index) => {
      gameData.red_team_power[index] = value / maxPercentage * 100;
    });
    redChart.data.datasets[0].data = gameData.red_team_power;
    redChart.update();
  } else {
    redChart.data.datasets[0].data = [0, 0, 0, 0, 0];
    redChart.update();
  }
}

function updateTeamComps() {
    const teamOne = document.querySelectorAll(".team-one .champion-container");
  let teamComps = {
    blue_team_comps: {"Attack": 0, "Catch": 0, "Protect": 0, "Siege": 0, "Split": 0},
    red_team_comps: {"Attack": 0, "Catch": 0, "Protect": 0, "Siege": 0, "Split": 0},
  };
  if (teamOne.length) {
    teamOne.forEach((champion) => {
      const name = champion.querySelector("img").getAttribute("champion_name");
      const attackComp = championComps[name].Comps.Attack;
      const catchComp = championComps[name].Comps.Catch;
      const protectComp = championComps[name].Comps.Protect;
      const siegeComp = championComps[name].Comps.Siege;
      const splitComp = championComps[name].Comps.Split;
      teamComps.blue_team_comps.Attack += attackComp;
      teamComps.blue_team_comps.Catch += catchComp;
      teamComps.blue_team_comps.Protect += protectComp;
      teamComps.blue_team_comps.Siege += siegeComp;
      teamComps.blue_team_comps.Split += splitComp;
    });
    const sortedComps = Object.entries(teamComps.blue_team_comps)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);
    
    const primaryComp = { [sortedComps[0][0]]: sortedComps[0][1] };
    const secondaryComp = { [sortedComps[1][0]]: sortedComps[1][1] };

    const blueCompContainer = document.getElementById("team-comp-blue-content");
    blueCompContainer.innerHTML = "";
    const [primaryCompName, primaryValue] = Object.entries(primaryComp)[0];
    const [secondaryCompName, secondaryValue] = Object.entries(secondaryComp)[0];
    const primaryCompContainer = document.createElement("div");
    primaryCompContainer.className = "comp-container";
    primaryCompContainer.setAttribute("comp", primaryCompName);
    primaryCompContainer.setAttribute("value", primaryValue);
    const primaryCompNameDiv = document.createElement("p");
    primaryCompNameDiv.className = "comp-name";
    
    if (primaryCompName === "Attack") {
      primaryCompNameDiv.style.color = "#CC3E22";
      primaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Attack </span><span style='color: #ffffff'>(" + primaryValue + ")</span>";
    } else if (primaryCompName === "Catch") {
      primaryCompNameDiv.style.color = "#FFE300";
      primaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Catch </span><span style='color: #ffffff'>(" + primaryValue + ")</span>";
    } else if (primaryCompName === "Protect") {
      primaryCompNameDiv.style.color = "#3cc89b";
      primaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Protect </span><span style='color: #ffffff'>(" + primaryValue + ")</span>";
    } else if (primaryCompName === "Siege") {
      primaryCompNameDiv.style.color = "#3c9bc8";
      primaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Siege </span><span style='color: #ffffff'>(" + primaryValue + ")</span>";
    } else if (primaryCompName === "Split") {
      primaryCompNameDiv.style.color = "#AB2DC0";
      primaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Split </span><span style='color: #ffffff'>(" + primaryValue + ")</span>";
    } else {
      primaryCompNameDiv.textContent = "";
    }
    primaryCompContainer.appendChild(primaryCompNameDiv);
    blueCompContainer.appendChild(primaryCompContainer);
    const secondaryCompContainer = document.createElement("div");
    secondaryCompContainer.className = "comp-container";
    secondaryCompContainer.setAttribute("comp", secondaryCompName);
    secondaryCompContainer.setAttribute("value", secondaryValue);
    const secondaryCompNameDiv = document.createElement("p");
    secondaryCompNameDiv.className = "comp-name";
    if (secondaryCompName === "Attack") {
      secondaryCompNameDiv.style.color = "#CC3E22";
      secondaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Attack </span><span style='color: #ffffff'>(" + secondaryValue + ")</span>";
    } else if (secondaryCompName === "Catch") {
      secondaryCompNameDiv.style.color = "#FFE300";
      secondaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Catch </span><span style='color: #ffffff'>(" + secondaryValue + ")</span>";
    } else if (secondaryCompName === "Protect") {
      secondaryCompNameDiv.style.color = "#3cc89b";
      secondaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Protect </span><span style='color: #ffffff'>(" + secondaryValue + ")</span>";
    } else if (secondaryCompName === "Siege") {
      secondaryCompNameDiv.style.color = "#3c9bc8";
      secondaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Siege </span><span style='color: #ffffff'>(" + secondaryValue + ")</span>";
    } else if (secondaryCompName === "Split") {
      secondaryCompNameDiv.style.color = "#AB2DC0";
      secondaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Split </span><span style='color: #ffffff'>(" + secondaryValue + ")</span>";
    } else {
      secondaryCompNameDiv.textContent = "";
    }
    secondaryCompContainer.appendChild(secondaryCompNameDiv);
    blueCompContainer.appendChild(secondaryCompContainer);
  } else {
    const blueCompContainer = document.getElementById("team-comp-blue-content");
    blueCompContainer.innerHTML = "";
  }
  
  const teamTwo = document.querySelectorAll(".team-two .champion-container");
  if (teamTwo.length) {
    teamTwo.forEach((champion) => {
      const name = champion.querySelector("img").getAttribute("champion_name");
      const attackComp = championComps[name].Comps.Attack;
      const catchComp = championComps[name].Comps.Catch;
      const protectComp = championComps[name].Comps.Protect;
      const siegeComp = championComps[name].Comps.Siege;
      const splitComp = championComps[name].Comps.Split;
      teamComps.red_team_comps.Attack += attackComp;
      teamComps.red_team_comps.Catch += catchComp;
      teamComps.red_team_comps.Protect += protectComp;
      teamComps.red_team_comps.Siege += siegeComp;
      teamComps.red_team_comps.Split += splitComp;
    });
    const sortedComps = Object.entries(teamComps.red_team_comps)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);
    
    const primaryComp = { [sortedComps[0][0]]: sortedComps[0][1] };
    const secondaryComp = { [sortedComps[1][0]]: sortedComps[1][1] };

    const redCompContainer = document.getElementById("team-comp-red-content");
    redCompContainer.innerHTML = "";
    const [primaryCompName, primaryValue] = Object.entries(primaryComp)[0];
    const [secondaryCompName, secondaryValue] = Object.entries(secondaryComp)[0];
    const primaryCompContainer = document.createElement("div");
    primaryCompContainer.className = "comp-container";
    primaryCompContainer.setAttribute("comp", primaryCompName);
    primaryCompContainer.setAttribute("value", primaryValue);
    const primaryCompNameDiv = document.createElement("p");
    primaryCompNameDiv.className = "comp-name";
    
    if (primaryCompName === "Attack") {
      primaryCompNameDiv.style.color = "#CC3E22";
      primaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Attack </span><span style='color: #ffffff'>(" + primaryValue + ")</span>";
    } else if (primaryCompName === "Catch") {
      primaryCompNameDiv.style.color = "#FFE300";
      primaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Catch </span><span style='color: #ffffff'>(" + primaryValue + ")</span>";
    } else if (primaryCompName === "Protect") {
      primaryCompNameDiv.style.color = "#3cc89b";
      primaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Protect </span><span style='color: #ffffff'>(" + primaryValue + ")</span>";
    } else if (primaryCompName === "Siege") {
      primaryCompNameDiv.style.color = "#3c9bc8";
      primaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Siege </span><span style='color: #ffffff'>(" + primaryValue + ")</span>";
    } else if (primaryCompName === "Split") {
      primaryCompNameDiv.style.color = "#AB2DC0";
      primaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Split </span><span style='color: #ffffff'>(" + primaryValue + ")</span>";
    } else {
      primaryCompNameDiv.textContent = "";
    }
    primaryCompContainer.appendChild(primaryCompNameDiv);
    redCompContainer.appendChild(primaryCompContainer);
    const secondaryCompContainer = document.createElement("div");
    secondaryCompContainer.className = "comp-container";
    secondaryCompContainer.setAttribute("comp", secondaryCompName);
    secondaryCompContainer.setAttribute("value", secondaryValue);
    const secondaryCompNameDiv = document.createElement("p");
    secondaryCompNameDiv.className = "comp-name";
    if (secondaryCompName === "Attack") {
      secondaryCompNameDiv.style.color = "#CC3E22";
      secondaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Attack </span><span style='color: #ffffff'>(" + secondaryValue + ")</span>";
    } else if (secondaryCompName === "Catch") {
      secondaryCompNameDiv.style.color = "#FFE300";
      secondaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Catch </span><span style='color: #ffffff'>(" + secondaryValue + ")</span>";
    } else if (secondaryCompName === "Protect") {
      secondaryCompNameDiv.style.color = "#3cc89b";
      secondaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Protect </span><span style='color: #ffffff'>(" + secondaryValue + ")</span>";
    } else if (secondaryCompName === "Siege") {
      secondaryCompNameDiv.style.color = "#3c9bc8";
      secondaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Siege </span><span style='color: #ffffff'>(" + secondaryValue + ")</span>";
    } else if (secondaryCompName === "Split") {
      secondaryCompNameDiv.style.color = "#AB2DC0";
      secondaryCompNameDiv.innerHTML = "<span style='font-weight: 600;'> Split </span><span style='color: #ffffff'>(" + secondaryValue + ")</span>";
    } else {
      secondaryCompNameDiv.textContent = "";
    }
    secondaryCompContainer.appendChild(secondaryCompNameDiv);
    redCompContainer.appendChild(secondaryCompContainer);
  } else {
    const redCompContainer = document.getElementById("team-comp-red-content");
    redCompContainer.innerHTML = "";
  }
};

const chartConfBlue = {
  type: "bar",  // Change chart type to 'bar' for bar chart
  data: {
    labels: ["Red", "Green", "Blue", "White", "Black"],  // Same labels
    datasets: [
      {
        label: "Colors",
        data: [0, 0, 0, 0, 0],  // Same data
        backgroundColor: [
          '#CC3E22',  // Red
          '#3cc89b',  // Green
          '#3c9bc8',  // Blue
          '#ffffff',  // White
          '#363636'   // Black
        ],
        borderRadius: 100, // Apply 50% border radius for rounded corners
        barThickness: 4, // Set bar thickness to 4px
      },
    ],
  },
  options: {
    indexAxis: 'y',  // Set the indexAxis to 'y' for horizontal bars
    scales: {
      x: {
        display: false, // Disable display of the x-axis (horizontal axis)
      },
      y: {
        display: false  // Disable display of the y-axis (vertical axis)
      }
    },
    plugins: {
      legend: {
        display: false,  // Disable legend display to remove 'Team Stats'
      },
      tooltip: {
        enabled: true,  // Adjust tooltip display according to your needs
      },
    },
    elements: {
      bar: {
        borderWidth: 0,  // Set the border width for bars
      },
    },
  },
};

const chartConfRed = {
  type: "bar",  // Change chart type to 'bar' for bar chart
  data: {
    labels: ["Red", "Green", "Blue", "White", "Black"],  // Same labels
    datasets: [
      {
        label: "Colors",
        data: [0, 0, 0, 0, 0],  // Same data
        backgroundColor: [
          '#CC3E22',  // Red
          '#3cc89b',  // Green
          '#3c9bc8',  // Blue
          '#ffffff',  // White
          '#363636'   // Black
        ],
        borderRadius: 100, // Apply 50% border radius for rounded corners
        barThickness: 4, // Set bar thickness to 4px
      },
    ],
  },
  options: {
    indexAxis: 'y',  // Set the indexAxis to 'y' for horizontal bars
    scales: {
      x: {
        display: false, // Disable display of the x-axis (horizontal axis)
      },
      y: {
        display: false  // Disable display of the y-axis (vertical axis)
      }
    },
    plugins: {
      legend: {
        display: false,  // Disable legend display to remove 'Team Stats'
      },
      tooltip: {
        enabled: true,  // Adjust tooltip display according to your needs
      },
    },
    elements: {
      bar: {
        borderWidth: 0,  // Set the border width for bars
      },
    },
  },
};

const blueChartCTX = document.getElementById("blue-chart").getContext("2d");
const redChartCTX = document.getElementById("red-chart").getContext("2d");
const blueChart = new Chart(blueChartCTX, chartConfBlue);
const redChart = new Chart(redChartCTX, chartConfRed);

function analysisBoardStart () {
  const buttons = document.querySelectorAll('#analysis-nav-bar .button-new');
  const sections = document.querySelectorAll('#all-tool-container > div');
  const teamAnalysis = document.getElementById('team-analysis');
  teamAnalysis.innerHTML = '<div class="row"><div class="team-comp-powers"><div class="comp-power-analysis" id="blue-power-percentage"></div><div class="comp-power-analysis" id="red-power-percentage"></div></div><div class="team-comp-values"><p id="blue-comp-percentage"></p><p id="red-comp-percentage"></p></div></div>';

  // Function to hide all sections
  function hideSections() {
      sections.forEach(section => {
          section.style.zIndex = 0;
          section.style.opacity = 0; // Make elements transparent
      });
  }

  // Initially hide all sections except the first
  hideSections();
  sections[0].style.zIndex = 1;
  sections[0].style.opacity = 1;

  buttons.forEach(button => {
      button.addEventListener('click', function() {
          const sectionId = this.id.replace('-btn', ''); // Find corresponding section ID
          hideSections(); // Hide all sections
          const sectionToShow = document.getElementById(sectionId);
          sectionToShow.style.zIndex = 1; // Bring to front
          sectionToShow.style.opacity = 1; // Make fully visible
      });
  });
  loadAnalysis();
  drawCanvas("map-draw")
  drawCanvas("free-draw")
}

function loadAnalysis() {
  const compositionCounters = {
    "Attack": ["Split", "Siege"], // Attack counters Split and Siege
    "Split": ["Siege", "Protect"], // Split counters Siege and Protect
    "Siege": ["Protect", "Catch"], // Siege counters Protect and Catch
    "Protect": ["Attack", "Catch"], // Protect counters Attack and Catch
    "Catch": ["Split", "Attack"] // Catch counters Split and Attack
  };
  const maxCompValue = 27500;



  const bluePrimaryCompName = document.getElementById('team-comp-blue-content').querySelectorAll('.comp-container')[0].getAttribute('comp');
  const blueSecondaryCompName = document.getElementById('team-comp-blue-content').querySelectorAll('.comp-container')[1].getAttribute('comp');
  const redPrimaryCompName = document.getElementById('team-comp-red-content').querySelectorAll('.comp-container')[0].getAttribute('comp');
  const redSecondaryCompName = document.getElementById('team-comp-red-content').querySelectorAll('.comp-container')[1].getAttribute('comp');

  const bluePrimaryCompValue = parseInt(document.getElementById('team-comp-blue-content').querySelectorAll('.comp-container')[0].getAttribute('value'), 10);
  const blueSecondaryCompValue = parseInt(document.getElementById('team-comp-blue-content').querySelectorAll('.comp-container')[1].getAttribute('value'), 10);
  const redPrimaryCompValue = parseInt(document.getElementById('team-comp-red-content').querySelectorAll('.comp-container')[0].getAttribute('value'), 10);
  const redSecondaryCompValue = parseInt(document.getElementById('team-comp-red-content').querySelectorAll('.comp-container')[1].getAttribute('value'), 10);
  
  const bluePrimaryCompWeight = 1;
  const redPrimaryCompWeight = 1;
  const blueSecondaryCompWeight = getDynamicWeight(bluePrimaryCompValue, blueSecondaryCompValue);
  const redSecondaryCompWeight = getDynamicWeight(redPrimaryCompValue, redSecondaryCompValue);

  let blueOverRed = 0;
  let count = 0

  if(doesCounter(bluePrimaryCompName, redPrimaryCompName)) {
    const impact = calculateCounterImpact(bluePrimaryCompValue, redPrimaryCompValue, bluePrimaryCompWeight, redPrimaryCompWeight);
    blueOverRed += impact;
    count++
  } else if (doesCounter(redPrimaryCompName, bluePrimaryCompName)){
    const impact = calculateCounterImpact(redPrimaryCompValue, bluePrimaryCompValue, redPrimaryCompWeight, bluePrimaryCompWeight);
    blueOverRed -= impact;
    count++
  }

  if(doesCounter(blueSecondaryCompName, redSecondaryCompName)) {
    const impact = calculateCounterImpact(blueSecondaryCompValue, redSecondaryCompValue, blueSecondaryCompWeight, redSecondaryCompWeight);
    blueOverRed += impact;
    count++
  } else if (doesCounter(redSecondaryCompName, blueSecondaryCompName)){
    const impact = calculateCounterImpact(redSecondaryCompValue, blueSecondaryCompValue, redSecondaryCompWeight, blueSecondaryCompWeight);
    blueOverRed -= impact;
    count++
  }

  if(doesCounter(bluePrimaryCompName, redSecondaryCompName)) {
    const impact = calculateCounterImpact(bluePrimaryCompValue, redSecondaryCompValue, bluePrimaryCompWeight, redSecondaryCompWeight);
    blueOverRed += impact;
    count++
  } else if (doesCounter(redSecondaryCompName, bluePrimaryCompName)){
    const impact = calculateCounterImpact(redSecondaryCompValue, bluePrimaryCompValue, redSecondaryCompWeight, bluePrimaryCompWeight);
    blueOverRed -= impact;
    count++
  }

  if(doesCounter(blueSecondaryCompName, redPrimaryCompName)) {
    const impact = calculateCounterImpact(blueSecondaryCompValue, redPrimaryCompValue, blueSecondaryCompWeight, redPrimaryCompWeight);
    blueOverRed += impact;
    count++
  } else if (doesCounter(redPrimaryCompName, blueSecondaryCompName)){
    const impact = calculateCounterImpact(redPrimaryCompValue, blueSecondaryCompValue, redPrimaryCompWeight, blueSecondaryCompWeight);
    blueOverRed -= impact;
    count++
  }

  const percentage = blueOverRed/count;

  if (percentage > 0) {
    const bluePowerContainer = document.getElementById("blue-power-percentage");
    bluePowerContainer.style.flex = `0 0 ${50 + (Math.abs(percentage)/2)}%`;
    const redPowerContainer = document.getElementById("red-power-percentage");
    redPowerContainer.style.flex = `0 0 ${50 - (Math.abs(percentage)/2)}%`;
    document.getElementById("blue-comp-percentage").textContent = (50 + (Math.abs(percentage)/2)).toFixed(2) + "%";
    document.getElementById("red-comp-percentage").textContent = (50 - (Math.abs(percentage)/2)).toFixed(2) + "%";
  } else if (percentage < 0) {
    const bluePowerContainer = document.getElementById("blue-power-percentage");
    bluePowerContainer.style.flex = `0 0 ${50 - (Math.abs(percentage)/2)}%`;
    const redPowerContainer = document.getElementById("red-power-percentage");
    redPowerContainer.style.flex = `0 0 ${50 + (Math.abs(percentage)/2)}%`;
    document.getElementById("blue-comp-percentage").textContent = (50 - (Math.abs(percentage)/2)).toFixed(2) + "%";
    document.getElementById("red-comp-percentage").textContent = (50 + (Math.abs(percentage)/2)).toFixed(2) + "%";
  } else {
    const bluePowerContainer = document.getElementById("blue-power-percentage");
    bluePowerContainer.style.flex = `0 0 50%`;
    const redPowerContainer = document.getElementById("red-power-percentage");
    redPowerContainer.style.flex = `0 0 50%`;
    document.getElementById("blue-comp-percentage").textContent = "50%";
    document.getElementById("red-comp-percentage").textContent = "50%";
  }
  
  function doesCounter(counterCompName, targetCompName) {
    // Check if the counterCompName exists in the mapping
    if (compositionCounters[counterCompName]) {
        // Check if targetCompName is in the list of countered compositions
        return compositionCounters[counterCompName].includes(targetCompName);
    }
    // If the composition is not found or does not counter anything listed, return false
    return false;
  }

  function calculateCounterImpact(winningComp, losingComp, winningCompWeight, losingCompWeight) {
    const weight1 = 0.5 + 0.5 * (1 - winningComp / maxCompValue);
    const weight2 = 0.5 + 0.5 * (1 - losingComp / maxCompValue);
    const weight3 = (winningComp - losingComp)/ maxCompValue;
    const impactWeight = ((weight1 + weight2 + weight3 + winningCompWeight + losingCompWeight)/5) * 100;
    return impactWeight;
  }

  function getDynamicWeight(primaryValue, secondaryValue) {
    const differenceRatio = 1 - Math.abs(primaryValue - secondaryValue) / maxCompValue;
    return 0.7 + 0.3 * differenceRatio;
  }

  
  const topBlue = document.getElementById('top-one').getElementsByClassName('champion-tile')[0].getAttribute('champion_name');
  const  jungleBlue= document.getElementById('jungle-one').getElementsByClassName('champion-tile')[0].getAttribute('champion_name');
  const midBlue = document.getElementById('mid-one').getElementsByClassName('champion-tile')[0].getAttribute('champion_name');
  const adcBlue = document.getElementById('adc-one').getElementsByClassName('champion-tile')[0].getAttribute('champion_name');
  const supportBlue = document.getElementById('support-one').getElementsByClassName('champion-tile')[0].getAttribute('champion_name');
  const topRed = document.getElementById('top-two').getElementsByClassName('champion-tile')[0].getAttribute('champion_name');
  const jungleRed = document.getElementById('jungle-two').getElementsByClassName('champion-tile')[0].getAttribute('champion_name');
  const midRed = document.getElementById('mid-two').getElementsByClassName('champion-tile')[0].getAttribute('champion_name');
  const adcRed = document.getElementById('adc-two').getElementsByClassName('champion-tile')[0].getAttribute('champion_name');
  const supportRed = document.getElementById('support-two').getElementsByClassName('champion-tile')[0].getAttribute('champion_name');
  
  const blueTeam = [topBlue, jungleBlue, midBlue, adcBlue, supportBlue];
const redTeam =  [topRed, jungleRed, midRed, adcRed, supportRed];
const teamAnalysis = document.getElementById("team-analysis");

const colors = ["Red", "Green", "Blue", "White", "Black"];
const colorHex = {
  "Red": "#CC3E22",
  "Green": "#3cc89b",
  "Blue": "#3c9bc8",
  "White": "#FFFFFF",
  "Black": "#212121"
};

function createTeamRow(team, teamColors, teamSide) {
  const teamRow = document.createElement("div");
  teamRow.className = "row";
  const rowTitle = document.createElement("p");
  rowTitle.textContent = `${teamSide} Team`;
  rowTitle.classList.add("team-title");
  teamRow.appendChild(rowTitle);
  team.forEach((champion) => {
    const championProfile = document.createElement('div');
    const profileImage = document.createElement('img');
    profileImage.src = `https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${champion}.png`;
    profileImage.className = 'champion-tile';
    championProfile.appendChild(profileImage);

    const colorTitle = document.createElement("p");
    colorTitle.textContent = "Colors:";
    colorTitle.style.color = "#ffffff";
    colorTitle.className = "color-title";
    championProfile.appendChild(colorTitle);

    const allColorsContainer = document.createElement("div");
    allColorsContainer.className = "all-colors-container";
    const championColors = allChampionsColors[champion];

    colors.forEach((color) => {
      const colorValue = parseInt(championColors[color], 10);
      if (colorValue !== 0) {
        const colorContainer = document.createElement("div");
        colorContainer.className = "color-container";
        const colorBar = document.createElement("div");
        const emptyBar = document.createElement("div");

        colorBar.style.flex = `${colorValue / 5}`;
        colorBar.style.borderRadius = "50px";
        colorBar.style.backgroundColor = colorHex[color];

        colorContainer.appendChild(colorBar);
        colorContainer.appendChild(emptyBar);
        allColorsContainer.appendChild(colorContainer);

        teamColors[color] += colorValue;
      }
    });

    championProfile.appendChild(allColorsContainer);

    const compTitle = document.createElement("p");
    compTitle.textContent = "Comps:";
    compTitle.style.color = "#ffffff";
    compTitle.className = "comp-title";
    championProfile.appendChild(compTitle);

    const primaryComp = championComps[champion].Comps.Primary;
    const [primaryName, primaryValue] = Object.entries(primaryComp)[0];
    const secondaryComp = championComps[champion].Comps.Secondary;
    const [secondaryName, secondaryValue] = Object.entries(secondaryComp)[0];

    const primaryCompContainer = createCompContainer(primaryName, primaryValue, "Primary");
    const secondaryCompContainer = createCompContainer(secondaryName, secondaryValue, "Secondary");

    championProfile.appendChild(primaryCompContainer);
    championProfile.appendChild(secondaryCompContainer);
    teamRow.appendChild(championProfile);
  });

  const teamColorAverage = calculateColorAverage(teamColors);

  const teamColorContainer = document.createElement("div");
  const totalProfileImage = document.createElement('img');
  totalProfileImage.src = `/assets/team_total_${teamSide}.png`;
  totalProfileImage.className = 'team-total-img';
  teamColorContainer.appendChild(totalProfileImage);

  const colorTitle = document.createElement("p");
  colorTitle.textContent = "Colors:";
  colorTitle.style.color = "#ffffff";
  colorTitle.className = "color-title";
  teamColorContainer.appendChild(colorTitle);

  const allColorsContainer = document.createElement("div");
  allColorsContainer.className = "all-colors-container";

  colors.forEach((color) => {
    const colorValue = teamColorAverage[color];
    const colorContainer = document.createElement("div");
    colorContainer.className = "color-container";
    const colorBar = document.createElement("div");
    const emptyBar = document.createElement("div");
    colorBar.style.flex = `${colorValue}% 0 0`;
    colorBar.style.borderRadius = "50px";
    colorBar.style.backgroundColor = colorHex[color];

    colorContainer.appendChild(colorBar);
    colorContainer.appendChild(emptyBar);
    allColorsContainer.appendChild(colorContainer);
  });

  teamColorContainer.appendChild(allColorsContainer);

  const compTitle = document.createElement("p");
  compTitle.textContent = "Comps:";
  compTitle.style.color = "#ffffff";
  compTitle.className = "comp-title";
  teamColorContainer.appendChild(compTitle);

  const primaryCompName = document.getElementById(`team-comp-${teamSide}-content`).querySelectorAll('.comp-container')[0].getAttribute('comp');
  const primaryCompValue = parseInt(document.getElementById(`team-comp-${teamSide}-content`).querySelectorAll('.comp-container')[0].getAttribute('value'), 10);
  const secondaryCompName = document.getElementById(`team-comp-${teamSide}-content`).querySelectorAll('.comp-container')[1].getAttribute('comp');
  const secondaryCompValue = parseInt(document.getElementById(`team-comp-${teamSide}-content`).querySelectorAll('.comp-container')[1].getAttribute('value'), 10);

  const primaryCompContainer = createCompContainer(primaryCompName, primaryCompValue, "Primary");
  const secondaryCompContainer = createCompContainer(secondaryCompName, secondaryCompValue, "Secondary");

  teamColorContainer.appendChild(primaryCompContainer);
  teamColorContainer.appendChild(secondaryCompContainer);

  teamRow.appendChild(teamColorContainer);
  teamAnalysis.appendChild(teamRow);
}

function createCompContainer(compName, compValue, type) {
  const compContainer = document.createElement("div");
  compContainer.className = "comp-container";
  const compNameDiv = document.createElement("p");
  compNameDiv.className = "comp-name";

  if (compName) {
    compNameDiv.style.color = getColorByCompName(compName);
    compNameDiv.innerHTML = `<span style='color: #D4D4D4'>${type}:</span><br><span style='font-weight: 600;'> ${compName} </span><span style='color: #ffffff'>(${compValue})</span>`;
  } else {
    compNameDiv.textContent = "";
  }

  compContainer.appendChild(compNameDiv);
  return compContainer;
}

function getColorByCompName(compName) {
  switch (compName) {
    case "Attack":
      return "#CC3E22";
    case "Catch":
      return "#FFE300";
    case "Protect":
      return "#3cc89b";
    case "Siege":
      return "#3c9bc8";
    case "Split":
      return "#AB2DC0";
    default:
      return "#FFFFFF";
  }
}
function calculateColorAverage(teamColors) {
  const teamColorAverage = {};
  let colorTotal = 0;
  colors.forEach(color => {
    colorTotal += teamColors[color];
  });

  // Calculate initial percentages
  colors.forEach(color => {
    teamColorAverage[color] = (teamColors[color] / colorTotal) * 100;
  });

  // Find the maximum percentage
  const maxPercentage = Math.max(...Object.values(teamColorAverage));

  // Scale percentages
  colors.forEach(color => {
    teamColorAverage[color] = (teamColorAverage[color] / maxPercentage) * 100;
  });

  return teamColorAverage;
}

const blueTeamColors = { "Red": 0, "Green": 0, "Blue": 0, "Black": 0, "White": 0 };

createTeamRow(blueTeam, blueTeamColors, "blue");

const redTeamColors = { "Red": 0, "Green": 0, "Blue": 0, "Black": 0, "White": 0 };
createTeamRow(redTeam, redTeamColors, "red");

const commentsContainer = document.createElement("div");
commentsContainer.className = "comments-container";
const textarea = document.createElement("textarea");
textarea.placeholder = "Comments...";
commentsContainer.appendChild(textarea);
teamAnalysis.appendChild(commentsContainer);
}

function drawCanvas (id) {
  const container = document.getElementById(`${id}`);
  let width = container.offsetWidth;
  let height = container.offsetHeight;

  const stage = new Konva.Stage({
    container: `${id}`,
    width: width,
    height: height
  });

  const drawingLayer = new Konva.Layer(); // Layer for drawing
  const imageLayer = new Konva.Layer();   // Layer for images
  stage.add(drawingLayer);
  stage.add(imageLayer);

  let lastLine;
  let history = []; // History array to track objects added to the layers

  document.getElementById(`canvas-undo-${id}`).addEventListener('click', () => {
      if (history.length > 0) {
          const lastItem = history.pop();
          lastItem.destroy(); // Remove the last added shape
          lastItem.getLayer().draw(); // Redraw the appropriate layer
      }
  });

  function addIcons() {
      const champions = document.querySelectorAll('.picked-champion');
      let posY = 15;
      let posY2 = 15;
      let count = 0;
      champions.forEach((champion) => {
        if (count < 5) {
            const imgElement = champion.querySelector('.champion-tile');
            const championName = imgElement.getAttribute('champion_name');
            const img = document.createElement('img');
            img.src = `https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${championName}.png`;
            img.width = 50;
            img.height = 50;
            img.className = 'icon';
            Konva.Image.fromURL(img.src, function(konvaImg) {
              konvaImg.setAttrs({
                  x: 40,
                  y: posY,
                  width: 50,
                  height: 50,
                  draggable: true,
              });
              imageLayer.add(konvaImg); // Add to the image layer
              konvaImg.moveToTop(); // Ensure the image is always on top
              imageLayer.draw();
              posY += 55;
            });
            count++;
        } else {
            const imgElement = champion.querySelector('.champion-tile');
            const championName = imgElement.getAttribute('champion_name');
            const img = document.createElement('img');
            img.src = `https://ddragon.leagueoflegends.com/cdn/14.9.1/img/champion/${championName}.png`;
            img.width = 50;
            img.height = 50;
            img.className = 'icon';
            Konva.Image.fromURL(img.src, function(konvaImg) {
              konvaImg.setAttrs({
                  x: width - 80,
                  y: posY2,
                  width: 50,
                  height: 50,
                  draggable: true,
              });
              imageLayer.add(konvaImg); // Add to the image layer
              konvaImg.moveToTop(); // Ensure the image is always on top
              imageLayer.draw();
              posY2 += 55;
            });
        }
          
      });
  }

  stage.on('mousedown', function(e) {
      if (e.target !== stage) {
          return; // Prevent drawing initiation when the target is an image or other element
      }
      const pos = stage.getPointerPosition();
      lastLine = new Konva.Line({
          stroke: document.getElementById(`colorPicker-${id}`).value,
          strokeWidth: 4,
          points: [pos.x, pos.y] // Adjust for pen cursor
      });
      drawingLayer.add(lastLine);
      history.push(lastLine); // Add to history
  });

  stage.on('mouseup', function() {
      lastLine = null; // Stop drawing
  });

  stage.on('mousemove', function(e) {
      if (lastLine) {
          const pos = stage.getPointerPosition();
          var newPoints = lastLine.points().concat([pos.x, pos.y]); // Adjust for pen cursor
          lastLine.points(newPoints);
          drawingLayer.batchDraw();
      }
  });

  stage.on('mouseleave', function() {
      lastLine = null; // Stop drawing when cursor leaves the canvas
  });

  addIcons(); // Load and display the icons
}