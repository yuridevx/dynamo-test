# Technical test

To complete this test, you will need to write a REST aws lambda handler using serverless.
It's a pretty simple openapi driven post endpoint. We'll post some JSON data to the serverless offline endpoint. You'll need to upsert the dataset into a dynamo table.

We expect a fully developed production quality code. Please think about logging, error handling, adding a README, etc. we don't need the code to be unit tested.

## Sample Data

Here's an example request payload

```
[
   {
      "country":"UK",
      "description":"What's life like when you have enough children to field your own football team?",
      "drm":true,
      "episodeCount":3,
      "genre":"Reality",
      "language":"English",
      "primaryColour":"#ff7800",
      "slug":"show/16kidsandcounting",
      "title":"16 Kids and Counting",
      "tvChannel":"GEM"
   },
   {
      "slug":"show/seapatrol",
      "title":"Sea Patrol",
      "tvChannel":"Channel 9"
   },
   {
      "country":" USA",
      "description":"The Taste puts 16 culinary competitors in the kitchen, where four of the World's most notable culinary masters of the food world judges their creations based on a blind taste. Join judges Anthony Bourdain, Nigella Lawson, Ludovic Lefebvre and Brian Malarkey in this pressure-packed contest where a single spoonful can catapult a contender to the top or send them packing.",
      "drm":true,
      "episodeCount":2,
      "genre":"Reality",
      "language":"English",
      "primaryColour":"#df0000",
      "slug":"show/thetaste",
      "title":"The Taste",
      "tvChannel":"GEM"
   },
   {
      "country":"UK",
      "description":"The series follows the adventures of International Rescue, an organisation created to help those in grave danger using technically advanced equipment and machinery. The series focuses on the head of the organisation, ex-astronaut Jeff Tracy, and his five sons who piloted the \"Thunderbird\" machines.",
      "drm":true,
      "episodeCount":24,
      "genre":"Action",
      "language":"English",
      "primaryColour":"#0084da",
      "slug":"show/thunderbirds",
      "title":"Thunderbirds",
      "tvChannel":"Channel 9"
   },
   {
      "country":"USA",
      "description":"A sleepy little village, Crystal Cove boasts a long history of ghost sightings, poltergeists, demon possessions, phantoms and other paranormal occurrences. The renowned sleuthing team of Fred, Daphne, Velma, Shaggy and Scooby-Doo prove all of this simply isn't real, and along the way, uncover a larger, season-long mystery that will change everything.",
      "drm":true,
      "episodeCount":4,
      "genre":"Kids",
      "language":"English",
      "nextEpisode":null,
      "primaryColour":"#1b9e00",
      "slug":"show/scoobydoomysteryincorporated",
      "title":"Scooby-Doo! Mystery Incorporated",
      "tvChannel":"GO!"
   },
   {
      "country":"USA",
      "description":"Toy Hunter follows toy and collectibles expert and dealer Jordan Hembrough as he scours the U.S. for hidden treasures to sell to buyers around the world. In each episode, he travels from city to city, strategically manoeuvring around reluctant sellers, abating budgets, and avoiding unforeseen roadblocks.",
      "drm":true,
      "episodeCount":2,
      "genre":"Reality",
      "language":"English",
      "primaryColour":"#0084da",
      "slug":"show/toyhunter",
      "title":"Toy Hunter",
      "tvChannel":"GO!"
   },
   {
      "country":"AUS",
      "description":"A series of documentary specials featuring some of the world's most frightening moments, greatest daredevils and craziest weddings.",
      "drm":true,
      "episodeCount":1,
      "genre":"Documentary",
      "language":"English",
      "nextEpisode":null,
      "primaryColour":"#ff7800",
      "slug":"show/worlds",
      "title":"World's...",
      "tvChannel":"Channel 9"
   },
   {
      "country":"USA",
      "description":"Another year of bachelorhood brought many new adventures for roommates Walden Schmidt and Alan Harper. After his girlfriend turned down his marriage proposal, Walden was thrown back into the dating world in a serious way. The guys may have thought things were going to slow down once Jake got transferred to Japan, but they're about to be proven wrong when a niece of Alan's, who shares more than a few characteristics with her father, shows up at the beach house.",
      "drm":true,
      "episodeCount":0,
      "genre":"Comedy",
      "language":"English",
      "primaryColour":"#ff7800",
      "slug":"show/twoandahalfmen",
      "title":"Two and a Half Men",
      "tvChannel":"Channel 9"
   },
   {
      "country":"USA",
      "description":"Simmering with supernatural elements and featuring familiar and fan-favourite characters from the immensely popular drama The Vampire Diaries, it's The Originals. This sexy new series centres on the Original vampire family and the dangerous vampire/werewolf hybrid, Klaus, who returns to the magical melting pot that is the French Quarter of New Orleans, a town he helped build centuries ago.",
      "drm":true,
      "episodeCount":1,
      "genre":"Action",
      "language":"English",
      "primaryColour":"#df0000",
      "slug":"show/theoriginals",
      "title":"The Originals",
      "tvChannel":"GO!"
   },
   {
      "country":"AUS",
      "description":"Join the most dynamic TV judging panel Australia has ever seen as they uncover the next breed of superstars every Sunday night. UK comedy royalty Dawn French, international pop superstar Geri Halliwell, (in) famous Aussie straight-talking radio jock Kyle Sandilands, and chart -topping former AGT alumni Timomatic.",
      "drm":false,
      "episodeCount":0,
      "genre":"Reality",
      "language":"English",
      "primaryColour":"#df0000",
      "slug":"show/australiasgottalent",
      "title":"Australia's Got Talent",
      "tvChannel":"Channel 9"
   }
]
```

## Deliverables

1. Post endpoint should be able to accept the above data and validate the payload
2. Spend as little or as much time as you like
3. We prefer the code to be delivered in typescript
4. The output of the efforts must be committed back into a Public Repo in Github and the URL shared back for review.
5. Document instructions on how to install and run your solution in the README.
