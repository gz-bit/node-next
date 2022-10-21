export const messageForm = (prompt: string) => `
  <form action="/message" method="POST">
    <h3>${prompt}</h3>
    <input type="text" name="message" value="">
    <br>
    <br>
    <button type="submit">Submit</button>
  </form>
`