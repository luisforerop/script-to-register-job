let sendWork = data => {
  const url = '' // La URL de la petición a realizar
  const config = {
    method: 'POST', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow', 
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  }

  fetch(url, config,
    )
  .then(res => res.json())
  .then(data => console.log(data))
}

let registerJob = (
  task = 'Trabajar en las tareas correspondientes a la HU.',
  startDay,
) => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const currentDay = currentDate.getDate()
  const daysOfTheMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const startInDay = startDay || currentDay

  for (let monthDay = startInDay; monthDay <= daysOfTheMonth; monthDay++) {
    const day = (monthDay % 7) + 1;
    if (day <= 5 && day >= 1) {
      const timeSpent = day == 5 ? "480m" : "540m";
      const month = currentMonth < 9 ? `0${currentMonth + 1}`: `${currentMonth + 1}`
      const started = `${currentYear}-${month}-${monthDay}T07:00:00.000-0500`
      const data = {
        timeSpent,
        comment: {
          version: 1,
          type: "doc",
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: task,
                },
              ],
            },
          ],
        },
        started,
      };
      sendWork(data)
    }
  }
};