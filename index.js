
document.addEventListener('DOMContentLoaded', () => {
  const intnlDiv = document.getElementById('international');
  const domesticDiv = document.getElementById('domestic');
  const womensDiv = document.getElementById('womens');
  const leagueDiv = document.getElementById('league');
  const seriesContainer = document.querySelector('.series-container');
  const matchContainer = document.querySelector('.match-container');
  const backButton = document.querySelector('.back-button');
  const dynamicSection = document.querySelector('.dynamic-section');
  const featuredContent = document.querySelector('.featured-content');

  // Fetch the data from the server
  fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(data => {
          // Set match types in the navbar
          intnlDiv.textContent = data[0].typeMatches[0].matchType;
          leagueDiv.textContent = data[0].typeMatches[1].matchType;
          domesticDiv.textContent = data[0].typeMatches[2].matchType;
          womensDiv.textContent = data[0].typeMatches[3].matchType;

          // Add event listeners to load series names
          intnlDiv.addEventListener('click', () => displaySeries(data[0].typeMatches[0].seriesMatches));
          leagueDiv.addEventListener('click', () => displaySeries(data[0].typeMatches[1].seriesMatches));
          domesticDiv.addEventListener('click', () => displaySeries(data[0].typeMatches[2].seriesMatches));
          womensDiv.addEventListener('click', () => displaySeries(data[0].typeMatches[3].seriesMatches));

          // Function to display series names
          function displaySeries(seriesMatches) {
              seriesContainer.innerHTML = '';
              matchContainer.innerHTML = '';
              dynamicSection.style.display = 'block'; // Show dynamic section
              featuredContent.style.display = 'none'; // Hide featured content
              backButton.style.display = 'block'; // Show back button

              seriesMatches.forEach(series => {
                  const seriesDiv = document.createElement('div');
                  seriesDiv.classList.add('series-name');
                  seriesDiv.textContent = series.seriesAdWrapper.seriesName;

                  // Add click event to load matches for the selected series
                  seriesDiv.addEventListener('click', () => {
                      displayMatches(series.seriesAdWrapper.matches);
                      // Hide other series names
                      seriesContainer.childNodes.forEach(node => {
                          if (node !== seriesDiv) {
                              node.style.display = 'none';
                          }
                     });
                  });

                  seriesContainer.appendChild(seriesDiv);
              });
          }

          // Function to display matches within a series
          function displayMatches(matches) {
              matchContainer.innerHTML = '';

              matches.forEach(matchData => {
                  const matchDiv = document.createElement('div');
                  matchDiv.classList.add('match-info');

                  const matchTitle = document.createElement('div');
                  matchTitle.classList.add('match-title');
                  matchTitle.textContent = `${matchData.matchInfo.team1.teamSName} vs ${matchData.matchInfo.team2.teamSName}`;

                  const status = document.createElement('div');
                  status.classList.add('match-status');
                  status.textContent = `Status: ${matchData.matchInfo.status}`;

                  const venueInfo = document.createElement('div');
                  venueInfo.classList.add('match-venue');
                  venueInfo.textContent = `Venue: ${matchData.matchInfo.venueInfo.city} - ${matchData.matchInfo.venueInfo.ground}`;

                  const team1Score = document.createElement('div');
                  team1Score.classList.add('team-score');
                  team1Score.innerHTML = `
                      <strong>${matchData.matchInfo.team1.teamSName}</strong><br>
                      Runs: ${matchData.matchScore.team1Score?.inngs1?.runs || 'N/A'}<br>
                      Wickets: ${matchData.matchScore.team1Score?.inngs1?.wickets || 'N/A'}<br>
                      Overs: ${matchData.matchScore.team1Score?.inngs1?.overs || 'N/A'}
                  `;

                  const team2Score = document.createElement('div');
                  team2Score.classList.add('team-score');
                  team2Score.innerHTML = `
                      <strong>${matchData.matchInfo.team2.teamSName}</strong><br>
                      Runs: ${matchData.matchScore.team2Score?.inngs1?.runs || 'N/A'}<br>
                      Wickets: ${matchData.matchScore.team2Score?.inngs1?.wickets || 'N/A'}<br>
                      Overs: ${matchData.matchScore.team2Score?.inngs1?.overs || 'N/A'}<br>
                  `;

                  matchDiv.append(matchTitle, status, venueInfo, team1Score, team2Score);
                  matchContainer.appendChild(matchDiv);
              });
          }

          // Back button functionality
          backButton.addEventListener('click', () => {
              if (seriesContainer.style.display === 'none') {
                  // Show series container and hide match container
                  seriesContainer.style.display = 'flex';
                  matchContainer.innerHTML = '';
              } else {
                  // Go back to static content
                  dynamicSection.style.display = 'none'; // Hide dynamic section
                  featuredContent.style.display = 'block'; // Show featured content
                  backButton.style.display = 'none'; // Hide back button
              }
          });
      })
      .catch(error => {
          console.error("Error fetching data:", error);
      });
});

// document.addEventListener('DOMContentLoaded', () => {
//     const intnlDiv = document.getElementById('international');
//     const domesticDiv = document.getElementById('domestic');
//     const womensDiv = document.getElementById('womens');
//     const leagueDiv = document.getElementById('league');
//     const seriesContainer = document.querySelector('.series-container');
//     const matchContainer = document.querySelector('.match-container');
//     const backButton = document.querySelector('.back-button');
//     const dynamicSection = document.querySelector('.dynamic-section');
//     const featuredContent = document.querySelector('.featured-content');
//     const splashScreen = document.getElementById('splash-screen');
//     const mainContent = document.getElementById('main-content');
//     const nextButton = document.getElementById('next-button');

//     // Splash screen next button event
//     nextButton.addEventListener('click', () => {
//         splashScreen.style.display = 'none';
//         mainContent.style.display = 'block';
//     });

//     // Fetch the data from the server
//     fetch('http://localhost:3000/data')
//         .then(response => response.json())
//         .then(data => {
//             // Set match types in the navbar
//             intnlDiv.textContent = data[0].typeMatches[0].matchType;
//             leagueDiv.textContent = data[0].typeMatches[1].matchType;
//             domesticDiv.textContent = data[0].typeMatches[2].matchType;
//             womensDiv.textContent = data[0].typeMatches[3].matchType;

//             // Add event listeners to load series names
//             intnlDiv.addEventListener('click', () => displaySeries(data[0].typeMatches[0].seriesMatches));
//             leagueDiv.addEventListener('click', () => displaySeries(data[0].typeMatches[1].seriesMatches));
//             domesticDiv.addEventListener('click', () => displaySeries(data[0].typeMatches[2].seriesMatches));
//             womensDiv.addEventListener('click', () => displaySeries(data[0].typeMatches[3].seriesMatches));

//             // Function to display series names
//             function displaySeries(seriesMatches) {
//                 seriesContainer.innerHTML = '';
//                 matchContainer.innerHTML = '';
//                 dynamicSection.style.display = 'block'; // Show dynamic section
//                 featuredContent.style.display = 'none'; // Hide featured content
//                 backButton.style.display = 'block'; // Show back button

//                 seriesMatches.forEach(series => {
//                     const seriesDiv = document.createElement('div');
//                     seriesDiv.classList.add('series-name');
//                     seriesDiv.textContent = series.seriesAdWrapper.seriesName;

//                     // Add click event to load matches for the selected series
//                     seriesDiv.addEventListener('click', () => {
//                         displayMatches(series.seriesAdWrapper.matches);
//                         // Hide other series names
//                         seriesContainer.childNodes.forEach(node => {
//                             if (node !== seriesDiv) {
//                                 node.style.display = 'none';
//                             }
//                         });
//                     });

//                     seriesContainer.appendChild(seriesDiv);
//                 });
//             }

//             // Function to display matches within a series
//             function displayMatches(matches) {
//                 matchContainer.innerHTML = '';

//                 matches.forEach(matchData => {
//                     const matchDiv = document.createElement('div');
//                     matchDiv.classList.add('match-info');

//                     const matchTitle = document.createElement('div');
//                     matchTitle.classList.add('match-title');
//                     matchTitle.textContent = `${matchData.matchInfo.team1.teamSName} vs ${matchData.matchInfo.team2.teamSName}`;

//                     const status = document.createElement('div');
//                     status.classList.add('match-status');
//                     status.textContent = `Status: ${matchData.matchInfo.status}`;

//                     const venueInfo = document.createElement('div');
//                     venueInfo.classList.add('match-venue');
//                     venueInfo.textContent = `Venue: ${matchData.matchInfo.venueInfo.city} - ${matchData.matchInfo.venueInfo.ground}`;

//                     const team1Score = document.createElement('div');
//                     team1Score.classList.add('team-score');
//                     team1Score.innerHTML = `
//                         <strong>${matchData.matchInfo.team1.teamSName}</strong><br>
//                         Runs: ${matchData.matchScore.team1Score?.inngs1?.runs || 'N/A'}<br>
//                         Wickets: ${matchData.matchScore.team1Score?.inngs1?.wickets || 'N/A'}<br>
//                         Overs: ${matchData.matchScore.team1Score?.inngs1?.overs || 'N/A'}
//                     `;

//                     const team2Score = document.createElement('div');
//                     team2Score.classList.add('team-score');
//                     team2Score.innerHTML = `
//                         <strong>${matchData.matchInfo.team2.teamSName}</strong><br>
//                         Runs: ${matchData.matchScore.team2Score?.inngs1?.runs || 'N/A'}<br>
//                         Wickets: ${matchData.matchScore.team2Score?.inngs1?.wickets || 'N/A'}<br>
//                         Overs: ${matchData.matchScore.team2Score?.inngs1?.overs || 'N/A'}<br>
//                     `;

//                     matchDiv.append(matchTitle, status, venueInfo, team1Score, team2Score);
//                     matchContainer.appendChild(matchDiv);
//                 });
//             }

//             // Back button functionality
//             backButton.addEventListener('click', () => {
//                 if (seriesContainer.style.display === 'none') {
//                     // Show series container and hide match container
//                     seriesContainer.style.display = 'flex';
//                     matchContainer.innerHTML = '';
//                 } else {
//                     // Go back to static content
//                     dynamicSection.style.display = 'none'; // Hide dynamic section
//                     featuredContent.style.display = 'block'; // Show featured content
//                     backButton.style.display = 'none'; // Hide back button
//                 }
//             });
//         })
//         .catch(error => {
//             console.error("Error fetching data:", error);
//         });
// });
