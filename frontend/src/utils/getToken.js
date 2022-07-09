const endPoint = "https://prod-in2.100ms.live/hmsapi/saswat-mishra.app.100ms.live/";
// const room_id = "62c1d37fc42dc78aa5b82190";

export default async function getToken(role, room_id) {
  const user_id = localStorage.getItem('user_id')
  const response = await fetch(`${endPoint}api/token`, {
    method: 'POST',
    body: JSON.stringify({
      user_id: user_id, // User ID assigned by you (different from 100ms' assigned id)
      role: role, // listener , speaker , moderator
      room_id,
    }),
  });

  const { token } = await response.json();
  // console.log(token, role, room_id, response);

  return token;
}
