import { formatDate } from "./dates";

export async function verifyToken(token) {
  const res = await fetch("https://serv.amazingmarvin.com/api/test", {
    method: "POST",
    headers: {
      "X-API-Token": token,
    },
  });

  if (res.ok) {
    return { "X-API-Token": token };
  }

  if (!res.ok) {
    // Check if user provided X-Full-Access-Token

    const res = await fetch("https://serv.amazingmarvin.com/api/test", {
      method: "POST",
      headers: {
        "X-Full-Access-Token": token,
      },
    });

    if (res.ok) {
      console.log("token is correct");

      return { "X-Full-Access-Token": token };
    }
  }

  return false;
}

export async function getTasks(token, day) {
  const fixedDay = formatDate(day);
  const res = await fetch(
    `https://serv.amazingmarvin.com/api/todayItems?date=${fixedDay}`,
    {
      method: "GET",
      headers: {
        ...token,
      },
    }
  );

  if (res.ok) {
    return await res.json();
  }

  if (!res.ok) {
    console.log(res);
  }
}

// Needed to add "host_permissions": ["https://serv.amazingmarvin.com/api/*"], to Manifest in order for markDone to work
// https://stackoverflow.com/questions/64732755/access-to-fetch-has-been-blocked-by-cors-policy-chrome-extension-error

export async function markDone(token, id) {
  const timeZoneOffset = new Date().getTimezoneOffset();
  const data = {
    itemId: id,
    timeZoneOffset,
  };

  const res = await fetch(`https://serv.amazingmarvin.com/api/markDone`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...token,
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return new Promise((resolve) => {
      resolve(id);
    });
  }

  if (!res.ok) {
    console.log(res);
  }
}