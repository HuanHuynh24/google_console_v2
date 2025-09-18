import axios from "axios";

export async function getDataGroupByKeyWord(id, from, to) {
  const res = await axios.get("http://localhost:3000/website/group-by-keyword", {
    params: { id, from, to },
  });
  return res.data;
}


export async function getDataGroupByDate(id, from, to) {
  const res = await axios.get("http://localhost:3000/website/group-by-date", {
    params: { id, from, to },
  });
  return res.data;
}


export async function getDataGroupByPage(id, from, to) {
  const res = await axios.get("http://localhost:3000/website/group-by-page", {
    params: { id, from, to },
  });
  return res.data;
}
