//フロントがAPIを呼ぶための処理(フロントとバックエンドの繋ぎ)

function APICall(path, req, callback) {
  const url =
    "https://w5hhulav48.execute-api.ap-southeast-2.amazonaws.com/" ||
    process.env.REACT_APP_API_URL;
  const request = Object.assign(
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${url}`,
      },
      mode: "cors",
    },
    req
  );
  console.log(request);
  fetch(url + path, request)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then((result) => {
      callback(result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return;
}

//GETリクエストを飛ばすための関数
export function getAPICall(path, callback) {
  const request = {
    method: "GET",
  };
  APICall(path, request, callback);
}

//POSTリクエストを飛ばすための関数
export function postAPICall(path, body, callback) {
  const request = {
    method: "POST",
    body: JSON.stringify(body),
  };
  APICall(path, request, callback);
}
