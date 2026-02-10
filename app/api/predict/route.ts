import axios from "@/lib/axios";

export async function POST(req: Request) {
  const body = await req.json();
  const res = await axios.post("/predict", body);
  return Response.json(res.data);
}
