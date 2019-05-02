
document.addEventListener('DOMContentLoaded', function(){ 
  
  let username = 'kevinfitzhenry'
  const container = document.querySelector('.container')
  const sidebarContainer = document.querySelector('.profile')
  const badgesContainer = document.querySelector('.badges__list')
  const statsContainer = document.querySelector('.stats')
  const badgesHeading = document.querySelector('.badges__heading')

  const userSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M6.03531778,18.739764 C7.62329979,20.146176 9.71193925,21 12,21 C14.2880608,21 16.3767002,20.146176 17.9646822,18.739764 C17.6719994,17.687349 15.5693823,17 12,17 C8.43061774,17 6.32800065,17.687349 6.03531778,18.739764 Z M4.60050358,17.1246475 C5.72595131,15.638064 8.37060189,15 12,15 C15.6293981,15 18.2740487,15.638064 19.3994964,17.1246475 C20.4086179,15.6703183 21,13.9042215 21,12 C21,7.02943725 16.9705627,3 12,3 C7.02943725,3 3,7.02943725 3,12 C3,13.9042215 3.59138213,15.6703183 4.60050358,17.1246475 Z M12,23 C5.92486775,23 1,18.0751322 1,12 C1,5.92486775 5.92486775,1 12,1 C18.0751322,1 23,5.92486775 23,12 C23,18.0751322 18.0751322,23 12,23 Z M8,10 C8,7.75575936 9.57909957,6 12,6 C14.4141948,6 16,7.92157821 16,10.2 C16,13.479614 14.2180861,15 12,15 C9.76086382,15 8,13.4273743 8,10 Z M10,10 C10,12.2692568 10.8182108,13 12,13 C13.1777063,13 14,12.2983927 14,10.2 C14,8.95041736 13.2156568,8 12,8 C10.7337387,8 10,8.81582479 10,10 Z"/>
                  </svg>`

  function createNode(element) {
    return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);
  }

  fetch(`https://teamtreehouse.com/${username}.json`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    populateHTML(data)
  })
  .catch(error => console.error(error))

  function populateHTML(data) {

      // Badges
      let allBadges = data.badges
      let totalBadges = data.badges.length
      let firstBadge = data.badges[0]
  
      let badgeCount = createNode('span')
      badgeCount.innerHTML = totalBadges
      badgeCount.classList.add('badges__count')
      append(badgesHeading, badgeCount)
  
      allBadges.reverse().map(function(badge) {
  
        let fromNow = moment(badge.earned_date, "YYYYMMDD").fromNow()
  
        let badgeCard = `
          <a href="${badge.url}" target="_blank" class="badge__link">
            <img class="badge__img" src="${badge.icon_url}" alt="${badge.name}"/>
            <div class="badge__details">
              <div class="badge__name">${badge.name}</div>
              <div class="badge__earned">${fromNow}</div>
            </div>
          </a>
        `
  
        let badgeBox = createNode('li')
        badgeBox.classList.add('badge')
        badgeBox.innerHTML = badgeCard;
        append(badgesContainer, badgeBox)
  
      })
    
    // Sidebar
    let startDate = moment(firstBadge.earned_date).format("MMMM Do YYYY")

    sidebarContainer.innerHTML = `
      <img src="${data.gravatar_url}" alt="${data.name} profile picture." class="profile__picture"/>
      <h1 class="profile__name">${data.name}</h1>
      <a href="${data.profile_url}" target="_blank" class="profile__link">
        <span class="profile__icon">${userSVG}</span>
        <h2 class="profile__username">${data.profile_name}</h2>
      </a>
      <div class="profile__started">${startDate}</div>
    `

    // Stats
    // statsContainer.innerHTML = `${data.points.total}`

    let total = data.points.total
    let pointsCat = data.points

    // console.log(data.points);

    Object.entries(pointsCat).forEach(entry => {
      let key = entry[0]
      let value = entry[1]

      if (value > 0 && key !== 'total') {
        // console.log(key, value);
        let percent = ((value * 100) / total)
        console.log(key, percent);

        // let div = createNode('div')
        // div.classList.add('bar')
        // div.style.width = `${percent}%`
        // div.innerHTML = `${key} - ${value}`
        // append(statsContainer, div)
        
      }

    })
    
  }

}, false);






































// Enables HMR for development purposes. Degrades gracefully to nothing in production
// Must be located directly at the end of this file. Cannot be abstracted into another
// file, or it won't work.
if (process.env.NODE_ENV === 'development') {
  if (module.hot) module.hot.accept()

  // Silence HMR rubbish logs
  ;(function (global) {
    var consoleLog = global.console.log
    global.console.log = function () {
      if (!(
            arguments.length === 1 &&
            typeof arguments[0] === 'string' &&
            arguments[0].match(/^\[(HMR|WDS)\]/)
          )) {
        consoleLog.apply(global.console, arguments)
      }
    }
  })(window)
}
